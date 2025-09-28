---
title: "SEO in Next.js App Router"
date: "2025-09-16"
tags: ["seo", "nextjs"]
description: "Practical SEO setup in the App Router with dynamic metadata, sitemap and RSS."
---

# SEO in Next.js

Next.js ships with first‑class SEO primitives in the App Router. This guide shows how to set up default metadata, dynamic per‑page tags, a sitemap, RSS, and JSON‑LD for rich results.

## Prerequisites

- Next.js App Router
- A canonical site URL (set `NEXT_PUBLIC_SITE_URL`)

## Default metadata (site‑wide)

Define defaults in `src/app/layout.tsx` via the `metadata` export. Always set `metadataBase` so relative URLs resolve consistently.

```ts
export const metadata = {
  title: SITE.name,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: { title: SITE.name, description: SITE.description, url: SITE.url, type: "website" },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
};
```

## Dynamic metadata per page

Use `generateMetadata()` in a route to tailor tags using content/frontmatter.

```ts
export async function generateMetadata({ params }) {
  const post = getPost(params.slug);
  const url = new URL(`/posts/${post.meta.slug}`, SITE.url);
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: url.toString() },
    openGraph: { type: "article", url: url.toString(), title: post.meta.title, description: post.meta.description },
  };
}
```

## Sitemap

Create `src/app/sitemap.ts` to list core pages and posts.

```ts
import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { /* return array of URLs */ }
```

## RSS feed

Add `src/app/rss.xml/route.ts` that renders an XML RSS 2.0 feed from your posts.

## JSON‑LD structured data

For articles, embed schema.org data using `<script type="application/ld+json">` with `dangerouslySetInnerHTML` or by returning `other` metadata. Example minimal Article:

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.meta.title,
  datePublished: post.meta.date,
  author: [{ '@type': 'Person', name: 'Your Name' }],
};
```

## Best practices

- Ensure one canonical URL per page.
- Use absolute URLs for OG/Twitter images.
- Populate `description` in frontmatter for better snippets.
- Generate per‑post OG images for richer sharing.

## Pitfalls

- Missing `metadataBase` causes relative URLs in OG tags to break.
- Duplicated titles across pages reduce CTR—use specific, descriptive titles.

## References

- Next.js Metadata: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Sitemaps: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
