import { createOrganizationSchema } from "@backend/schemas/organization";
import { useQuery } from "@frontend/queries/useQuery";

export const useCreateOrgQuery = () => {
  return useQuery('POST', '/api/organizations/create', createOrganizationSchema);
};