// Dump the v1 Supabase data (tables + blog-posts bucket) to backups/supabase-YYYY-MM-DD/.
//
//   export SUPABASE_URL=... SUPABASE_KEY=...
//   bun scripts/export-supabase.ts
//
// Uses the Supabase REST and Storage HTTP APIs directly, so it needs no dependencies.

const TABLES = ["books_v1", "gears", "blog_posts"];
const BUCKET = "blog-posts";
const PAGE_SIZE = 1000;

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_KEY first.");
  process.exit(1);
}

const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };
const today = new Date().toISOString().slice(0, 10);
const outDir = `backups/supabase-${today}`;

async function request(path: string, init: RequestInit = {}): Promise<Response> {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: { ...headers, ...init.headers },
  });
  if (!res.ok) {
    throw new Error(`${init.method ?? "GET"} ${path} -> ${res.status} ${await res.text()}`);
  }
  return res;
}

async function exportTable(table: string): Promise<number> {
  const rows: unknown[] = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const res = await request(
      `/rest/v1/${table}?select=*&order=id.asc&limit=${PAGE_SIZE}&offset=${offset}`,
    );
    const page = (await res.json()) as unknown[];
    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
  }
  await Bun.write(`${outDir}/${table}.json`, JSON.stringify(rows, null, 2) + "\n");
  return rows.length;
}

type StorageEntry = { name: string; id: string | null };

// Storage lists one "folder" at a time; entries with a null id are sub-folders.
async function listObjects(prefix = ""): Promise<string[]> {
  const paths: string[] = [];
  for (let offset = 0; ; offset += 100) {
    const res = await request(`/storage/v1/object/list/${BUCKET}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prefix,
        limit: 100,
        offset,
        sortBy: { column: "name", order: "asc" },
      }),
    });
    const entries = (await res.json()) as StorageEntry[];
    for (const entry of entries) {
      const path = `${prefix}${entry.name}`;
      if (entry.id === null) paths.push(...(await listObjects(`${path}/`)));
      else paths.push(path);
    }
    if (entries.length < 100) break;
  }
  return paths;
}

async function exportBucket(): Promise<string[]> {
  const paths = await listObjects();
  for (const path of paths) {
    const encoded = path.split("/").map(encodeURIComponent).join("/");
    const res = await request(`/storage/v1/object/${BUCKET}/${encoded}`);
    await Bun.write(`${outDir}/storage/${BUCKET}/${path}`, await res.arrayBuffer());
  }
  return paths;
}

const manifest: Record<string, unknown> = { exportedAt: new Date().toISOString(), tables: {} };

for (const table of TABLES) {
  const count = await exportTable(table);
  (manifest.tables as Record<string, number>)[table] = count;
  console.log(`${table}: ${count} rows`);
}

const objects = await exportBucket();
manifest.storage = { [BUCKET]: objects };
console.log(`${BUCKET}: ${objects.length} objects`);

await Bun.write(`${outDir}/manifest.json`, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nWrote ${outDir}/`);
