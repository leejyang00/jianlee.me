---
title: "jianlee.me v2 is up at v2.jianlee.me"
date: 2026-10-10
product: jianlee-me
---

I rebuilt this site as a static Astro app. Every page comes from plain Markdown and JSON in the repo, with no database or API behind it, so updating it means editing a file and merging a PR.

It's hosted on a private S3 bucket behind CloudFront, all in Terraform. GitHub Actions deploys it with short-lived OIDC credentials, so no AWS keys are stored anywhere. v1 stays at v1.jianlee.me, and jianlee.me switches over once v2 is ready.
