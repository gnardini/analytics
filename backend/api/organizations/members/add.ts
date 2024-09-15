import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { addOrganizationMemberSchema } from '@backend/schemas/orgUsers';
import OrganizationMembersService from '@backend/services/OrganizationMembersService';
import OrganizationsService from '@backend/services/OrganizationsService';

export default createApiHandler({
  method: 'POST',
  schema: addOrganizationMemberSchema,
  requiresAuth: true,
  handler: async (data, { user }) => {
    if (!(await OrganizationsService.userOwnsOrganization(user.id, data.organizationId, true))) {
      throw new ApiError(403, 'User does not have permission to add members');
    }
    const { orgUser: member } = await OrganizationMembersService.addOrganizationMember(
      data.organizationId,
      data.email,
      data.membershipType,
    );
    return { member };
  },
});
