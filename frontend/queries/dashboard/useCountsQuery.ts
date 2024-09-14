import { dashboardSchema } from '@backend/schemas/dashboard';
import { useQuery } from '@frontend/queries/useQuery';

export const useCountsQuery = () => {
  return useQuery('GET', '/api/dashboard/counts', dashboardSchema);
};
