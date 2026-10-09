# jianlee.me

Personal site. An Astro static site in `site/`, hosted on S3 + CloudFront (`infra/`), deployed by GitHub Actions on merge.

- Site and content: `site/` (content lives in `site/src/content/`)
- Infrastructure: `infra/` (Terraform, see `infra/README.md`)
- Tooling: `scripts/` (run with Bun from the repo root)
- How to manage the site: `CLAUDE.md`

```sh
cd site && bun install && bun run dev    # local dev
cd site && bun run check                 # astro check + build; run before every commit
```

The v1 React site lives on the `v1` branch (tags `v1.0`, `v1.1`) and is served at `v1.jianlee.me`.
