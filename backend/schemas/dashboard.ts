import { z } from 'zod';

export const dashboardSchema = {
  input: z.object({
    organizationId: z.string(),
    startDate: z.coerce.number(),
    endDate: z.coerce.number(),
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
    startDate: z.coerce.number(),
    endDate: z.coerce.number(),
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
    startDate: z.coerce.number(),
    endDate: z.coerce.number(),
    granularity: z.enum(['day', 'week', 'month']),
    timeZone: z.string(),
  }),
  output: z.array(
    z.object({
      date: z.string(),
      users: z.number(),
      sessions: z.number(),
      visits: z.number(),
    }),
  ),
};
