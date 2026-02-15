import type { Config } from "prettier"
import type { PluginOptions } from "prettier-plugin-tailwindcss"

const config: Config & PluginOptions = {
  tabWidth: 2,
  semi: false,
  trailingComma: "none",
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-svelte"
  ],
  tailwindStylesheet: "./src/app/styles.css"
}

export default config
