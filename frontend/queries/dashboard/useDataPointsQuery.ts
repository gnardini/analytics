import { dataPointsSchema } from '@backend/schemas/dashboard';
import { useQuery } from '@frontend/queries/useQuery';

export const useDataPointsQuery = () => {
  return useQuery('GET', '/api/dashboard/data-points', dataPointsSchema);
};
