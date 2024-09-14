import { metricsDataSchema } from '@backend/schemas/dashboard';
import { useQuery } from '@frontend/queries/useQuery';

export const useMetricQuery = () => {
  return useQuery('GET', '/api/dashboard/metric', metricsDataSchema);
};