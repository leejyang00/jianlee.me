import { getCollection, getEntry } from "astro:content";

export async function getSite() {
  const site = await getEntry("site", "main");
  if (!site) throw new Error("src/content/site.json is missing");
  return site.data;
}

export async function getProducts() {
  const products = await getCollection("products");
  return products.sort((a, b) => a.data.order - b.data.order);
}

/** A product gets a /products/[slug] page only when its Markdown has a body. */
export function hasDetailPage(product: { body?: string | undefined }) {
  return Boolean(product.body?.trim());
}

/** Build-log entries, newest first. */
export async function getNow() {
  const entries = await getCollection("now");
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
