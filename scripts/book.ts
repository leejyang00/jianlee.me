// Add, remove or list books in site/src/content/books.json.
//
//   bun scripts/book.ts add <google volume id> <year read> <affiliate link>
//   bun scripts/book.ts remove <google volume id>
//   bun scripts/book.ts list
//
// "add" looks the book up on Google Books, then mirrors its thumbnail to CloudFront
// (needs an AWS session: run sso-jianlee-me first). Commit and push to publish.
// Set GOOGLE_BOOKS_API_KEY if the anonymous Google Books quota is used up.

const BOOKS_JSON = "site/src/content/books.json";

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

const [command, ...args] = process.argv.slice(2);
const books = (await Bun.file(BOOKS_JSON).json()) as Book[];

async function save(list: Book[]) {
  // Newest reads first; the sort is stable, so a new book lands last within its year.
  list.sort((a, b) => b.read_year - a.read_year);
  await Bun.write(BOOKS_JSON, JSON.stringify(list, null, 2) + "\n");
}

function usage(): never {
  console.error(
    "Usage:\n" +
      "  bun scripts/book.ts add <google volume id> <year read> <affiliate link>\n" +
      "  bun scripts/book.ts remove <google volume id>\n" +
      "  bun scripts/book.ts list",
  );
  process.exit(1);
}

if (command === "list") {
  for (const b of books) console.log(`${b.read_year}  ${b.volume_id}  ${b.title}`);
} else if (command === "add") {
  const [volumeId, year, affiliateLink] = args;
  const readYear = Number(year);
  if (!volumeId || !readYear || !affiliateLink?.startsWith("https://")) usage();
  if (books.some((b) => b.volume_id === volumeId)) {
    console.error(`${volumeId} is already in the list.`);
    process.exit(1);
  }

  // Google's anonymous quota is shared and often exhausted; a free API key avoids that.
  const key = process.env.GOOGLE_BOOKS_API_KEY;
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${volumeId}${key ? `?key=${key}` : ""}`,
  );
  if (res.status === 429) {
    console.error("Google Books quota exceeded. Set GOOGLE_BOOKS_API_KEY (free) and retry.");
    process.exit(1);
  }
  if (!res.ok) throw new Error(`Google Books lookup for ${volumeId} -> ${res.status}`);
  const info = ((await res.json()) as { volumeInfo: Record<string, any> }).volumeInfo;
  if (!info.imageLinks?.thumbnail) throw new Error(`${volumeId} has no thumbnail on Google Books`);

  const book: Book = {
    volume_id: volumeId,
    title: info.title,
    ...(info.subtitle && { subtitle: info.subtitle }),
    authors: info.authors ?? [],
    published_year: Number(String(info.publishedDate).slice(0, 4)),
    ...(info.pageCount && { page_count: info.pageCount }),
    ...(info.categories?.length && { categories: info.categories }),
    read_year: readYear,
    affiliate_link: affiliateLink,
    thumbnail: info.imageLinks.thumbnail,
  };
  await save([...books, book]);
  console.log(`Added ${book.title} (${readYear}). Mirroring thumbnail...`);

  const mirror = Bun.spawn(["bun", "scripts/mirror-thumbnails.ts"], {
    stdout: "inherit",
    stderr: "inherit",
  });
  if ((await mirror.exited) !== 0) {
    console.error("Thumbnail mirror failed; the book is saved. Re-run: bun scripts/mirror-thumbnails.ts");
    process.exit(1);
  }
} else if (command === "remove") {
  const [volumeId] = args;
  if (!volumeId) usage();
  const kept = books.filter((b) => b.volume_id !== volumeId);
  if (kept.length === books.length) {
    console.error(`${volumeId} is not in the list. See: bun scripts/book.ts list`);
    process.exit(1);
  }
  await save(kept);
  console.log(`Removed ${books.find((b) => b.volume_id === volumeId)!.title}.`);
} else {
  usage();
}
