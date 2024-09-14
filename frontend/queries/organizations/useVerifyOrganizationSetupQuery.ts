import { useQuery } from '@frontend/queries/useQuery';
import { verifyOrganizationSchema } from '@backend/schemas/organization';

type VerifyOrganizationInput = {
  organizationId: string;
};

type VerifyOrganizationOutput = {
  success: boolean;
};

export const useVerifyOrganizationSetupQuery = () => {
  return useQuery<VerifyOrganizationInput, VerifyOrganizationOutput>(
    'POST',
    '/api/organizations/verify',
    verifyOrganizationSchema
  );
};