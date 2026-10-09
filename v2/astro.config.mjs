// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://jianlee.me",
  output: "static",
  trailingSlash: "ignore",
  // The whole stylesheet is a few KB, so inlining it saves a render-blocking request.
  build: { format: "directory", inlineStylesheets: "always" },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
