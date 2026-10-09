# DNS lives on Cloudflare, so validation records are added by hand from the
# `acm_validation_records` output (see infra/README.md for the apply order).
resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name               = var.domain
  subject_alternative_names = [local.www_domain, local.preview_domain]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Blocks until ACM sees the CNAMEs, so CloudFront never gets an unissued cert.
resource "aws_acm_certificate_validation" "site" {
  provider = aws.us_east_1

  certificate_arn = aws_acm_certificate.site.arn

  timeouts {
    create = "2h"
  }
}
