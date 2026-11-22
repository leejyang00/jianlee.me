---
title: "Aemantic: a Supply chain panel, from who names the company"
date: 2026-11-19
product: aemantic
---

Stock pages are getting a Supply chain panel, in dev for now. It reads other companies' annual reports for sentences that name this one, and groups them by what each sentence says: sells to, buys from or relies on, works with, or competes with. Legal cases are kept apart. Each row shows the naming company, its sentence word for word and a link to the filing. There's no count headline and no graph, just the quotes.

The grouping is done by rules, not a model. To keep them honest there's now a labelled set of real rows that every rules change is scored against, plus a check that re-reads every cached filing with the old and new rules and lists each row whose reading changed. One update scored better on the set but made some rows worse, and the next version fixed them and added that check.
