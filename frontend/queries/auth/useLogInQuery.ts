import { loginSchema } from "@backend/schemas/auth";
import { useQuery } from "@frontend/queries/useQuery";


export const useLogInQuery = () => {
  return useQuery('POST', '/api/auth/login', loginSchema);
};