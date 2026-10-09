# Read-only role for .github/workflows/infra-plan.yaml (terraform plan on PRs).
# It can read state and refresh this stack's resources, nothing else. Plans run
# with -lock=false, so it never writes the state bucket.
data "aws_iam_policy_document" "plan_trust" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    # Only pull_request runs from this repo (forks never get an OIDC token).
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repo}:pull_request"]
    }
  }
}

resource "aws_iam_role" "plan" {
  name                 = "github-plan-jianlee-me"
  description          = "GitHub Actions terraform plan for jianlee.me infra (read-only)"
  assume_role_policy   = data.aws_iam_policy_document.plan_trust.json
  max_session_duration = 3600
}

data "aws_iam_policy_document" "plan" {
  statement {
    sid     = "ReadStateAndSiteBuckets"
    actions = ["s3:Get*", "s3:List*"]
    resources = [
      "arn:aws:s3:::jianlee-me-tfstate-${local.account_id}",
      "arn:aws:s3:::jianlee-me-tfstate-${local.account_id}/*",
      aws_s3_bucket.site.arn,
    ]
  }

  statement {
    sid = "ReadCloudFrontAndAcm"
    actions = [
      "cloudfront:Get*",
      "cloudfront:List*",
      "cloudfront:DescribeFunction",
      "acm:DescribeCertificate",
      "acm:ListTagsForCertificate",
    ]
    resources = ["*"]
  }

  statement {
    sid = "ReadIam"
    actions = [
      "iam:GetRole",
      "iam:GetRolePolicy",
      "iam:ListRolePolicies",
      "iam:ListAttachedRolePolicies",
      "iam:GetOpenIDConnectProvider",
    ]
    resources = [
      "arn:aws:iam::${local.account_id}:role/github-*-jianlee-me",
      data.aws_iam_openid_connect_provider.github.arn,
    ]
  }

  # The OIDC provider data source looks it up by URL.
  statement {
    sid       = "ListOidcProviders"
    actions   = ["iam:ListOpenIDConnectProviders"]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "plan" {
  name   = "plan-read-only"
  role   = aws_iam_role.plan.id
  policy = data.aws_iam_policy_document.plan.json
}
