import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPost, getSortedPosts } from "@/lib/mdx";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import Comments from "@/components/Comments";

// SSG: render at build time only
export const dynamic = "force-static";
export const dynamicParams = false; // only pre-generated slugs are valid
export const revalidate = false; // no ISR; requires rebuild to update

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const p = getPost(slug);
    const url = new URL(`/posts/${p.meta.slug}`, SITE.url);
    return {
      title: p.meta.title,
      description: p.meta.description || SITE.description,
      alternates: { canonical: url.toString() },
      openGraph: {
        title: p.meta.title,
        description: p.meta.description || SITE.description,
        url: url.toString(),
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: p.meta.title,
        description: p.meta.description || SITE.description,
      },
    };
  } catch {
    return { title: SITE.name };
  }
}

async function renderMarkdown(markdown: string): Promise<string> {
  const [{ remark } , { default: remarkParse }, { default: remarkRehype }, { default: rehypeStringify }, { default: rehypeSlug }, { default: rehypeAutolinkHeadings }, { default: rehypeHighlight }] = await Promise.all([
    import("remark"),
    import("remark-parse"),
    import("remark-rehype"),
    import("rehype-stringify"),
    import("rehype-slug"),
    import("rehype-autolink-headings"),
    import("rehype-highlight"),
  ]);

  const file = await remark()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

type TocItem = { depth: number; text: string; id: string };

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split(/\r?\n/);
  const items: TocItem[] = [];
  for (const line of lines) {
    const m = /^(#{2,4})\s+(.*)$/.exec(line.trim()); // capture h2-h4
    if (m) {
      const depth = m[1].length; // 2..4
      const text = m[2].trim();
      const id = toSlug(text);
      items.push({ depth, text, id });
    }
  }
  return items;
}

function calcReadingTime(markdown: string): string {
  const words = markdown.replace(/`{1,3}[^`]*`{1,3}/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = getPost(slug);
    const all = getSortedPosts();
    const idx = all.findIndex((p) => p.slug === slug);
    const prev = idx > 0 ? all[idx - 1] : undefined;
    const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;
    const toc = extractToc(post.content);
    const readingTime = calcReadingTime(post.content);
    const html = await renderMarkdown(post.content);
    const related = all
      .filter((p) => p.slug !== slug)
      .map((p) => ({
        post: p,
        score: (p.tags || []).filter((t) => (post.meta.tags || []).includes(t)).length,
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((x) => x.post);
    return (
      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[1fr_280px]">
        <article className="prose dark:prose-invert max-w-none">
          <h1 className="mb-1 text-3xl font-bold">{post.meta.title}</h1>
          <p className="mt-0 text-sm text-gray-500">
            {new Date(post.meta.date).toLocaleDateString()} • {readingTime}
          </p>
          <div dangerouslySetInnerHTML={{ __html: html }} />

          <hr />
          <nav className="mt-6 flex justify-between text-sm">
            <div>
              {prev && (
                <Link className="hover:underline" href={`/posts/${prev.slug}`}>
                  ← {prev.title}
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link className="hover:underline" href={`/posts/${next.slug}`}>
                  {next.title} →
                </Link>
              )}
            </div>
          </nav>

          {related.length > 0 && (
            <section className="mt-8">
              <h2 className="text-base font-semibold">Related posts</h2>
              <ul className="mt-3 grid gap-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link className="hover:underline" href={`/posts/${r.slug}`}>
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-10">
            <h2 className="text-base font-semibold">Comments</h2>
            <Comments />
          </section>
        </article>

        <aside className="hidden md:block">
          <div className="sticky top-20">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">On this page</h2>
            <ul className="space-y-2 text-sm">
              {toc.map((h) => (
                <li key={h.id} className={h.depth === 2 ? "ml-0" : h.depth === 3 ? "ml-3" : "ml-6"}>
                  <a className="hover:underline" href={`#${h.id}`}>
                    {h.text}
                  </a>
                </li>
              ))}
              {toc.length === 0 && <li className="text-gray-500">No headings</li>}
            </ul>
          </div>
        </aside>
      </main>
    );
  } catch (e) {
    notFound();
  }
}
