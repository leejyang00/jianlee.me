// Collect merged PRs since the last build-log entry, per product, as Markdown for the
// build-log skill (.claude/skills/build-log/SKILL.md) to turn into now entries.
//
//   bun scripts/build-log-sources.ts [--since YYYY-MM-DD] [--bodies]   (from v2/)
//
// Without --since, each product starts the day after its newest entry in
// src/content/now/ (or 30 days ago if it has none). --bodies adds a trimmed
// excerpt of each PR description. Needs `gh` logged in with access to the repos.

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
    const prs = JSON.parse(
      await gh([
        "pr", "list", "-R", repo, "--state", "merged", "--limit", "100",
        "--search", `merged:>=${since}`,
        "--json", "number,title,mergedAt,url,body",
      ]),
    ) as PR[];
    const tags = [isPublic ? "public: links OK" : "PRIVATE: no links", context && "context only"]
      .filter(Boolean)
      .join(", ");
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
    const active = (
      JSON.parse(await gh(["repo", "list", org, "--limit", "100", "--json", "nameWithOwner,pushedAt,description"])) as {
        nameWithOwner: string;
        pushedAt: string;
        description: string;
      }[]
    ).filter((r) => !known.has(r.nameWithOwner) && !EXCLUDED.has(r.nameWithOwner) && r.pushedAt.slice(0, 10) >= since);
    if (active.length) {
      out.push(`### Other ${org} repos pushed since ${since} (not in SOURCES)`, "");
      for (const r of active) out.push(`- ${r.nameWithOwner}: ${r.description}`);
      out.push("");
    }
  }
}

console.log(out.join("\n"));
