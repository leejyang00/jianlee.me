---
description: Turn rough notes into a build-log entry in v2/src/content/now/
argument-hint: <notes, links, which product>
---

Turn these notes into a new `now` (build log) entry:

$ARGUMENTS

1. Create `v2/src/content/now/YYYY-MM-DD-<slug>.md`. Use today's date and a short kebab-case slug from the title.
2. Frontmatter must match the `now` schema in `v2/src/content.config.ts`:
   ```yaml
   ---
   title: "Short, specific title"
   date: YYYY-MM-DD
   product: burno        # optional; must be a slug in v2/src/content/products/
   links:                # optional; X/Instagram posts, PRs, releases
     - label: "X post"
       url: https://x.com/...
   ---
   ```
3. Body: 1–3 short paragraphs in my voice: first person, plain, no hype. Keep only what's in my notes. **Don't invent numbers, user counts, revenue or features.** If something's unclear, ask before writing it.
4. If the placeholder `2026-10-09-v2-under-construction.md` is still there, ask whether to delete it.
5. Run `bun run check` in `v2/`, then show me the entry. Don't commit; I'll use `/ship`.
