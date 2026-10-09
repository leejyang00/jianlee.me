---
description: Check, commit, push and open a PR for the current site changes
argument-hint: [optional commit message]
---

Ship the current changes. Message hint: $ARGUMENTS

1. `git status` and `git diff`: summarise what's changing. Stop if there's anything unexpected (secrets, `.env`, Terraform state, large binaries, files under `public/` that belong on CloudFront).
2. Run `bun run check` in `v2/`. If it fails, fix it or tell me. Never ship a red check.
3. If `infra/` changed, run `terraform -chdir=infra plan` and show me the summary first. Never run `apply`.
4. If I'm on `v2` or `main`, create a branch (`content/<slug>`, `feat/<slug>` or `fix/<slug>`). Never commit straight to `v2` or `main`.
5. Commit with a conventional message (`content(now): …`, `content(books): …`, `feat(site): …`). No AI co-author trailer.
6. Push the branch and open a PR with `gh pr create`. The base is `v2` until go-live, `main` after. If the change is visual, add screenshots as `CLAUDE.md` describes.
7. Report the branch, commit SHA and PR URL. Merging the PR deploys it via `deploy-v2.yaml`.
