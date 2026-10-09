// Collect merged PRs since the last build-log entry, per product, as Markdown for the
// build-log skill (.claude/skills/build-log/SKILL.md) to turn into now entries.
//
//   bun scripts/build-log-sources.ts [--since YYYY-MM-DD] [--bodies]   (from v2/)
//
// Without --since, each product starts the day after its newest entry in
// src/content/now/ (or 30 days ago if it has none). --bodies adds a trimmed
// excerpt of each PR description. Needs `gh` logged in with access to the repos.
// Uses the REST API (`gh api`) only: GraphQL, which `gh pr list` and `gh repo list`
// need, is blocked in Claude Code cloud sessions such as the weekly routine.

const NOW_DIR = "src/content/now";

// Repos per product. `public: false` means readers can't open the PRs, so entries
// describe what shipped and never link to them. `context` repos are background
// only (docs, ADRs): use them to understand a change, not as entries of their own.
const SOURCES: Record<string, { repo: string; public: boolean; context?: boolean }[]> = {
  burno: [{ repo: "leejyang00/52-card-workout", public: true }],
  aemantic: [
    { repo: "aemantic/aemantic_web_client", public: false },
    { repo: "aemantic/aemantic_backend_client", public: false },
    { repo: "aemantic/aemantic_eng_handbook", public: false, context: true },
  ],
  "jianlee-me": [{ repo: "leejyang00/jianlee.me", public: true }],
};

// Orgs to scan for active repos that aren't in SOURCES yet.
const ORGS: Record<string, string> = { aemantic: "aemantic" };
// Never read: founder-private strategy, not for anything public.
const EXCLUDED = new Set(["aemantic/aemantic_founder_notes"]);

type PR = { number: number; title: string; mergedAt: string; url: string; body: string };

const args = process.argv.slice(2);
const sinceArg = args.includes("--since") ? args[args.indexOf("--since") + 1] : undefined;
const withBodies = args.includes("--bodies");

async function gh(cmd: string[]): Promise<string> {
  const proc = Bun.spawn(["gh", ...cmd], { stdout: "pipe", stderr: "pipe" });
  const [out, err, code] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);
  if (code !== 0) throw new Error(`gh ${cmd.join(" ")}: ${err.trim()}`);
  return out;
}

// Merged PRs since a date. REST can't search by merge date, so page through closed
// PRs, most recently updated first, and stop once a whole page predates `since`
// (a PR is never updated before it's merged).
async function mergedPRs(repo: string, since: string): Promise<PR[]> {
  const prs: PR[] = [];
  for (let page = 1; page <= 10; page++) {
    const batch = JSON.parse(
      await gh(["api", `repos/${repo}/pulls?state=closed&sort=updated&direction=desc&per_page=100&page=${page}`]),
    ) as { number: number; title: string; merged_at: string | null; updated_at: string; html_url: string; body: string | null }[];
    for (const pr of batch) {
      if (pr.merged_at && pr.merged_at.slice(0, 10) >= since) {
        prs.push({ number: pr.number, title: pr.title, mergedAt: pr.merged_at, url: pr.html_url, body: pr.body ?? "" });
      }
    }
    if (batch.length < 100 || batch.every((pr) => pr.updated_at.slice(0, 10) < since)) break;
  }
  return prs;
}

function message(error: unknown): string {
  return (error instanceof Error ? error.message : String(error)).split("\n")[0];
}

// Newest entry date per product, read from frontmatter.
async function lastEntryDates(): Promise<Record<string, string>> {
  const latest: Record<string, string> = {};
  for await (const file of new Bun.Glob("*.md").scan(NOW_DIR)) {
    const text = await Bun.file(`${NOW_DIR}/${file}`).text();
    const date = text.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
    const product = text.match(/^product:\s*(\S+)/m)?.[1];
    if (date && product && (!latest[product] || date > latest[product])) latest[product] = date;
  }
  return latest;
}

function dayAfter(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function excerpt(body: string): string {
  const text = body
    .replace(/<img[^>]*>/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
  return text.length > 700 ? `${text.slice(0, 700)}…` : text;
}

const latest = await lastEntryDates();
const thirtyDaysAgo = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
const out: string[] = [`# Build-log sources (${new Date().toISOString().slice(0, 10)})`, ""];

for (const [product, repos] of Object.entries(SOURCES)) {
  const since = sinceArg ?? (latest[product] ? dayAfter(latest[product]) : thirtyDaysAgo);
  out.push(`## ${product}: merged since ${since}`, "");
  if (latest[product]) out.push(`Last entry: ${latest[product]}`, "");

  for (const { repo, public: isPublic, context } of repos) {
    const tags = [isPublic ? "public: links OK" : "PRIVATE: no links", context && "context only"]
      .filter(Boolean)
      .join(", ");
    let prs: PR[];
    try {
      prs = await mergedPRs(repo, since);
    } catch (error) {
      out.push(`### ${repo} (${tags}): COULD NOT READ`, "", `    ${message(error)}`, "");
      continue;
    }
    out.push(`### ${repo} (${tags}): ${prs.length} PR(s)`, "");
    for (const pr of prs.sort((a, b) => a.mergedAt.localeCompare(b.mergedAt))) {
      out.push(`- ${pr.mergedAt.slice(0, 10)} #${pr.number} ${pr.title}${isPublic ? ` (${pr.url})` : ""}`);
      if (withBodies && pr.body) {
        out.push(...excerpt(pr.body).split("\n").map((line) => `    > ${line}`));
      }
    }
    out.push("");
  }

  const org = ORGS[product];
  if (org) {
    const known = new Set(repos.map((r) => r.repo));
    try {
      const active = (
        JSON.parse(await gh(["api", `orgs/${org}/repos?sort=pushed&direction=desc&per_page=100`])) as {
          full_name: string;
          pushed_at: string;
          description: string | null;
        }[]
      ).filter((r) => !known.has(r.full_name) && !EXCLUDED.has(r.full_name) && r.pushed_at.slice(0, 10) >= since);
      if (active.length) {
        out.push(`### Other ${org} repos pushed since ${since} (not in SOURCES)`, "");
        for (const r of active) out.push(`- ${r.full_name}: ${r.description ?? ""}`);
        out.push("");
      }
    } catch (error) {
      out.push(`### Other ${org} repos: couldn't list (${message(error)})`, "");
    }
  }
}

console.log(out.join("\n"));
