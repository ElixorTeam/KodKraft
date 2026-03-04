const config = {
  tabWidth: 2,
  semi: true,
  trailingComma: "none",
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-svelte"
  ],
  tailwindStylesheet: "./apps/web/src/app/styles.css"
};

export default config;
