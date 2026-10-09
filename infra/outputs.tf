output "distribution_domain" {
  description = "CNAME target for v2 (and, after cutover, the apex and www) in Cloudflare DNS."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "distribution_id" {
  description = "Set as the CLOUDFRONT_DISTRIBUTION_ID repo variable for deploy-v2.yaml."
  value       = aws_cloudfront_distribution.site.id
}

output "site_bucket" {
  description = "Set as the SITE_BUCKET repo variable for deploy-v2.yaml."
  value       = aws_s3_bucket.site.bucket
}

output "deploy_role_arn" {
  description = "Set as the AWS_DEPLOY_ROLE_ARN repo variable for deploy-v2.yaml."
  value       = aws_iam_role.deploy.arn
}

output "acm_validation_records" {
  description = "Add these as DNS-only CNAMEs in Cloudflare so ACM can issue the certificate."
  value = {
    for o in aws_acm_certificate.site.domain_validation_options : o.domain_name => {
      name  = o.resource_record_name
      type  = o.resource_record_type
      value = o.resource_record_value
    }
  }
}

output "aliases" {
  description = "Hostnames CloudFront currently answers for (driven by var.live)."
  value       = local.aliases
}
