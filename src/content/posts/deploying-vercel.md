---
title: "Deploying to Vercel"
date: "2025-09-15"
tags: ["vercel", "deployment"]
description: "Ship your Next.js app with CI/CD and environment variables."
---

# Deploying to Vercel

Vercel provides a first‑class hosting experience for Next.js. This guide covers the workflow from Git to production, environment variables, preview deploys, and common gotchas.

## Prerequisites

- A GitHub/GitLab/Bitbucket repository
- Vercel account with access to the repo

## 1) Push your project

```bash
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## 2) Import on Vercel

- Go to https://vercel.com/new and import your repo.
- Framework preset: Next.js (auto‑detected)
- Build command: `next build` (auto)
- Output: `.vercel/output` or Next default (auto)

## 3) Environment variables

Set these in Vercel Project Settings → Environment Variables:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXX
# Giscus comments (optional)
NEXT_PUBLIC_GISCUS_REPO=owner/repo
NEXT_PUBLIC_GISCUS_REPO_ID=...
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=...
# Newsletter (optional)
NEWSLETTER_PROVIDER=mock # or mailchimp | convertkit
MAILCHIMP_API_KEY=...
MAILCHIMP_AUDIENCE_ID=...
CONVERTKIT_API_KEY=...
CONVERTKIT_FORM_ID=...
```

## 4) Preview and Production

- Every push to a branch creates a Preview Deployment with a unique URL.
- Merging to `main` (or your Production Branch) triggers a Production Deployment.
- Use preview URLs for QA and stakeholder review.

## 5) Custom domain

- Add your domain in Vercel → Domains and set it as primary.
- Update `NEXT_PUBLIC_SITE_URL` to the primary domain and redeploy for correct canonicals.

## Best practices

- Keep secrets server‑only (don’t prefix with `NEXT_PUBLIC_`).
- Use ISR (`export const revalidate = 60`) for content that updates periodically.
- Monitor build output and warnings; fix missing images, redirects, and 404s.

## Troubleshooting

- "Module not found" → Ensure dependencies are listed and lockfile is committed.
- Wrong canonical/OG URLs → Check `metadataBase` and `NEXT_PUBLIC_SITE_URL`.
- 404 for dynamic routes → Ensure `generateStaticParams()` or fallback rendering is configured.
