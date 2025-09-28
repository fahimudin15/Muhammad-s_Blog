---
title: "Advanced MDX Tips"
date: "2025-09-18"
tags: ["mdx", "markdown", "content"]
description: "Useful patterns for content-heavy blogs using Markdown and MDX."
---

# Advanced MDX Tips

MDX lets you mix Markdown with JSX. Even if your current pipeline parses plain Markdown, these tips apply when you upgrade to MDX for richer content.

## Components in MDX

Embed UI components inline to add callouts, videos, and interactive widgets.

```tsx
function Callout({ children }: { children: React.ReactNode }) {
  return <div className="rounded border-l-4 border-blue-500 bg-blue-50 p-3 dark:bg-blue-950/30">{children}</div>;
}
```

```mdx
<Callout>
  Heads up! This section covers advanced usage.
</Callout>
```

## Shortcodes pattern

Export a dictionary of short, friendly components (e.g., `Note`, `Warning`) and map them into your MDX renderer so authors don’t import on every page.

## Frontmatter schema

Validate frontmatter with a schema (e.g., Zod) to guarantee required fields exist.

```ts
const PostFrontmatter = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
});
```

## Asset handling

- Co-locate images next to the MDX file and reference them relatively.
- Use `next/image` where possible for optimized delivery.

## Performance considerations

- Prefer Server Components for static MDX to keep bundles small.
- Code‑split heavy interactive widgets behind client‑only components (`"use client"`).
- Cache compiled MDX in production builds (or precompile at build time).

## Authoring guidelines

- Keep headings strictly hierarchical; limit H1 to a single page title.
- Add a one‑sentence description; it powers previews and SEO.
- Prefer fenced code blocks with language hints for syntax highlighting.
