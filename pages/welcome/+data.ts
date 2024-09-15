import { ApiError } from '@backend/core/apiHandler';
import AuthService from '@backend/services/AuthService';
import OrganizationsService from '@backend/services/OrganizationsService';
import { Invitation } from '@type/invitation';
import type { PageContextServer } from 'vike/types';

export type WelcomeData = {
  invitationDetails: Invitation;
  token: string;
};

export default async function data(context: PageContextServer): Promise<WelcomeData> {
  const token = context.urlParsed.search.token;

  if (!token) {
    throw new ApiError(400, 'Invalid or missing invitation token');
  }

  const { email, organizationId, membershipType } = await AuthService.verifyInvitationToken(token);

  const organization = await OrganizationsService.getOrganizationById(organizationId);

  if (!organization) {
    throw new ApiError(404, 'Organization not found');
  }

  const invitationDetails: Invitation = {
    organizationName: organization.name,
    membershipType,
    email,
  };

  return {
    invitationDetails,
    token,
  };
}