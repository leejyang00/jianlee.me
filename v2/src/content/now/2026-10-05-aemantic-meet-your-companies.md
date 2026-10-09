---
title: "Aemantic: \"Meet your companies\" cards"
date: 2026-10-05
product: aemantic
---

Panel 2 of the dashboard is live in dev. Each company you hold gets a card with its industry in plain words, sales by year, net margin, P/E and the top risks it lists in its 10-K, quoted in the filing's order. "Show details" switches a card to the exact figures and the filings they came from.

Behind it, the backend now caches 10-K data so the cards load quickly, and the API moved to explicit routes. I also put up a living design system page so the UI stays consistent as the panels grow.
