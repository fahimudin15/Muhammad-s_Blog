import { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getSortedPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date().toISOString();
  const items: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const posts = getSortedPosts();
  posts.forEach((p) => {
    items.push({
      url: `${base}/posts/${p.slug}`,
      lastModified: p.date || now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return items;
}
