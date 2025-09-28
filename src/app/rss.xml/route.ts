import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { getSortedPosts } from "@/lib/mdx";

export async function GET() {
  const base = SITE.url.replace(/\/$/, "");
  const posts = getSortedPosts();
  const feedItems = posts
    .map((p) => {
      const url = `${base}/posts/${p.slug}`;
      return `
      <item>
        <title><![CDATA[${p.title}]]></title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        ${p.description ? `<description><![CDATA[${p.description}]]></description>` : ""}
      </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title><![CDATA[${SITE.name}]]></title>
      <link>${base}</link>
      <description><![CDATA[${SITE.description}]]></description>
      ${feedItems}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
