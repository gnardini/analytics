import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { dashboardSchema } from '@backend/schemas/dashboard';
import { ClickHouseService } from '@backend/services/ClickHouseService';

export default createApiHandler({
  method: 'GET',
  schema: dashboardSchema,
  requiresAuth: true,
  handler: async (data, { user }) => {
    if (!user) {
      throw new ApiError(403, 'User not authenticated');
    }

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    const counts = await ClickHouseService.getCounts(data.organizationId, startDate, endDate);
    return { counts };
  },
});
