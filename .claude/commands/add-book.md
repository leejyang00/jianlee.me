---
description: Add a book to the bookshelf and mirror its thumbnail to CloudFront
argument-hint: <google volume id> <year read> <affiliate link>
---

Add a book: `$ARGUMENTS`

1. Check I passed all three: Google Books volume ID, the year I read it, and an `https://` affiliate link. If anything's missing, ask.
2. Make sure there's an AWS session for the thumbnail upload: `aws sts get-caller-identity --profile jianlee-me`. If it has expired, ask me to run `! aws sso login --profile jianlee-me`.
3. From the repo root, run:
   ```sh
   AWS_PROFILE=jianlee-me bun scripts/book.ts add <volume id> <year> <affiliate link>
   ```
   This looks the book up on Google Books, adds it to `site/src/content/books.json` and mirrors the thumbnail to `https://d3tplfwk9gtha4.cloudfront.net/books/<volume id>.jpg`.
4. Show me the new entry (title, authors, year). Check the thumbnail with `curl -sI <thumbnail url>`; it should return 200.
5. Run `bun run check` in `site/`. Don't commit; I'll use `/ship`.
