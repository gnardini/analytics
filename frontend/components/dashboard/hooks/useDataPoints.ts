import { useDataPointsQuery } from '@frontend/queries/dashboard/useDataPointsQuery';
import { getEndDate, getStartDate } from '@frontend/utils/dates';
import { DataPoint } from '@type/dashboard';
import { useEffect, useState } from 'react';

export const useDataPoints = (
  organizationId: string,
  dateRange: { value: string; granularity: 'day' | 'week' | 'month' },
) => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const { execute, loading, error } = useDataPointsQuery();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchDataPoints = async () => {
      try {
        const result = await execute({
          organizationId,
          startDate: getStartDate(dateRange.value),
          endDate: getEndDate(),
          granularity: dateRange.granularity,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
        setDataPoints(result);
      } catch (err) {
        console.error('Error fetching data points:', err);
      } finally {
        setInitialLoad(false);
      }
    };

    fetchDataPoints();
  }, [dateRange]);

  return { dataPoints, loading: loading || initialLoad, error };
};
