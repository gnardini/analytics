import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { listOrganizationMembersSchema } from '@backend/schemas/orgUsers';
import OrganizationMembersService from '@backend/services/OrganizationMembersService';
import OrganizationsService from '@backend/services/OrganizationsService';

export default createApiHandler({
  method: 'GET',
  schema: listOrganizationMembersSchema,
  requiresAuth: true,
  handler: async (data, { user }) => {
    if (!(await OrganizationsService.userOwnsOrganization(user.id, data.organizationId))) {
      throw new ApiError(403, 'User does not have permission to see members');
    }
    const members = await OrganizationMembersService.getOrganizationMembers(data.organizationId);
    return { members };
  },
});
