import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { defineCollection } from "astro:content";
import { file, glob, type Loader } from "astro/loaders";
import { z } from "astro/zod";

// Loads a single JSON object (site.json, resume.json) as a one-entry collection
// so it gets the same Zod validation as everything else.
function singleton(path: string): Loader {
  return {
    name: "singleton",
    load: async ({ config, store, parseData, watcher }) => {
      const url = new URL(path, config.root);
      const load = async () => {
        const raw = JSON.parse(await readFile(url, "utf8"));
        store.clear();
        store.set({ id: "main", data: await parseData({ id: "main", data: raw }) });
      };
      const filePath = fileURLToPath(url);
      watcher?.add(filePath);
      watcher?.on("change", (changed) => changed === filePath && load());
      await load();
    },
  };
}

const link = z.object({ label: z.string(), url: z.url() });

const site = defineCollection({
  loader: singleton("src/content/site.json"),
  schema: z.object({
    name: z.string(),
    location: z.string(),
    tagline: z.string(),
    bio: z.string(),
    photo: z.url(),
    socials: z.array(
      link.extend({
        platform: z.enum(["linkedin", "github", "instagram", "x"]),
        handle: z.string(),
      }),
    ),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/products" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    url: z.url(),
    tagline: z.string(),
    status: z.enum(["live", "building", "paused"]),
    logo: z.string().optional(),
    startedAt: z.coerce.date().optional(),
    order: z.number().int(),
    socials: z.array(link).optional(),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/now" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    product: z.string().optional(),
    links: z.array(link).optional(),
  }),
});

const books = defineCollection({
  loader: file("src/content/books.json", {
    parser: (text) =>
      (JSON.parse(text) as { volume_id: string }[]).map((book) => ({ id: book.volume_id, ...book })),
  }),
  schema: z.object({
    volume_id: z.string(),
    title: z.string(),
    subtitle: z.string().nullish(),
    authors: z.array(z.string()),
    published_year: z.number().int(),
    page_count: z.number().int().nullish(),
    categories: z.array(z.string()).nullish(),
    read_year: z.number().int(),
    affiliate_link: z.url(),
    thumbnail: z.url(),
  }),
});

const resume = defineCollection({
  loader: singleton("src/content/resume.json"),
  schema: z.object({
    headline: z.string(),
    location: z.string(),
    profile: z.string(),
    experience: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        location: z.string(),
        period: z.string(),
        blurb: z.string().optional(),
        bullets: z.array(z.string()),
      }),
    ),
    projects: z.array(
      z.object({
        title: z.string(),
        org: z.string(),
        bullets: z.array(z.string()),
        stack: z.string().optional(),
      }),
    ),
    skills: z.array(z.object({ category: z.string(), items: z.array(z.string()) })),
    certifications: z.array(z.object({ name: z.string(), date: z.string() })),
    education: z.array(
      z.object({
        school: z.string(),
        degree: z.string(),
        location: z.string(),
        period: z.string(),
        bullets: z.array(z.string()),
      }),
    ),
    interests: z.array(z.string()),
    pdfUrl: z.url(),
  }),
});

export const collections = { site, products, now, books, resume };
