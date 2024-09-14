import { createApiHandler } from '@backend/core/apiHandler';
import { createOrganizationSchema } from '@backend/schemas/organization';
import OrganizationsService from '@backend/services/OrganizationsService';
import { UsersService } from '@backend/services/UsersService';

export default createApiHandler({
  method: 'POST',
  schema: createOrganizationSchema,
  requiresAuth: true,
  handler: async (data, { user }) => {
    const organization = await OrganizationsService.createOrganization(data.name, user.id);
    await UsersService.updateActiveOrg(user, organization.id);
    return { organization };
  },
});
