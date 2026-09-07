import fs from "node:fs";
import path from "node:path";

type GithubRepo = {
  owner: string;
  repo: string;
  rawBase: string;
  blobBase: string;
};

const MEDIA = /\.(png|jpe?g|gif|webp|svg|mp4|webm|ico)$/i;

export function parseGithubRepo(repoUrl: string): GithubRepo | undefined {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!match) return undefined;
  const owner = match[1];
  const repo = match[2].replace(/\.git$/, "");
  return {
    owner,
    repo,
    rawBase: `https://raw.githubusercontent.com/${owner}/${repo}/main`,
    blobBase: `https://github.com/${owner}/${repo}/blob/main`,
  };
}

function localReadme(repo: string): string | undefined {
  const sibling = path.join(process.cwd(), "..", repo, "README.md");
  if (fs.existsSync(sibling)) return fs.readFileSync(sibling, "utf8");
  return undefined;
}

async function remoteReadme(parsed: GithubRepo): Promise<string | undefined> {
  const url = `${parsed.rawBase}/README.md`;
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) return undefined;
    return await res.text();
  } catch {
    return undefined;
  }
}

function absUrl(base: string, rel: string): string {
  return new URL(rel, `${base}/`).href;
}

function rewriteRelative(markdown: string, parsed: GithubRepo): string {
  const asAbs = (rel: string, media: boolean) =>
    absUrl(media || MEDIA.test(rel) ? parsed.rawBase : parsed.blobBase, rel);

  let out = markdown.replace(
    /(src|href)=["'](?!https?:|\/\/|#|mailto:)([^"']+)["']/gi,
    (_full, attr: string, rel: string) => {
      const media = attr.toLowerCase() === "src" || MEDIA.test(rel);
      return `${attr}="${asAbs(rel, media)}"`;
    },
  );
  out = out.replace(
    /\]\((?!https?:|\/\/|#|mailto:)([^)]+)\)/g,
    (_full, rel: string) => `](${asAbs(rel, MEDIA.test(rel))})`,
  );
  return out;
}

function stripBooth(markdown: string): string {
  return markdown
    .replace(
      /<p[^>]*>((?!<\/p>)[\s\S])*booth\.(gif|mp4|webm|jpg|png)((?!<\/p>)[\s\S])*<\/p>\s*/gi,
      "",
    )
    .replace(/!\[[^\]]*\]\([^)]*booth\.[^)]+\)\s*/gi, "");
}

function stripLeadingHtmlHeading(markdown: string): string {
  return markdown
    .replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "")
    .replace(/^\s*#\s+[^\n]+\n+/, "");
}

function splitRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function isSep(line: string): boolean {
  return /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(line);
}

function gfmTablesToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const next = lines[i + 1];
    if (line.includes("|") && next && isSep(next)) {
      const header = splitRow(line);
      i += 2;
      const body: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && !isSep(lines[i])) {
        body.push(splitRow(lines[i]));
        i += 1;
      }
      const th = header.map((cell) => `<th>${cell}</th>`).join("");
      const rows = body
        .map((cells) => `<tr>${cells.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
        .join("");
      out.push(`<table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`);
      continue;
    }
    out.push(line);
    i += 1;
  }
  return out.join("\n");
}

export function prepareReadme(markdown: string, parsed: GithubRepo): string {
  let md = markdown.replace(/\r\n/g, "\n").trim();
  md = stripBooth(md);
  md = stripLeadingHtmlHeading(md);
  md = rewriteRelative(md, parsed);
  md = gfmTablesToHtml(md);
  return md.trim();
}

export function githubLabel(repoUrl: string): string {
  return repoUrl.replace(/^https?:\/\//, "").replace(/\.git$/, "");
}

export async function loadRepoReadme(repoUrl: string): Promise<string | undefined> {
  const parsed = parseGithubRepo(repoUrl);
  if (!parsed) return undefined;
  const raw = localReadme(parsed.repo) ?? (await remoteReadme(parsed));
  if (!raw) return undefined;
  return prepareReadme(raw, parsed);
}
