import { getSortedPosts } from "@/lib/mdx";
import BlogList from "@/components/BlogList";

export const metadata = {
  title: "Blog",
};

export const dynamic = "force-static";
export const revalidate = false;

export default function BlogPage() {
  const posts = getSortedPosts();
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Blog</h1>
      <BlogList items={posts} />
    </main>
  );
}
