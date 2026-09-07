import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="header-row shell">
        <Link className="mark" href="/">
          <img
            src="/character/mark.jpg"
            alt="Cartoon bob mark"
            width={36}
            height={36}
          />
          <span>
            <span className="mark-name">Obey Veronica</span>
            <span className="mark-sub">veronica-agent</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href="/projects/">Work</Link>
          <Link href="/blog/">Blog</Link>
          <Link href="/about/">About</Link>
        </nav>
      </div>
    </header>
  );
}
