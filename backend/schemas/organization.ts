import { z } from 'zod';

export const createOrganizationSchema = {
  input: z.object({
    name: z.string().min(1).max(255),
  }),
  output: z.object({
    organization: z.object({
      id: z.string(),
      name: z.string(),
      setup_complete_at: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
    }),
  }),
};

export const verifyOrganizationSchema = {
  input: z.object({
    organizationId: z.string().uuid(),
  }),
  output: z.object({
    success: z.boolean(),
  }),
};
