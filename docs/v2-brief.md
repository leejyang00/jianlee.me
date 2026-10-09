# jianlee.me v2 — build brief for Claude Code

> Paste this whole file into Claude Code from the root of `leejyang00/jianlee.me`, or save it as `docs/v2-brief.md` and say "Read docs/v2-brief.md and start Phase 0."
> Work phase by phase. Stop at the end of each phase, show me what changed, and wait for my OK before starting the next one.

## Goal

Rebuild jianlee.me as v2: a simple, fast personal site that shows the products I've built (Burno and Aemantic), plus my CV, my bookshelf and a short build log. Inspired by marclou.com: one clean landing page, my face and name, a short bio, product cards, socials.

Two hard requirements:

1. **Easy to manage with Claude.** All content lives in plain files in the repo (Markdown/JSON). Updating the site means editing a file and pushing. No database, no API, no CMS.
2. **v1 stays accessible forever at `v1.jianlee.me`.** v2 is built alongside it and previewed at `v2.jianlee.me`. Only when I say "go live" does `jianlee.me` switch to v2.

## Domains (end state and how we get there)

| Domain | Before cutover | After cutover (end state) |
|---|---|---|
| `jianlee.me` + `www` | v1 (Cloudflare Pages) | **v2** (AWS CloudFront) — always the latest version |
| `v1.jianlee.me` | v1 (Cloudflare Pages) | v1, frozen as a fully static archive (no Worker, no Supabase) |
| `v2.jianlee.me` | v2 preview (AWS CloudFront) | v2 too (same CloudFront distribution), kept as a stable alias |
| `api.jianlee.me` | v1 API (Cloudflare Worker) | **Removed** |

**Catch:** v1 isn't static today. Its Books, Gears and Projects pages call `api.jianlee.me`, which reads from Supabase. The Worker's CORS list also only allows `jianlee.me` and `www.jianlee.me`. Two consequences:
- Served from `v1.jianlee.me` as-is, those pages break on CORS.
- If the Worker and Supabase are later deleted, v1 loses its data.

So v1 gets frozen into a self-contained static snapshot (Phase 5) before the API and Supabase are retired.

## About me (for copy; ask me before inventing anything)

- Jian Yang Lee, DevOps Engineer II at Vistra (Digital team), Singapore. Joined August 2026. Previously DevOps and full-stack at Flight Centre in Brisbane.
- Malaysian, based in Singapore.
- Products:
  - **Burno**: https://burno.app. Has real users, a feedback form and Ko-fi donations. Ask me for a one-line description, status and logo.
  - **Aemantic**: https://aemantic.com. A multi-agent AI finance assistant. FastAPI, LangChain, MCP servers, SEC EDGAR and IBKR holdings, AWS multi-account. Currently on the "Phoenix" iteration. Has an Instagram account.
- Socials (from v1 `src/components/Home/Socials.tsx`): LinkedIn, GitHub, Instagram, X. Keep them and confirm the handles with me.

## What v1 has today (read-only audit)

- **Frontend:** Vite + React 18 + TanStack Router + Tailwind 3 + MUI icons, built with Bun, deployed to **Cloudflare Pages** (`.github/workflows/deploy-pages.yaml`).
- **API:** Hono on a **Cloudflare Worker** at `api.jianlee.me` (`api/`), reading from **Supabase** tables `books_v1`, `gears` and `blog_posts`, and the Supabase storage bucket `blog-posts`.
- **Assets:** already on **AWS**. CloudFront `https://d3tplfwk9gtha4.cloudfront.net` serves `/images`, `/documents` (resume PDF), `/books` and `/gears`.
- **AWS CI auth:** GitHub OIDC role `arn:aws:iam::319829039858:role/github-action-read-ssm-secrets` in `ap-southeast-2`, with Supabase creds stored in SSM `/supabase/url` and `/supabase/key`.
- **Pages:** Home, Resume (hardcoded in `src/routes/resume/index.tsx`), Books (Supabase), Gears (Supabase), Projects (Supabase `blog_posts` + markdown in storage), plus project pages for GBR Group Co and Pacemates.
- **Security issue:** the Worker exposes **unauthenticated** `POST /v1/books_v1`, `POST /v1/gears`, `POST /v1/markdown/content` and `DELETE /v1/markdown/content/:filename`. Anyone can write to or delete my data. v2 removes the API entirely, which fixes this.

## v2 decisions

| Area | v1 | v2 |
|---|---|---|
| Framework | Vite + React SPA + TanStack Router | **Astro** (static output) + Tailwind 4 + TypeScript. Use React islands only for something interactive (the theme toggle can be plain JS). |
| Content | Supabase tables + storage | **Astro content collections** in `src/content/` (Markdown + JSON, validated with Zod schemas) |
| API | Hono Worker on Cloudflare | **None.** Delete it at cutover. |
| Hosting | Cloudflare Pages | **S3 (private) + CloudFront (OAC)** in AWS account 319829039858 |
| Deploys | Wrangler with API tokens | **GitHub Actions + OIDC** → `aws s3 sync` + CloudFront invalidation |
| Infra | Click-ops | **Terraform** in `infra/` |
| Package manager | Bun | Keep Bun |

## Information architecture

| Route | Content source | Notes |
|---|---|---|
| `/` | `src/content/site.json` + `src/content/products/*.md` + latest 3 `now` entries | Hero: photo, name, one-line positioning, short bio. Then product cards for Burno and Aemantic (logo, one-liner, status badge, link out). Then "Latest from the build log", then socials. |
| `/now` | `src/content/now/YYYY-MM-DD-slug.md` | Reverse-chronological build log. Short entries (title, date, body, optional `links` to X/IG posts, optional `product` tag). RSS feed at `/now/rss.xml`. |
| `/resume` | `src/content/resume.json` | Port v1's layout and data from `src/routes/resume/index.tsx` into JSON. Keep the "Download PDF" button pointing at the CloudFront PDF. |
| `/books` | `src/content/books.json` | Same grouping by year read as v1. Generate year headings from the data instead of the hardcoded `BOOK_YEARS`. Thumbnails are served from our CloudFront, not Google. |
| `/products/[slug]` | `src/content/products/*.md` | Optional detail page per product. Only build it if the product's Markdown has a body. |

**Drop in v2:** Gears, Projects index, GBR Group Co and Pacemates pages, blog/markdown system, `MarkdownBlog.tsx`, the IDP CLI and other side projects. Ask me before dropping anything else.

**Content schemas (Zod):**
- `products`: `name`, `slug`, `url`, `tagline`, `status` (`live` | `building` | `paused`), `logo`, `startedAt`, `order`, `socials?`
- `now`: `title`, `date`, `product?`, `links?` (array of `{ label, url }`)
- `books`: `volume_id`, `title`, `subtitle?`, `authors[]`, `published_year`, `page_count?`, `categories[]?`, `read_year`, `affiliate_link`, `thumbnail`
- `resume`: `headline`, `location`, `profile`, `experience[]`, `projects[]`, `skills[]`, `certifications[]`, `education[]`, `interests[]`, `pdfUrl`
- `site`: `name`, `tagline`, `bio`, `photo`, `socials[]`

## Design direction

- marclou.com-like: one narrow column (about 640px), lots of whitespace, big friendly heading, product cards with logo, name, one-liner and a status pill. Fast and text-first.
- Keep v1's warm palette as a starting point (light `#f1e6db`, dark `#202122`, accent `#339995` / `#80e7d9`), with light/dark mode that respects `prefers-color-scheme` plus a toggle.
- System font stack or one Google font. No MUI; use inline SVG icons.
- Lighthouse 95+ on every page. Add OG/Twitter meta, `sitemap.xml`, `robots.txt` and a favicon (reuse `public/`).
- Before building UI, show me 2–3 design directions for the home page as static HTML and let me pick one.

## Repo layout

Build v2 on a branch `v2` in a `site/` folder so v1 at the repo root keeps deploying untouched:

```
site/                 # Astro v2 app
  src/content/        # ALL editable content lives here
  src/pages/
  src/components/
  public/
infra/                # Terraform for hosting
scripts/              # one-off migration scripts (export-supabase.ts, mirror-thumbnails.ts)
backups/              # gitignored; local dumps
CLAUDE.md             # how to manage the site (see Phase 4)
```

At cutover, move `site/` to the root or keep it there and delete the v1 code. Ask me which.

## Phases

### Phase 0 — Freeze v1
1. `git tag v1.0` on current `main` and push the tag. Create branch `v1` from it.
2. Create branch `v2` and do all work there.
3. Write `docs/v1-audit.md` summarising the v1 audit above, including the unauthenticated endpoints.
4. **Set up `v1.jianlee.me` now**, so the old site has its permanent address before anything moves. In the Cloudflare Pages project, add `v1.jianlee.me` as a custom domain (Cloudflare creates the DNS record). On branch `v1`, add `https://v1.jianlee.me` to the CORS `origin` list in `api/src/index.ts`. Write me the exact dashboard steps; I'll do the clicks.
5. **Close the security hole now.** On branch `v1`, remove the `POST`/`DELETE` handlers from `api/src/routes/books.ts`, `gears.ts` and `markdown.ts` so the Worker is read-only. Give me the commands to deploy it (`cd api && bunx wrangler deploy`).
6. In Cloudflare Pages settings, change the **production branch from `main` to `v1`**, so merging v2 into `main` later never redeploys over v1. Remove the `push: main` trigger from `deploy-pages.yaml` on `v1` (or point it at `v1`).

### Phase 1 — Data migration (Supabase → repo + AWS)
1. Write `scripts/export-supabase.ts`. It reads `SUPABASE_URL` and `SUPABASE_KEY` from env (I'll export them locally from SSM) and dumps the `books_v1`, `gears` and `blog_posts` tables plus every object in the `blog-posts` bucket to `backups/supabase-YYYY-MM-DD/` as JSON and `.md`.
2. Give me the exact `pg_dump` command for a full database backup too (I'll run it with the connection string from the Supabase dashboard).
3. Transform `books_v1` → `site/src/content/books.json` using the schema above (`authors.name` → `authors`, `categories.category` → `categories`, `read_at` → `read_year`).
4. Write `scripts/mirror-thumbnails.ts`. It downloads each book thumbnail and uploads it to the existing assets bucket behind `d3tplfwk9gtha4.cloudfront.net` under `/books/<volume_id>.jpg`, then rewrites `thumbnail` in `books.json` to the CloudFront URL. Ask me for the bucket name; don't guess it.
5. Upload the backup folder to S3 under `s3://<assets-bucket>/backups/supabase-YYYY-MM-DD/` (private, not public via CloudFront) so the data lives in AWS permanently.
6. Port resume data from `src/routes/resume/index.tsx` → `site/src/content/resume.json`. Then **flag what's outdated** (still says Brisbane and "seeking opportunities in Singapore", Flight Centre "Present", old Aemantic stack) and ask me for the updated content. Don't make it up.

### Phase 2 — Build the Astro site
1. Scaffold Astro in `site/` with Tailwind and TypeScript strict, and define the content collections and schemas.
2. Build the layout, home, `/now`, `/resume`, `/books` and optional `/products/[slug]`.
3. Seed `now` with one placeholder entry and ask me for real ones.
4. Add `bun run check` (astro check + build) and make it pass.

### Phase 3 — AWS hosting (Terraform)
In `infra/`, using the AWS provider, Terraform ≥ 1.10, and an S3 backend with `use_lockfile = true`:
- **State bucket:** create it first via a tiny bootstrap stack or document it as a one-time manual step.
- **Site bucket:** `jianlee-me-site-<suffix>`. Private, Block Public Access on, versioning on, SSE-S3.
- **ACM certificate in `us-east-1`** for `jianlee.me`, `www.jianlee.me` and `v2.jianlee.me` (all three from day one, so cutover needs no new cert) with DNS validation. Do **not** include `v1.jianlee.me`; Cloudflare serves that one. DNS is on Cloudflare, so output the validation CNAMEs for me to add manually (or use the Cloudflare provider if I give a scoped API token. Ask me.)
- **CloudFront distribution:**
  - OAC to the site bucket.
  - Aliases: controlled by a Terraform variable `live = false|true`. With `false` it's `v2.jianlee.me` only. With `true` it's `v2.jianlee.me`, `jianlee.me` and `www.jianlee.me`. Cutover is a one-line change.
  - `PriceClass_200`, HTTP/2+3.
  - Default root object `index.html`.
  - A **CloudFront Function** (viewer-request) that rewrites `/path/` and `/path` → `/path/index.html`, and redirects `www` → apex.
  - Custom 404 → `/404.html`.
  - Cache policy: long TTL for `/_astro/*` (hashed), short TTL for HTML.
- **GitHub OIDC deploy role** `github-deploy-jianlee-me`. Reuse the existing OIDC provider in the account (look it up with a `data` source; don't recreate it). The trust policy is limited to `repo:leejyang00/jianlee.me:ref:refs/heads/v2` and `refs/heads/main`. Permissions: only `s3:ListBucket`, `s3:PutObject` and `s3:DeleteObject` on the site bucket, plus `cloudfront:CreateInvalidation` on this distribution.
- **Outputs:** distribution domain, distribution ID, role ARN, ACM validation records.
- Run `terraform plan` and show me the plan. **Never run `apply` yourself.** I'll run it.

### Phase 4 — CI/CD and "manage with Claude"
1. `.github/workflows/deploy-v2.yaml`: runs on push to `v2` (later `main`) for changes under `site/`. Steps: Bun install → `bun run check` → build → OIDC assume role → `aws s3 sync dist s3://<bucket> --delete` (hashed assets with `immutable` cache headers, HTML with `no-cache`) → CloudFront invalidation of `/*`. Region and IDs come from repo variables, not hardcoded.
2. `.github/workflows/infra-plan.yaml`: `terraform fmt -check` + `validate` + `plan` on PRs touching `infra/`.
3. Write **`CLAUDE.md`** at the repo root with:
   - What the site is, the stack, and where content lives
   - Recipes:
     - "Add a now entry": create `site/src/content/now/YYYY-MM-DD-slug.md` with this frontmatter…
     - "Add a book": append to `books.json`, mirror the thumbnail with `scripts/mirror-thumbnails.ts`
     - "Update a product": edit `products/<slug>.md`
     - "Update CV": edit `resume.json`, upload the new PDF to `/documents/` and update `pdfUrl`
   - Rules: always run `bun run check` before committing; never edit `infra/` without showing a plan; never commit secrets.
4. Add `.claude/commands/` slash commands: `/now` (turn my notes into a now entry), `/add-book <google volume id> <year> <affiliate link>`, `/ship` (check, commit, push).

### Phase 5 — Cutover (only when I say "go live")
1. **Pre-flight:** confirm `v1.jianlee.me` loads every v1 page (Home, Resume, Books, Gears, Projects) and `v2.jianlee.me` passes Lighthouse 95+. Give me a checklist.
2. **Switch `jianlee.me` to v2.**
   - Remove the apex and `www` custom domains from the Cloudflare Pages project. Leave `v1.jianlee.me` attached.
   - Set `live = true` in Terraform; I run `apply`.
   - In Cloudflare DNS, point the apex (CNAME flattening) and `www` to the CloudFront domain with **DNS only / grey cloud**.
   - Give me the exact order of steps to keep downtime to a minute or two, plus a rollback (re-add the domains to Pages).
3. Merge `v2` → `main`. On `main`, delete the v1 source, `api/`, `deploy-workers.yaml`, `deploy-pages.yaml` and `deploy-blog-posts-md.yaml`. v1 lives on the `v1` branch and `v1.0` tag.
4. **Freeze v1 as static** (on branch `v1`, then tag `v1.1`):
   - Copy the Phase 1 exports into v1 as JSON (`src/data/books.json`, `gears.json`, `blog_posts.json`, plus the markdown posts).
   - Change `src/lib/api.ts` to read those files instead of calling `api.jianlee.me`. Keep the same function names so the pages don't change.
   - Redeploy to Cloudflare Pages and verify every page on `v1.jianlee.me` works with the Worker turned off.
5. Then delete the `jianlee-api` Worker and the `api.jianlee.me` DNS record. Remove the Supabase SSM params (`/supabase/url`, `/supabase/key`).
6. After 2 weeks with no issues, I'll pause or delete the Supabase project myself.

## Guardrails
- Ask before inventing copy, numbers, user counts or revenue.
- Never run `terraform apply`, `aws` write commands against prod, DNS changes or `git push --force` without my explicit OK.
- Keep dependencies minimal. Every new dependency needs a one-line justification in the PR.
- Small, reviewable commits per phase.
