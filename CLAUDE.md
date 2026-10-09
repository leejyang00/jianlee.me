# jianlee.me

Personal site. v2 is an Astro static site in `site/` (see `docs/v2-brief.md`); v1 lives on the `v1` branch.

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
