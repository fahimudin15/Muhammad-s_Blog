This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Key routes:

- `/blog` — Blog index with search and tag filters
- `/posts/[slug]` — Post page with table of contents, reading time, related posts, and comments
- `/about` — About page with author card
- `/rss.xml` — RSS feed
- `/sitemap.xml` — Sitemap

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Configuration

Update base site settings in `src/lib/site.ts`:

```ts
export const SITE = {
  name: "My Blog",
  description: "A Next.js blog with Markdown posts",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
```

Environment variables (create a `.env.local`):

```bash
# General
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="example.com"   # for Plausible
NEXT_PUBLIC_GA_ID="G-XXXXXXX"                # for Google Analytics

# Comments (Giscus) – see https://giscus.app for your values
NEXT_PUBLIC_GISCUS_REPO="owner/repo"
NEXT_PUBLIC_GISCUS_REPO_ID="..."
NEXT_PUBLIC_GISCUS_CATEGORY="General"
NEXT_PUBLIC_GISCUS_CATEGORY_ID="..."

# Newsletter (choose one provider or use mock)
NEWSLETTER_PROVIDER="mock"         # or "mailchimp" | "convertkit"

# Mailchimp
MAILCHIMP_API_KEY="us-xxxx-..."
MAILCHIMP_AUDIENCE_ID="..."

# ConvertKit
CONVERTKIT_API_KEY="..."
CONVERTKIT_FORM_ID="..."
```

## Content

Markdown posts live in `src/content/posts/` with frontmatter, e.g.:

```md
---
title: "Hello World"
date: "2025-09-26"
tags: ["intro", "hello"]
description: "First post to verify the blog pipeline."
---

# Heading

Some content...
```

## SEO

- Default metadata configured in `src/app/layout.tsx`
- Dynamic post metadata via `generateMetadata` in `src/app/posts/[slug]/page.tsx`
- `app/sitemap.ts` generates sitemap
- `app/rss.xml/route.ts` serves RSS feed

## Analytics

`src/components/Analytics.tsx` loads Plausible and/or Google Analytics depending on env vars.

## Comments

`src/components/Comments.tsx` integrates Giscus based on environment variables.

## Newsletter

`src/components/NewsletterForm.tsx` posts to `/api/newsletter` which supports `mailchimp`, `convertkit`, or a mock provider for local development.

## PWA

- `public/manifest.webmanifest` and `public/sw.js` added
- `src/components/RegisterSW.tsx` registers SW in production
- `manifest` referenced in `layout.tsx` metadata

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy is via the [Vercel Platform](https://vercel.com/).

Steps:

1. Push this project to a Git repo (GitHub/GitLab/Bitbucket).
2. Create a new Vercel project and import the repo.
3. Set the Environment Variables shown above in the Vercel Project Settings.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g., `https://yourdomain.com`).
5. Deploy. Preview deploys will happen on pull requests automatically.

No custom `vercel.json` is required; defaults work for Next.js App Router.
