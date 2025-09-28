import { getSortedPosts } from "@/lib/mdx";
import BlogList from "@/components/BlogList";

export const metadata = {
  title: "Home",
};

export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  const posts = getSortedPosts();
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Latest Posts</h1>
      <BlogList items={posts} />
    </main>
  );
}
