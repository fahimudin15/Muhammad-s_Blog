---
title: "Getting Started with Next.js"
date: "2025-09-20"
tags: ["nextjs", "react", "basics"]
description: "A gentle introduction to Next.js, file-based routing, and the App Router."
---

# Getting Started with Next.js

Next.js provides an ergonomic, batteries‑included framework for building modern web apps with React. With the App Router, you get file‑based routing, server components, streaming, built‑in SEO primitives, and first‑class deployment on Vercel.

## Why Next.js?

- Performance out of the box (SSR, ISR, image/fonts optimizations)
- Server and Client Components for the right rendering model
- File‑based routing and data fetching primitives
- Vercel‑first DX with zero‑config deployments

## Prerequisites

- Node.js 18+ recommended
- Familiarity with React Hooks and ES Modules

## Create a project

```bash
npx create-next-app@latest my-app --typescript --eslint --tailwind --app --src-dir
cd my-app
npm run dev
```

Visit http://localhost:3000 to see the starter.

## App Router essentials

- `src/app/` contains route segments. Files named `page.tsx` are pages. `layout.tsx` wraps all children in a segment.
- Server Components by default keep bundles small and enable direct data access.
- Use `"use client"` at the top of a component file when you need client‑side interactivity (state, effects, event handlers).

### Routing example

```tsx
// src/app/blog/page.tsx
export default function BlogIndex() {
  return <h1>Blog</h1>;
}

// Dynamic route: src/app/posts/[slug]/page.tsx
export default function Post({ params }: { params: { slug: string } }) {
  return <h1>Post: {params.slug}</h1>;
}
```

### Data fetching patterns

- Server Components can fetch directly with `await` at the top level.
- Use `generateStaticParams()` for static generation of dynamic routes.
- Add `export const revalidate = 60;` to opt into Incremental Static Regeneration (ISR).

```tsx
// Server Component example
export const revalidate = 120;

async function getPosts() {
  const res = await fetch("https://example.com/api/posts", { next: { revalidate: 120 } });
  return res.json();
}

export default async function Blog() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((p: any) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

### Environment configuration

- Public vars must start with `NEXT_PUBLIC_`.
- Use `.env.local` for local development (not committed).

```bash
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
API_BASE_URL="https://api.example.com" # server-only
```

### Best practices

- Prefer Server Components; make components client only when necessary.
- Co-locate page‑specific components near the route; share reusable UI in `src/components/`.
- Keep routes shallow; extract libraries to `src/lib/`.
- Adopt TypeScript everywhere and enable `strict`.

### Common pitfalls

- Importing client‑only libraries in Server Components: wrap those in `"use client"` files.
- Missing `metadataBase`/canonical URLs: specify in your root `layout.tsx` for robust SEO.
- Large client bundles: avoid passing large props from server to client.

### Further reading

- Next.js App Router docs: https://nextjs.org/docs/app
- Data fetching: https://nextjs.org/docs/app/building-your-application/data-fetching
- Routing: https://nextjs.org/docs/app/building-your-application/routing
