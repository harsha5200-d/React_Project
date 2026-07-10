import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number().optional(),
  rating: z.number().optional(),
  stock: z.number().optional(),
  brand: z.string().optional().nullable(),
  category: z.string().optional(),
  thumbnail: z.string(),
  images: z.array(z.string()).optional()
});

export const ProductResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number().optional(),
  skip: z.number().optional(),
  limit: z.number().optional()
});

export type Product = z.infer<typeof ProductSchema>;
