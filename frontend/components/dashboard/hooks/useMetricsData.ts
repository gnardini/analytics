import { useDashboardStore } from '@frontend/components/dashboard/data/dashboardStore';
import { useMetricQuery } from '@frontend/queries/dashboard/useMetricQuery';
import { getStartDate, getEndDate } from '@frontend/utils/dates';
import { MetricsData } from '@type/dashboard';
import { useEffect, useState } from 'react';

export const useMetricsData = (organizationId: string) => {
  const [metricsData, setMetricsData] = useState<MetricsData>({
    pages: [],
    referrers: [],
    devices: [],
    browsers: [],
    countries: [],
    languages: [],
  });
  const [uniqueBy, setUniqueBy] = useState<'user' | 'visit'>('visit');
  const { execute, loading, error } = useMetricQuery();
  const { dataType, dateRange } = useDashboardStore();

  useEffect(() => {
    if (dataType === 'sessions') {
      return;
    }
    setUniqueBy(dataType === 'users' ? 'user' : 'visit');
  }, [dataType]);

  useEffect(() => {
    const fetchMetricsData = async () => {
      try {
        const result = await execute({
          organizationId,
          startDate: getStartDate(dateRange.value),
          endDate: getEndDate(),
          uniqueBy,
        });
        setMetricsData(result);
      } catch (err) {
        console.error('Error fetching metrics data:', err);
      }
    };

    fetchMetricsData();
  }, [dateRange, uniqueBy]);

  return { metricsData, uniqueBy, loading, error };
};
