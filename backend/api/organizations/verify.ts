import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { verifyOrganizationSchema } from '@backend/schemas/organization';
import OrganizationsService from '@backend/services/OrganizationsService';
import axios from 'axios';

export default createApiHandler({
  method: 'POST',
  schema: verifyOrganizationSchema,
  requiresAuth: true,
  handler: async ({ organizationId }, { user }) => {
    const organization = await OrganizationsService.getOrganizationById(organizationId);
    if (!organization) {
      throw new ApiError(404, 'Organization not found');
    }

    if (!(await OrganizationsService.userOwnsOrganization(user.id, organizationId))) {
      throw new ApiError(403, 'User does not have permission to verify this organization');
    }

    try {
      const response = await axios.get(`https://${organization.name}`);
      const html = response.data;

      if (
        html.includes(`data-domain="${organization.name}"`) &&
        html.includes('https://phinxer.com/script.js')
      ) {
        await OrganizationsService.setOrgSetupComplete(organizationId);
        return { success: true };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      console.error('Error verifying organization setup:', error);
      return {
        success: false,
      };
    }
  },
});
