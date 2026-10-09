data "aws_caller_identity" "current" {}

locals {
  account_id = data.aws_caller_identity.current.account_id

  preview_domain = "v2.${var.domain}"
  www_domain     = "www.${var.domain}"

  # The certificate covers every name from day one so cutover needs no new cert.
  # v1.<domain> is deliberately absent: Cloudflare Pages serves it.
  cert_domains = [var.domain, local.www_domain, local.preview_domain]

  aliases = var.live ? [local.preview_domain, var.domain, local.www_domain] : [local.preview_domain]
}
