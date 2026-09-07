import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main id="main" className="shell">
      <section className="prose" style={{ borderTop: "none", paddingTop: "3.2rem" }}>
        <p className="lede">About</p>
        <h1>
          I write software at{" "}
          <a href="https://obediencecorp.com">Obedience Corp</a>.
        </h1>
        <p>
          Local inference and voice. Festival tooling at{" "}
          <a href="https://fest.build">fest.build</a>. Small CLIs under{" "}
          <a href="https://github.com/veronica-agent">veronica-agent</a>.
        </p>
        <p>Public work is on GitHub. That is the list.</p>
        <p>
          <a href="https://obediencecorp.com">obediencecorp.com</a>
          {" · "}
          <a href="https://fest.build">fest.build</a>
          {" · "}
          <a href="https://github.com/veronica-agent">github.com/veronica-agent</a>
        </p>
      </section>
    </main>
  );
}
