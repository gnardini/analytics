import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { loginSchema } from '@backend/schemas/auth';
import AuthService from '@backend/services/AuthService';

export default createApiHandler({
  method: 'POST',
  schema: loginSchema,
  handler: async (data, { res }) => {
    const result = await AuthService.logIn(data.email, data.password);
    if (!result) {
      throw new ApiError(400, 'Invalid email or password');
    }

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    return { user: result.user };
  },
});
