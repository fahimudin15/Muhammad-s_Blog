import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  title: string;
  date: string;
  tags?: string[];
  description?: string;
  slug: string;
};

export type Post = {
  meta: PostMeta;
  content: string;
};

const postsDir = path.join(process.cwd(), "src", "content", "posts");

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  return files.map((file) => getPostBySlug(file.replace(/\.(md|mdx)$/i, ""))).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): PostMeta {
  const fullPathMd = path.join(postsDir, `${slug}.md`);
  const fullPathMdx = path.join(postsDir, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;
  const file = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(file);
  return {
    title: data.title ?? slug,
    date: data.date ?? new Date(0).toISOString(),
    tags: data.tags ?? [],
    description: data.description ?? "",
    slug,
  };
}

export function getSortedPosts(): PostMeta[] {
  return getAllPosts().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post {
  const fullPathMd = path.join(postsDir, `${slug}.md`);
  const fullPathMdx = path.join(postsDir, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const meta: PostMeta = {
    title: data.title ?? slug,
    date: data.date ?? new Date(0).toISOString(),
    tags: data.tags ?? [],
    description: data.description ?? "",
    slug,
  };
  return { meta, content };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/i, ""));
}
