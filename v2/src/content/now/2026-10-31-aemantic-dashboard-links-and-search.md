---
title: "Aemantic: balanced dashboard, one overlap table and a company link on every row"
date: 2026-10-31
product: aemantic
---

The dashboard now reads as a grid instead of a column with holes in it. Panels are paired so the rows line up, and long tables scroll inside their own panel rather than pushing everything else down. Fund overlap used to be one block per pair of funds. It is now a single fund-by-fund table you read across, with the shading in one blue family and the number always printed next to it.

Companies inside a fund now link to their own page wherever I can match the holding to a real listing. That needed a lookup table on the backend that maps each fund holding to a company, so it's a lot of unglamorous matching work. The header search got two fixes: it shows a loading state instead of looking empty while the server wakes up, and suggestions are real links, so right-click and open in a new tab work. The logo also got a fix, so the gorilla's face is filled and shows up on the dark header.
