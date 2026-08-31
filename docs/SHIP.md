# Ship checklist — obey-veronica.com

Repo: `veronica-agent/obey-veronica` (private until you flip it).  
Build: Next.js static export → `out/` → GitHub Actions → Pages.  
Custom domain lock: apex `obey-veronica.com` (`public/CNAME`).

Do **not** change DNS or flip visibility until you are ready to go live.

## 1. DNS at the registrar

Source: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) (GitHub Docs, DNS records table).

This site uses the **apex** as the canonical host (`obey-veronica.com`). Configure **both** apex and `www` so GitHub can redirect `www` → apex.

| Host / name | Type | Value |
|-------------|------|-------|
| `@` (apex) | `A` | `185.199.108.153` |
| `@` | `A` | `185.199.109.153` |
| `@` | `A` | `185.199.110.153` |
| `@` | `A` | `185.199.111.153` |
| `@` | `AAAA` | `2606:50c0:8000::153` |
| `@` | `AAAA` | `2606:50c0:8001::153` |
| `@` | `AAAA` | `2606:50c0:8002::153` |
| `@` | `AAAA` | `2606:50c0:8003::153` |
| `www` | `CNAME` | `veronica-agent.github.io` |

**Apex alternative:** if your registrar supports `ALIAS` / `ANAME` on `@`, you may point `@` to `veronica-agent.github.io` instead of the four `A` + four `AAAA` records above (not both).

**`www` CNAME:** must target `veronica-agent.github.io` only — do **not** append `/obey-veronica` or the repo name ([subdomain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain)).

**Redirects:** with apex + `www` records in place and custom domain set to `obey-veronica.com` in repo Settings → Pages, GitHub redirects `https://www.obey-veronica.com` → `https://obey-veronica.com` ([about custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)).

Remove conflicting `@` / `www` records before adding these. DNS can take up to 24 hours to propagate.

**Verify (optional):**

```bash
dig obey-veronica.com +noall +answer -t A
dig www.obey-veronica.com +noall +answer -t CNAME
```

## 2. Flip repo public

When copy and assets are ready:

1. `veronica-agent/obey-veronica` → **Settings** → **General** → **Danger Zone** → **Change repository visibility** → **Public**.

Private Pages on a private repo is a paid/org feature; public site expects a public repo.

## 3. Enable GitHub Pages (GitHub Actions)

Workflow is already in `.github/workflows/pages.yml` (`npm run build` → `out/` → `deploy-pages`).

1. **Settings** → **Pages**.
2. **Build and deployment** → **Source** → **GitHub Actions** ([publishing source docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)).
3. Push to `main` or run the **pages** workflow manually (**Actions** → **pages** → **Run workflow**).
4. Wait for the **pages** workflow: `build` then `deploy` (environment `github-pages`).
5. **Custom domain:** enter `obey-veronica.com` → **Save**.  
   With Actions deploy, GitHub does not commit a `CNAME` to the repo; `public/CNAME` is copied into `out/` at build time.
6. After DNS propagates, enable **Enforce HTTPS** (can take up to an hour after DNS is correct).

Default URL before custom domain: `https://veronica-agent.github.io/obey-veronica/`.

## 4. Smoke URLs (after DNS + deploy)

Hit these over HTTPS on the live domain:

| URL | Expect |
|-----|--------|
| `https://obey-veronica.com/` | Home |
| `https://obey-veronica.com/projects/` | Projects index |
| `https://obey-veronica.com/about/` | About |
| `https://obey-veronica.com/blog/` | Blog index |
| `https://obey-veronica.com/sitemap.xml` | Sitemap |
| `https://obey-veronica.com/robots.txt` | Robots |

Also confirm `https://www.obey-veronica.com/` redirects to the apex.

## Local build check

```bash
just install
just build
npx --yes serve out
```
