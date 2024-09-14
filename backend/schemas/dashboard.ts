import { z } from 'zod';

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const dashboardSchema = {
  input: z.object({
    organizationId: z.string(),
    startDate: dateSchema,
    endDate: dateSchema,
  }),
  output: z.object({
    counts: z.object({
      users: z.number(),
      sessions: z.number(),
      visits: z.number(),
    }),
  }),
};

export const metricsDataSchema = {
  input: z.object({
    organizationId: z.string(),
    startDate: dateSchema,
    endDate: dateSchema,
    uniqueBy: z.enum(['user', 'visit']).optional(),
  }),
  output: z.object({
    pages: z.array(z.object({ name: z.string(), count: z.number() })),
    referrers: z.array(z.object({ name: z.string(), count: z.number() })),
    devices: z.array(z.object({ name: z.string(), count: z.number() })),
    browsers: z.array(z.object({ name: z.string(), count: z.number() })),
    countries: z.array(z.object({ name: z.string(), count: z.number() })),
    languages: z.array(z.object({ name: z.string(), count: z.number() })),
  }),
};

export const dataPointsSchema = {
  input: z.object({
    organizationId: z.string(),
    startDate: dateSchema,
    endDate: dateSchema,
    granularity: z.enum(['day', 'week', 'month']),
  }),
  output: z.array(
    z.object({
      date: z.string(),
      users: z.number(),
      sessions: z.number(),
      visits: z.number(),
    })
  ),
};