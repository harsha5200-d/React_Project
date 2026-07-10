import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  image: z.string().optional()
});

export const UserResponseSchema = z.object({
  users: z.array(UserSchema),
  total: z.number().optional(),
  skip: z.number().optional(),
  limit: z.number().optional()
});

export type DummyUser = z.infer<typeof UserSchema>;
