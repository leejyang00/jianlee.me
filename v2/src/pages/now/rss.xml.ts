import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getNow, getSite } from "../../lib/content";

export async function GET(context: APIContext) {
  const [site, entries] = await Promise.all([getSite(), getNow()]);
  return rss({
    title: `${site.name}: build log`,
    description: site.tagline,
    site: context.site ?? "https://jianlee.me",
    // Otherwise the item links become /now/#slug/ and the anchor no longer matches.
    trailingSlash: false,
    items: entries.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      link: `/now/#${entry.id}`,
      content: entry.rendered?.html ?? "",
      ...(entry.data.product ? { categories: [entry.data.product] } : {}),
    })),
  });
}
