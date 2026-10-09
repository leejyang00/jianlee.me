# infra/: AWS hosting for jianlee.me v2

Terraform for the v2 site: a private S3 bucket behind CloudFront (OAC), an ACM
certificate, a CloudFront Function for pretty URLs and `www` → apex, and a GitHub
OIDC role for deploys. Account `319829039858`, region `ap-southeast-2`
(ACM in `us-east-1`, as CloudFront requires).

| File | What |
|---|---|
| `bootstrap/` | One-time stack: the state bucket `jianlee-me-tfstate-319829039858` (local state) |
| `versions.tf` | Terraform ≥ 1.10, AWS provider 6.x, S3 backend with `use_lockfile = true` |
| `s3.tf` | Site bucket `jianlee-me-site-319829039858`: private, versioned, SSE-S3, old versions expire after 30 days |
| `acm.tf` | Cert for `jianlee.me`, `www.jianlee.me`, `v2.jianlee.me` (not `v1`; Cloudflare serves that) |
| `cloudfront.tf` | Distribution, OAC, cache policies (`/_astro/*` 1 year, HTML 5 min), 403/404 → `/404.html` |
| `functions/viewer-request.js` | `/path` and `/path/` → `/path/index.html`; `www` → 301 to apex |
| `iam.tf` | `github-deploy-jianlee-me`: `v2`/`main` only; S3 list/put/delete on the site bucket + invalidation |
| `variables.tf` | `live` is the cutover switch |

All commands below use `AWS_PROFILE=jianlee-me` (run `aws sso login --profile jianlee-me` first).

## First-time setup

```sh
# 1. State bucket (once)
cd infra/bootstrap
terraform init
terraform apply

# 2. Main stack: create the cert first so you can add its DNS records
cd ..
terraform init
terraform apply -target=aws_acm_certificate.site
terraform output acm_validation_records
```

3. In Cloudflare DNS, add each validation record as a **CNAME, DNS only (grey cloud)**.
   Cloudflare's UI wants the name without the trailing `.jianlee.me.`.
4. Finish the stack (waits until ACM issues the cert, usually a few minutes):
   ```sh
   terraform apply
   ```
5. In Cloudflare DNS add `v2` → CNAME → `terraform output -raw distribution_domain`, **DNS only**.
6. Copy `site_bucket`, `distribution_id` and `deploy_role_arn` into GitHub repo variables
   for the Phase 4 deploy workflow.

Leave the validation CNAMEs in place forever; ACM needs them to auto-renew.

## Cutover (Phase 5)

Set `live = true` (in `variables.tf`, or `-var live=true`), `terraform apply`, then point
the apex and `www` at `distribution_domain` in Cloudflare (DNS only). The cert already
covers both names. Full step order is in the Phase 5 checklist.

## Rules

- Always `terraform plan` and review before `apply`. Claude never runs `apply`.
- `terraform fmt -recursive` before committing.
- Commit `.terraform.lock.hcl`; never commit state or `*.tfplan`.
