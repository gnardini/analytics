import { z } from 'zod';

export const stripeSchema = {
  input: z.object({
    amount: z.number().positive(),
  }),
  output: z.object({
    sessionId: z.string(),
    url: z.string().url(),
  }),
};
