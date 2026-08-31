import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="shell">
      <section className="prose" style={{ borderTop: "none", paddingTop: "3.2rem" }}>
        <p className="lede">404</p>
        <h1>Not here.</h1>
        <p>
          <Link href="/">Desk</Link>
        </p>
      </section>
    </main>
  );
}
