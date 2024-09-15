import { useDashboardStore } from '@frontend/components/dashboard/data/dashboardStore';
import { useCountsQuery } from '@frontend/queries/dashboard/useCountsQuery';
import { getEndDate, getStartDate } from '@frontend/utils/dates';
import { CountsData } from '@type/dashboard';
import { useEffect, useState } from 'react';

export const useCountsViewData = (organizationId: string) => {
  const [countsData, setCountsData] = useState<CountsData>({ sessions: 0, users: 0, visits: 0 });
  const { execute, loading, error } = useCountsQuery();
  const { dateRange } = useDashboardStore();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchCountsData = async () => {
      try {
        const result = await execute({
          organizationId,
          startDate: getStartDate(dateRange.value),
          endDate: getEndDate(),
        });
        setCountsData(result.counts);
      } catch (err) {
        console.error('Error fetching counts data:', err);
      } finally {
        setInitialLoad(false);
      }
    };

    fetchCountsData();
  }, [dateRange]);

  return { countsData, loading: loading || initialLoad, error };
};
