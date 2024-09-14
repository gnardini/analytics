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

export const stripeWebhookSchema = {
  input: z.any(),
  output: z.object({
    received: z.boolean(),
  }),
};
