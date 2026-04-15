// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import { loadEnv } from "vite";

const { FRONTEND_URL } = loadEnv(
  process.env.FRONTEND_URL ?? "localhost",
  process.cwd()
);

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [svelte(), sitemap()],
  site: FRONTEND_URL,

  vite: {
    plugins: [tailwindcss()]
  },

  fonts: [
    {
      name: "Wix Madefor Display",
      cssVariable: "--font-wix",
      provider: fontProviders.google(),
      optimizedFallbacks: false,
      subsets: ["latin", "cyrillic"],
      weights: ["400 800"]
    }
  ]
});
