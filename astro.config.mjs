import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  build: {
    assets: "assets",
    inlineStylesheets: "never",
  },
  redirects: {
    "/product": "/",
  },
  integrations: [alpinejs()],
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
