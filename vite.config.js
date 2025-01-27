import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    outDir: "dist",
  },
  base: "/", // Ensure this is set to '/' or your Cloudflare Pages path
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
