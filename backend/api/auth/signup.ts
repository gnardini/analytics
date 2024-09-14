import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { signupSchema } from '@backend/schemas/auth';
import AuthService from '@backend/services/AuthService';

export default createApiHandler({
  method: 'POST',
  schema: signupSchema,
  handler: async (data, { res }) => {
    try {
      const result = await AuthService.signUp(data.email, data.password);

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
      });
      return { user: result.user };
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new ApiError(400, 'Email already exists');
      }
      throw error;
    }
  },
});
