import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="header-row shell">
        <div className="mark">
          <Link href="/" aria-label="Home">
            <img
              src="/character/mark.jpg"
              alt=""
              width={36}
              height={36}
            />
          </Link>
          <a className="mark-id" href="https://github.com/veronica-agent">
            <span className="mark-name">Obey Veronica</span>
            <span className="mark-sub">veronica-agent</span>
          </a>
        </div>
        <nav className="nav" aria-label="Primary">
          <Link href="/projects/">Work</Link>
          <Link href="/blog/">Blog</Link>
          <Link href="/about/">About</Link>
        </nav>
      </div>
    </header>
  );
}
