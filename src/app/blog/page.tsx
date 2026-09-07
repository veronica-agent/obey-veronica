import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main id="main" className="shell">
      <section style={{ borderTop: "none", paddingTop: "3.2rem" }}>
        <p className="kicker">Blog</p>
        <h1>Notes.</h1>
        <div className="posts" style={{ marginTop: "2rem" }}>
          {posts.map((post) => (
            <Link key={post.slug} className="post-row" href={`/blog/${post.slug}/`}>
              <time dateTime={post.date}>{post.date}</time>
              <div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
