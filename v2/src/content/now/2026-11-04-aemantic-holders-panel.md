---
title: "Aemantic: which big ETFs hold a stock"
date: 2026-11-04
product: aemantic
---

Stock pages are getting a Holders panel, in dev for now. It lists which of the largest US ETFs hold the company, with each fund's weight as a share of its net assets, and every row links to that fund's own holdings report filed with the SEC. The bars use a fixed scale rather than sizing to the biggest holder, so the panel can't be read as a leaderboard. It shows the first seven funds and scrolls for the rest.

Behind it, a daily job builds the list of holders for every company and stores it, and a new endpoint reads one small file per request instead of going through the filings each time. If a company isn't in any of those funds, the panel says so in a line. If the holders request fails, only that panel shows an error and a retry, and the rest of the page is untouched.
