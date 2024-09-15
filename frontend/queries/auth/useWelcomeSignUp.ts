import { signUpWithInvitationSchema } from '@backend/schemas/auth';
import { useQuery } from '@frontend/queries/useQuery';

export const useWelcomeSignUp = () => {
  return useQuery('POST', '/api/auth/invitation', signUpWithInvitationSchema);
};