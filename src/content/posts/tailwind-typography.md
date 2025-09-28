---
title: "Styling Content with Tailwind Typography"
date: "2025-09-17"
tags: ["tailwind", "typography", "ui"]
description: "Make long-form content readable with Tailwind Typography."
---

# Tailwind Typography

The `@tailwindcss/typography` plugin adds well‑crafted prose styles for articles and docs. It’s perfect for blogs and knowledge bases.

## Usage

Add the `prose` class to your article wrapper to enable elegant defaults.

```tsx
<article className="prose dark:prose-invert max-w-none">{children}</article>
```

## Setup (Tailwind v4)

Enable the plugin in your global CSS (Tailwind v4 inline plugin API):

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

## Customizing

- Limit width: `max-w-none` to disable fixed measure.
- Code blocks: pair with `rehype-highlight` (already configured) for syntax highlighting.
- Images: wrap figures with utilities (margins, rounded corners) as needed.

```tsx
<article className="prose lg:prose-lg dark:prose-invert max-w-none">
  <h1>Heading</h1>
  <pre><code className="language-ts">const x = 1</code></pre>
  <img className="rounded" src="/cover.jpg" alt="cover" />
  <table className="table-auto"></table>
</article>
```

## Best practices

- Avoid nesting `prose` inside `prose` to prevent compounded styles.
- Use `dark:prose-invert` for dark mode readability.
- Keep headings hierarchical (h1→h2→h3) so the TOC remains meaningful.

## Pitfalls

- Overriding typography styles with global CSS can cause unexpected spacing. Prefer utility classes on children.
