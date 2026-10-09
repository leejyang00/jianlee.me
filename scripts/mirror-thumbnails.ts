// Copy each book thumbnail from Google Books to the assets bucket and point books.json at CloudFront.
//
//   ASSETS_BUCKET=<bucket behind d3tplfwk9gtha4.cloudfront.net> bun scripts/mirror-thumbnails.ts [--dry-run]
//
// Uploads to s3://$ASSETS_BUCKET/books/<volume_id>.jpg with the AWS CLI (uses your current AWS profile).
// Books whose thumbnail already points at CloudFront are skipped, so it's safe to re-run.

const BOOKS_JSON = "site/src/content/books.json";
const CLOUDFRONT_URL = "https://d3tplfwk9gtha4.cloudfront.net";

const bucket = process.env.ASSETS_BUCKET;
const dryRun = process.argv.includes("--dry-run");

if (!bucket) {
  console.error("Set ASSETS_BUCKET to the S3 bucket behind the assets CloudFront.");
  process.exit(1);
}

type Book = { volume_id: string; title: string; thumbnail: string };

const books = (await Bun.file(BOOKS_JSON).json()) as Book[];
let mirrored = 0;

for (const book of books) {
  const target = `${CLOUDFRONT_URL}/books/${book.volume_id}.jpg`;
  if (book.thumbnail === target) continue;

  // Google returns http:// links with a page-curl effect; ask for https and a flat image.
  const source = book.thumbnail.replace(/^http:/, "https:").replace(/&edge=curl/, "");
  console.log(`${book.volume_id}  ${book.title}`);
  if (dryRun) continue;

  const res = await fetch(source);
  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || !type.startsWith("image/")) {
    throw new Error(`${book.volume_id}: ${source} -> ${res.status} ${type}`);
  }

  const upload = Bun.spawn(
    [
      "aws", "s3", "cp", "-", `s3://${bucket}/books/${book.volume_id}.jpg`,
      "--content-type", "image/jpeg",
      "--cache-control", "public, max-age=31536000, immutable",
    ],
    { stdin: new Uint8Array(await res.arrayBuffer()), stdout: "inherit", stderr: "inherit" },
  );
  if ((await upload.exited) !== 0) throw new Error(`${book.volume_id}: upload failed`);

  book.thumbnail = target;
  mirrored++;
  // Save after each upload so a failure halfway keeps the progress.
  await Bun.write(BOOKS_JSON, JSON.stringify(books, null, 2) + "\n");
}

console.log(dryRun ? "\nDry run, nothing uploaded." : `\nMirrored ${mirrored} thumbnails.`);
