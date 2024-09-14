import { z } from 'zod';

export const loginSchema = {
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  output: z.object({
    user: z.object({
      id: z.string(),
      email: z.string().email(),
      last_access: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
    }),
  }),
};

export const signupSchema = {
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  output: z.object({
    user: z.object({
      id: z.string(),
      email: z.string().email(),
      last_access: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
    }),
  }),
};
