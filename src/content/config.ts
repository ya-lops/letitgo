import { z, defineCollection, reference } from "astro:content";

const products = defineCollection({
  type: "content",
  schema: ({image}) => z.object({
    code: z.string(),
    category: reference("categories"),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    images: z.array(image()),
  }),
});

const categories = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    relatedProducts: z.array(reference("products")),
  }),
});

export const collections = {
  'products': products,
  'categories': categories,
};