import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { eventSchema } from '@backend/schemas/event';
import { ClickHouseService } from '@backend/services/ClickHouseService';
import OrganizationsService from '@backend/services/OrganizationsService';
import { TrackingService } from '@backend/services/TrackingService';
import { isBot } from '@backend/utils/userAgent';

export default createApiHandler({
  method: 'POST',
  schema: eventSchema,
  handler: async (data, { req, res }) => {
    const organization = await OrganizationsService.getOrganizationByName(data.domain);
    if (!organization) {
      throw new ApiError(401, 'Invalid domain');
    }

    if (isBot(req.headers['user-agent'])) {
      return { success: false, reason: 'isBot' };
    }

    const trackingData = TrackingService.track(data, req, res, organization.id);

    await ClickHouseService.insertEvent(trackingData);
    return { success: true };
  },
});
