# jianlee.me v1 — audit

Snapshot of v1 as of tag `v1.0` (commit `6524a21`), taken before the v2 rebuild.
v1 lives on the `v1` branch from now on and will be served permanently at `v1.jianlee.me`.

## Stack

| Layer | What | Where in the repo |
|---|---|---|
| Frontend | Vite 6 + React 18 SPA, TanStack Router (file routes) + TanStack Query, Tailwind 3, MUI icons/material, react-markdown | repo root, `src/` |
| Package manager | Bun | `bun.lockb`, `api/bun.lockb` |
| Hosting | Cloudflare Pages, direct upload via `wrangler pages deploy dist` | `.github/workflows/deploy-pages.yaml` |
| API | Hono on a Cloudflare Worker `jianlee-api`, custom domain `api.jianlee.me` | `api/`, `api/wrangler.toml` |
| Data | Supabase Postgres tables `books_v1`, `gears`, `blog_posts`; Supabase Storage bucket `blog-posts` (markdown) | read via `api/src/db/index.ts` |
| Assets | AWS CloudFront `https://d3tplfwk9gtha4.cloudfront.net` serving `/images`, `/documents` (resume PDF), `/books`, `/gears` | `src/shared/Constants.ts` |
| CI auth (AWS) | GitHub OIDC role `arn:aws:iam::319829039858:role/github-action-read-ssm-secrets` (`ap-southeast-2`); Supabase creds in SSM `/supabase/url`, `/supabase/key` | `.github/workflows/deploy-blog-posts-md.yaml` |

## Deploy workflows (as of `v1.0`)

| Workflow | Trigger | What it does |
|---|---|---|
| `deploy-pages.yaml` | push to `main`, manual | `bun run build` → `wrangler pages deploy dist` (secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_PROJECT_NAME`) |
| `deploy-workers.yaml` | push to `main` touching `api/**`, manual | `wrangler deploy` of the Worker (secret `CLOUDFLARE_API_TOKEN_WORKER`) |
| `deploy-blog-posts-md.yaml` | push to `main` touching `src/lib/posts/**/*.md`, manual | Assumes the OIDC role, reads Supabase creds from SSM, uploads changed markdown to the `blog-posts` bucket |

All three fire on `main`. Once Cloudflare Pages' production branch moves to `v1` (Phase 0), a push to `main` produces only a Pages *preview* deployment, but `deploy-workers.yaml` on `main` would still redeploy the Worker from `main`'s `api/` if anything under `api/**` changed there.

## Pages and data sources

| Route | Source |
|---|---|
| `/` | Static components (`src/components/Home/*`), socials in `Socials.tsx` |
| `/resume` | Hardcoded in `src/routes/resume/index.tsx`; "Download PDF" → CloudFront `/documents/` |
| `/books` | `GET api.jianlee.me/v1/books_v1` (Supabase `books_v1`), grouped by hardcoded `BOOK_YEARS`; thumbnails hotlinked from Google Books |
| `/gears` | `GET api.jianlee.me/v1/gears` (Supabase `gears`) |
| `/uses` | Redirects to `/gears` |
| `/projects` | `GET /v1/markdown/database` (Supabase `blog_posts`) |
| `/projects/$slug` | `GET /v1/markdown/content/:filename` (Storage `blog-posts`) |
| `/projects/gbrgroupco`, `/projects/pacemates-runclub` | Static pages |

Markdown sources for the posts are also committed in `src/lib/posts/*.md` and pushed to Storage by `deploy-blog-posts-md.yaml`.

## API endpoints (`api/src`)

CORS allowlist at `v1.0`: `https://jianlee.me`, `https://www.jianlee.me`, `http://localhost:5173`.

| Method | Path | Auth | Effect |
|---|---|---|---|
| GET | `/v1` | none | Hello text |
| GET | `/v1/books_v1` | none | List books |
| **POST** | **`/v1/books_v1`** | **none** | **Inserts a book (fetches metadata from Google Books)** |
| GET | `/v1/gears`, `/v1/gears/:category` | none | List gears |
| **POST** | **`/v1/gears`** | **none** | **Inserts a gear** |
| GET | `/v1/markdown` | none | List `.md` files in Storage |
| GET | `/v1/markdown/content/:filename` | none | Read one markdown file |
| **POST** | **`/v1/markdown/content`** | **none** | **Uploads a markdown file to Storage** |
| **DELETE** | **`/v1/markdown/content/:filename`** | **none** | **Deletes a markdown file from Storage** |
| GET | `/v1/markdown/database` | none | List `blog_posts` rows |

## Security issue: unauthenticated write endpoints

The four bold endpoints above accept requests from anyone. CORS only restricts browsers, so `curl` or any server can insert rows into `books_v1` and `gears`, upload arbitrary markdown to the `blog-posts` bucket, or delete existing posts. The Worker writes with its own `SUPABASE_KEY` secret, so the only thing that could stop these writes is Row Level Security, and only if that key is the anon key. The repo doesn't show which key it is. Check the Worker's secret: if it's `service_role`, RLS is bypassed and every write goes through, so rotate it after cutover.

**Fix (Phase 0, branch `v1`, commit `62f4757`):** all `POST`/`DELETE` handlers removed, so the Worker is read-only. The unused `MarkdownBlog.tsx` upload/delete UI and its client helpers went with them. Takes effect once the Worker is redeployed from `v1`.

**Final fix (Phase 5):** the Worker, `api.jianlee.me` and Supabase are retired entirely. v2 has no API.

## What breaks if v1 is moved as-is

- Served from `v1.jianlee.me`, the Books, Gears and Projects pages fail on CORS until `https://v1.jianlee.me` is in the allowlist (added in Phase 0 on `v1`, live after the Worker redeploy).
- Deleting the Worker or Supabase empties those pages. Phase 5 freezes v1 into a static snapshot (data as JSON in the repo) before either is removed.

## Other observations

- `api/` still carries Drizzle (`drizzle.config.ts`, `migrate.ts`, `src/db/schema/books.ts`) though the routes use the Supabase JS client directly; the Drizzle bits look unused.
- At `v1.0`, root `tsc --noEmit` already reported errors (the `@/db` path alias used inside `api/` doesn't resolve from the root tsconfig, plus an unused variable and an implicit `any` in `markdown.ts`). `bun run build` (Vite) doesn't typecheck, so they never failed CI.
- Book thumbnails are hotlinked from Google; Phase 1 mirrors them to CloudFront.
