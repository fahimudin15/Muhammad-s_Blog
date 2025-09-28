---
title: "Fuzzy Search with Fuse.js"
date: "2025-09-13"
tags: ["search", "fusejs", "ux"]
description: "Client-side search that feels instant and forgiving."
---

# Fuzzy Search with Fuse.js

Fuse.js is a lightweight fuzzy search library that works entirely on the client. It’s ideal for small to medium datasets like blog posts and docs sidebars.

## Installation

```bash
npm i fuse.js
```

## Basic usage

```ts
import Fuse from 'fuse.js';

const fuse = new Fuse(items, {
  keys: ['title', 'description', 'tags'],
  threshold: 0.35,
  includeScore: true,
});

const results = fuse.search(query).map(r => r.item);
```

## Indexing strategy

- **Normalize**: lower‑case titles/tags at build time for consistent matching.
- **Fields**: include `title`, `description`, and `tags`. Avoid indexing full body text for performance unless you paginate or chunk.
- **Weights**: prioritize titles over descriptions.

```ts
const fuse = new Fuse(items, {
  keys: [
    { name: 'title', weight: 0.6 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.1 },
  ],
});
```

## Performance tips

- Memoize the Fuse instance so it isn’t recreated on each render.
- Debounce input changes for large datasets.
- Consider server‑side filtering if your index grows beyond a few thousand items.

## UX guidelines

- Highlight matched terms in results (show snippets).
- Support keyboard navigation (↑/↓ to move, Enter to open).
- Persist the last query in URL params so results are shareable.
