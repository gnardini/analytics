import { signupSchema } from '@backend/schemas/auth';
import { useQuery } from '@frontend/queries/useQuery';

export const useSignUpQuery = () => {
  return useQuery('POST', '/api/auth/signup', signupSchema);
};
