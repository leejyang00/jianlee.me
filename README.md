# jianlee.me

My personal site. The repo holds two separate apps that share nothing:

| Folder | Site | Stack | Served at |
|---|---|---|---|
| [`v2/`](v2/) | Current | Astro (static) + Tailwind, content in Markdown/JSON | [jianlee.me](https://jianlee.me) on AWS S3 + CloudFront |
| [`v1/`](v1/) | Archive, frozen | Vite + React SPA reading JSON snapshots, no backend | [v1.jianlee.me](https://v1.jianlee.me) on Cloudflare Pages |

- [`infra/`](infra/): Terraform for v2's hosting
- [`docs/`](docs/): the v1 audit and the v2 build brief
- [`CLAUDE.md`](CLAUDE.md): how the site is managed day to day

```sh
cd v2 && bun install && bun run dev    # current site
cd v1 && bun install && bun run dev    # archive
```
