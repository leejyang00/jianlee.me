#!/usr/bin/env bash
# Publishes a folder of PNGs to the orphan `pr-screenshots` branch under pr-<number>/
# and prints their raw URLs, ready to paste into a PR description.
#
#   scripts/publish-screenshots.sh <pr-number> <dir>
#
# Uses git plumbing only (temporary index, commit-tree), so the current branch,
# index and working tree are never touched, and screenshots never enter site history.
set -euo pipefail

pr="${1:?usage: publish-screenshots.sh <pr-number> <dir>}"
dir="${2:?usage: publish-screenshots.sh <pr-number> <dir>}"
branch="pr-screenshots"
repo="$(gh repo view --json nameWithOwner -q .nameWithOwner)"

git fetch -q origin "$branch" 2>/dev/null || true
parent="$(git rev-parse -q --verify "refs/remotes/origin/$branch" || true)"

export GIT_INDEX_FILE
GIT_INDEX_FILE="$(mktemp)"
trap 'rm -f "$GIT_INDEX_FILE"' EXIT
if [[ -n "$parent" ]]; then git read-tree "$parent"; else git read-tree --empty; fi

# Replace this PR's folder wholesale so re-runs don't leave stale images behind.
git rm -rq --cached --ignore-unmatch "pr-$pr" >/dev/null
for file in "$dir"/*.png; do
  blob="$(git hash-object -w "$file")"
  git update-index --add --cacheinfo "100644,$blob,pr-$pr/$(basename "$file")"
done

tree="$(git write-tree)"
commit="$(git commit-tree "$tree" ${parent:+-p "$parent"} -m "screenshots: PR #$pr")"
# Full-page PNGs add up to several MB; the default 1 MB HTTP buffer makes GitHub reject the push.
git -c http.postBuffer=524288000 push -q origin "$commit:refs/heads/$branch"

for file in "$dir"/*.png; do
  echo "https://raw.githubusercontent.com/$repo/$commit/pr-$pr/$(basename "$file")"
done
