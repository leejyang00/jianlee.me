// Turn the exported books_v1 table into site/src/content/books.json (v2 schema).
//
//   bun scripts/transform-books.ts backups/supabase-YYYY-MM-DD/books_v1.json

const OUT = "site/src/content/books.json";

type SupabaseBook = {
  volume_id: string;
  title: string;
  subtitle: string | null;
  authors: { name: string[] | null } | null;
  published_date: string | number | null;
  page_count: number | null;
  categories: { category: string[] | null } | null;
  read_at: number;
  affiliate_link: string;
  thumbnail: string;
};

type Book = {
  volume_id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  published_year: number;
  page_count?: number;
  categories?: string[];
  read_year: number;
  affiliate_link: string;
  thumbnail: string;
};

const input = process.argv[2];
if (!input) {
  console.error("Usage: bun scripts/transform-books.ts <path to books_v1.json>");
  process.exit(1);
}

const rows = (await Bun.file(input).json()) as SupabaseBook[];

const books: Book[] = rows.map((row) => {
  const published_year = Number(String(row.published_date ?? "").slice(0, 4));
  const missing = [
    !row.volume_id && "volume_id",
    !row.title && "title",
    !row.read_at && "read_at",
    !row.affiliate_link && "affiliate_link",
    !row.thumbnail && "thumbnail",
    !published_year && "published_date",
  ].filter(Boolean);
  if (missing.length) {
    throw new Error(`${row.volume_id ?? row.title}: missing ${missing.join(", ")}`);
  }

  // Keys in schema order; optional fields only when present.
  return {
    volume_id: row.volume_id,
    title: row.title,
    ...(row.subtitle && { subtitle: row.subtitle }),
    authors: row.authors?.name ?? [],
    published_year,
    ...(row.page_count && { page_count: row.page_count }),
    ...(row.categories?.category?.length && { categories: row.categories.category }),
    read_year: Number(row.read_at),
    affiliate_link: row.affiliate_link,
    thumbnail: row.thumbnail,
  };
});

// Newest reads first; within a year, keep the export order (insertion order).
books.sort((a, b) => b.read_year - a.read_year);

await Bun.write(OUT, JSON.stringify(books, null, 2) + "\n");

const years = [...new Set(books.map((b) => b.read_year))].join(", ");
console.log(`Wrote ${books.length} books to ${OUT} (read years: ${years})`);
