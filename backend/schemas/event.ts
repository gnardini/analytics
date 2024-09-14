import { z } from 'zod';

export const eventSchema = {
  input: z.object({
    domain: z.string(),
    referrer: z.string().nullable(),
    timezone: z.string().nullable(),
    event: z.string(),
    data: z.string().nullable(),
    extra_data: z.record(z.string(), z.any()).nullable(),
  }),
  output: z.object({
    success: z.boolean(),
  }),
};
