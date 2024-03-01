import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";

import compress from "astro-compress";

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
    compress(),
  ],
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
