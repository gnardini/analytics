import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { dataPointsSchema } from '@backend/schemas/dashboard';
import { ClickHouseService } from '@backend/services/ClickHouseService';

export default createApiHandler({
  method: 'GET',
  schema: dataPointsSchema,
  requiresAuth: true,
  handler: async (data, { user }) => {
    if (!user) {
      throw new ApiError(403, 'User not authenticated');
    }

    const dataPoints = await ClickHouseService.getDataPoints(
      data.organizationId,
      data.startDate,
      data.endDate,
      data.granularity,
      data.timeZone,
    );
    return dataPoints;
  },
});
