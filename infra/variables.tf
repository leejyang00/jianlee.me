variable "region" {
  description = "Region for the site bucket and IAM (CloudFront and ACM are global / us-east-1)."
  type        = string
  default     = "ap-southeast-2"
}

variable "domain" {
  description = "Apex domain."
  type        = string
  default     = "jianlee.me"
}

variable "live" {
  description = "Cutover switch. false: CloudFront serves v2.<domain> only. true: also <domain> and www.<domain>."
  type        = bool
  default     = true
}

variable "github_repo" {
  description = "owner/repo allowed to assume the deploy role via OIDC."
  type        = string
  default     = "leejyang00/jianlee.me"
}

variable "deploy_branches" {
  description = "Branches whose workflows may assume the deploy role."
  type        = list(string)
  default     = ["v2", "main"]
}
