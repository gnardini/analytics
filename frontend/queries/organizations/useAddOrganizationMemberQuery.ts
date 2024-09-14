import { useQuery } from '@frontend/queries/useQuery';
import { addOrganizationMemberSchema } from '@backend/schemas/orgUsers';

export const useAddOrganizationMemberQuery = () => {
  return useQuery('POST', '/api/organizations/members/add', addOrganizationMemberSchema);
};
