---
title: "PWA on Next.js"
date: "2025-09-14"
tags: ["pwa", "nextjs"]
description: "Add offline support and installability to your app."
---

# PWA on Next.js

Progressive Web Apps bring installability and resilient offline behavior. In Next.js, you can ship a PWA with a web manifest and a service worker.

## Manifest

Add `public/manifest.webmanifest` with basic metadata and icons.

```json
{
  "name": "My Blog",
  "short_name": "Blog",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "icons": [{ "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }]
}
```

Reference it in `metadata` via `manifest: "/manifest.webmanifest"`.

## Service worker

Use a minimal SW for offline caching. Strategies:

- Navigation requests → Network‑first with cache fallback
- Static assets → Cache‑first

```js
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.mode === 'navigate') { /* network first */ }
  else { /* cache first */ }
});
```

Register the SW in a client component, only in production.

## Install prompts

- Provide a visible “Install app” affordance by listening for `beforeinstallprompt` and showing a button.
- On click, call `prompt()` on the saved event.

## Best practices

- Serve 512×512 PNG icons for installability.
- Version your caches to avoid stale assets.
- Avoid caching POST/PUT/DELETE; cache only GET.
- Test offline with DevTools → Network → Offline.

## Pitfalls

- Importing the SW from `/app`—service workers must live in `public/`.
- Caching HTML aggressively can hide fresh content; prefer network‑first for navigations.
