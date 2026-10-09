# jianlee.me

Personal site. v2 is an Astro static site in `site/` (see `docs/v2-brief.md`); v1 lives on the `v1` branch.

## Stack and where things live

- **Site:** Astro (static) + Tailwind 4 + TypeScript, built with Bun, in `site/`.
- **Content:** everything editable is in `site/src/content/`. Each file is validated by the Zod schemas in `site/src/content.config.ts`. There's no database, API or CMS: edit a file, open a PR, merge.
  | File | Drives |
  |---|---|
  | `site.json` | Home hero: name, tagline, bio, photo, socials |
  | `products/<slug>.md` | Product cards on `/` (and `/products/<slug>` if the file has a body) |
  | `now/YYYY-MM-DD-<slug>.md` | `/now` build log, the home page's latest 3, `/now/rss.xml` |
  | `resume.json` | `/resume` |
  | `books.json` | `/books`, grouped by `read_year` |
- **Images and PDFs** aren't committed. They're uploaded by hand to the assets bucket `jianlee-me-website-resources` and served from `https://d3tplfwk9gtha4.cloudfront.net` (`/images`, `/documents`, `/books`).
- **Hosting:** `infra/` (Terraform). Private S3 bucket + CloudFront, live at `v2.jianlee.me` until cutover. See `infra/README.md`.
- **Deploys:** `.github/workflows/deploy-v2.yaml` runs on every push to `v2` (later `main`) that touches `site/`. It builds, syncs to S3 and invalidates CloudFront. Merging a PR is how you publish.

## Recipes

Slash commands cover the common ones: `/now`, `/add-book`, `/ship` (in `.claude/commands/`).

**Add a now entry.** Create `site/src/content/now/YYYY-MM-DD-<slug>.md`:
```md
---
title: "Short, specific title"
date: 2026-10-10
product: burno            # optional: a slug from products/
links:                    # optional
  - label: "X post"
    url: https://x.com/...
---

One to three short paragraphs.
```
Delete the placeholder `2026-10-09-v2-under-construction.md` once real entries exist.

**Add a book.** `AWS_PROFILE=jianlee-me bun scripts/book.ts add <google volume id> <year read> <affiliate link>`, run from the repo root. It looks the book up on Google Books, appends it to `books.json` and mirrors the thumbnail to CloudFront (`scripts/mirror-thumbnails.ts`). Remove one with `bun scripts/book.ts remove <volume id>`.

**Update a product.** Edit `site/src/content/products/<slug>.md`. `status` is `live`, `building` or `paused`; `order` sets the card order. Add a Markdown body to get a `/products/<slug>` page.

**Update the CV.** Edit `site/src/content/resume.json`. For a new PDF, upload it to `s3://jianlee-me-website-resources/documents/`, set `pdfUrl` to its CloudFront URL, and check that `curl -I <url>` returns 200.

## Rules

- Run `bun run check` in `site/` before every commit. Never push a red check.
- Every change goes through a branch and a PR into `v2` (into `main` after go-live). Never commit straight to `v2` or `main`.
- Never edit `infra/` without showing `terraform plan` first. Never run `terraform apply`; Jian runs it.
- Never commit secrets, `.env` files, Terraform state or binaries (images and PDFs go to CloudFront).
- Don't invent copy, numbers, user counts or revenue. Ask.

## Pull requests: screenshots are required for frontend changes

Any PR that changes what the site looks like must show it, so the reviewer never has to guess what changed. This covers pages, components, layout, styles, copy shown on a page and content that changes a rendered page. It doesn't apply to changes with no visual effect (scripts, infra, CI, docs).

1. Build and serve the site from `site/`:
   ```sh
   bun run build && bunx astro preview --port 4399
   ```
2. Capture every page you changed, plus a component-level crop of each important component you changed. A shot is a route, or a route and a CSS selector separated by `|`:
   ```sh
   bun run screenshot -- --base http://localhost:4399 --out /tmp/pr-shots \
     /books/ "/|section[aria-labelledby=products]"
   ```
   Each shot is taken in light and dark, at desktop (1280px) and mobile (390px). For sticky or scroll-dependent UI, use an anchor shot such as `"/resume/#skills"`, which captures the viewport after jumping there.
3. Look at the screenshots yourself before publishing. Fix anything broken first.
4. Publish them to the `pr-screenshots` branch (never commit screenshots to a working branch):
   ```sh
   scripts/publish-screenshots.sh <pr-number> /tmp/pr-shots
   ```
   This prints one raw URL per image.
5. Add a `## Screenshots` section to the PR description. For each page or component, add a heading that says what changed, then a Light | Dark table of the desktop shots. Put the mobile shots in a collapsed `<details>` block. When you're modifying something that already exists, also capture the base branch and show **Before | After**.
6. If the UI changes again after review, re-run steps 2–5 for the same PR number. The publish script replaces that PR's folder.

Then stop the preview with `bunx astro preview stop`.
