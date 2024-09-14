import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { metricsDataSchema } from '@backend/schemas/dashboard';
import { ClickHouseService } from '@backend/services/ClickHouseService';

export default createApiHandler({
  method: 'GET',
  schema: metricsDataSchema,
  requiresAuth: true,
  handler: async (data, { user }) => {
    if (!user) {
      throw new ApiError(403, 'User not authenticated');
    }

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    const metricsData = await ClickHouseService.getMetricsData(
      data.organizationId,
      startDate,
      endDate,
      data.uniqueBy,
    );
    return metricsData;
  },
});
