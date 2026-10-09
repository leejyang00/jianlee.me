---
name: Aemantic
slug: aemantic
url: https://app.aemantic.com
tagline: An AI portfolio explainer that shows what's really inside your investments, straight from SEC filings.
status: building
logo: https://d3tplfwk9gtha4.cloudfront.net/images/products/aemantic-white.png
startedAt: 2026-01
order: 1
---

## Introduction

Aemantic explains your portfolio. You list what you hold, and it reads the SEC filings behind each fund and company to show you what you actually own. It explains; it doesn't give advice.

## How it works

- **What's really inside.** Funds are looked through to the companies they hold, so you see how much of every $100 you have sits in each one, and where your funds overlap. Every number links to the SEC report it came from.
- **Meet your companies.** Each company gets a card with its industry in plain words, sales by year, net margin, P/E and the top risks from its latest 10-K.
- **New since you last looked.** Recent SEC filings from the companies you hold.
- **Ask why.** A chat that answers questions about your holdings, using the same SEC data as the dashboard.

It's in active development, and new panels land in dev first.

**Stack:** TypeScript, React + Vite, AWS Lambda (streaming), API Gateway, DynamoDB, Amazon Bedrock with guardrails, an MCP server for the SEC EDGAR tools, Terraform across separate dev and prod AWS accounts.
