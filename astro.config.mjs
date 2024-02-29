import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  build: {
    assets: "static",
    inlineStylesheets: "never",
  },
  redirects: {
    "/product": "/",
  },
  integrations: [
    alpinejs(),
    mdx({
      syntaxHighlight: "shiki",
    }),
  ],
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
