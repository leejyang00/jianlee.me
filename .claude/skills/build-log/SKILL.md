---
name: build-log
description: Draft new jianlee.me build-log (now) entries from what shipped in Burno and Aemantic. Pulls merged PRs since the last entry per product from the Burno repo and the Aemantic org (web client, backend, eng handbook), groups them into short entries in Jian's voice, and keeps private Aemantic work public-safe. Use when the user says "update the build log", "what did I ship", "write now entries", "catch up the build log", or runs /build-log.
argument-hint: "[--since YYYY-MM-DD] [burno|aemantic]"
---

# Update the build log

Turns recent merged PRs into `v2/src/content/now/*.md` entries. The log is **public** at `/now`, on the home page and in `/now/rss.xml`, and most Aemantic repos are **private**. Being public-safe matters more than being complete.

## 1. Gather

From `v2/`:

```sh
bun scripts/build-log-sources.ts --bodies            # since each product's last entry
bun scripts/build-log-sources.ts --since 2026-10-01  # or from a fixed date
```

If the user named a product, only draft for that one. Edit the `SOURCES` map in the script when a repo is added or retired, and tell the user. If the output lists **"Other … repos pushed since"**, ask whether to add them before using them.

The window starts the day *after* the newest entry, so PRs merged later on the same day as that entry are skipped. Pass `--since <that date>` if the user says something's missing.

## 2. Pick what's worth an entry

- One entry per product per **theme or burst of work**, usually a launch, a feature, or a few days of related changes. Don't write one entry per PR. Roughly 2–6 PRs feed each entry.
- **Lead with what a user can see or do.** Mention infra or refactors only when they're the point, and then in a sentence.
- Skip on their own: chores, dependency bumps, CI tweaks, internal docs, agent or tooling setup, and planning docs. `context only` repos (the eng handbook) explain *why*. They're never the subject.
- Date each entry by the **last merged PR** it covers. The file name is `YYYY-MM-DD-<short-slug>.md`.

## 3. Write

Frontmatter must match the `now` schema in `v2/src/content.config.ts`:

```md
---
title: "Burno: picture cards, pace and a crowd counter"
date: 2026-10-09
product: burno          # slug from v2/src/content/products/
links:                  # optional
  - label: "burno.app"
    url: https://burno.app
---

One or two short paragraphs.
```

- **Voice:** first person, plain, specific, no hype or exclamation marks. Prefix the title with the product name ("Aemantic: …") unless the title already names it. Match the existing entries in `v2/src/content/now/`.
- **Facts only from the PRs.** Never invent numbers, user counts, revenue, dates or features. Numbers in PR descriptions are often mock or example data ("1,284 workouts"). Don't use them unless the PR says they're real.

### Public-safety rules (non-negotiable)

- **Private repos (`PRIVATE: no links`):** never link to the PR, the repo or `pr-assets` images. Describe the change in product terms.
- Leave out internal detail that's in PR bodies: milestone codes (M2, M3, W38), `NOW.md` tasks, session names, "founder notes", agent names, ADR numbers, internal URLs, account IDs, vendor keys, pricing and strategy.
- **Never** read `aemantic/aemantic_founder_notes`, even when a PR body links to it.
- Say "in dev" when a PR says it's dev-only or a prototype. Don't imply it's live for users.
- Public repos (Burno): linking the app (`https://burno.app`) is fine. Link a PR only if it adds something.

## 4. Check and hand off

1. `cd site && bun run check` must pass.
2. Show the user each new entry (title, date, body) and list the PRs each one covers. Flag anything you were unsure was public-safe.
3. Don't commit. The user reviews and runs `/ship`. New entries change `/now` and the home page, so the PR needs screenshots (see `CLAUDE.md`).
