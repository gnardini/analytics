import { useQuery } from '@frontend/queries/useQuery';
import { listOrganizationMembersSchema } from '@backend/schemas/orgUsers';

export const useListOrganizationMembersQuery = () => {
  return useQuery('GET', '/api/organizations/members/list', listOrganizationMembersSchema);
};