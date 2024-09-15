import { ApiError, createApiHandler } from '@backend/core/apiHandler';
import { signUpWithInvitationSchema } from '@backend/schemas/auth';
import AuthService from '@backend/services/AuthService';

export default createApiHandler({
  method: 'POST',
  schema: signUpWithInvitationSchema,
  handler: async (data, { res }) => {
    const result = await AuthService.signUpWithInvitation(data.token, data.password);

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
