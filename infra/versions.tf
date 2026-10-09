terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # Created by infra/bootstrap. use_lockfile replaces the old DynamoDB lock table.
  backend "s3" {
    bucket       = "jianlee-me-tfstate-319829039858"
    key          = "site/terraform.tfstate"
    region       = "ap-southeast-2"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Project   = "jianlee-me"
      ManagedBy = "terraform"
      Stack     = "site"
    }
  }
}

# CloudFront only accepts ACM certificates from us-east-1.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project   = "jianlee-me"
      ManagedBy = "terraform"
      Stack     = "site"
    }
  }
}
