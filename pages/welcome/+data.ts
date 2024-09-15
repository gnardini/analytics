import { ApiError } from '@backend/core/apiHandler';
import AuthService from '@backend/services/AuthService';
import type { PageContextServer } from 'vike/types';

export type WelcomeData = {
  email: string;
  organizationId: string;
  membershipType: 'admin' | 'member';
};

export default async function data(context: PageContextServer): Promise<WelcomeData> {
  const token = context.urlParsed.search.token;

  if (!token) {
    throw new ApiError(400, 'Invalid or missing invitation token');
  }

  const invitationDetails = await AuthService.verifyInvitationToken(token);

  return invitationDetails;
}
