import { JWT_SECRET } from '@backend/config';
import { db } from '@backend/db/db';
import { toISOString } from '@backend/services/dbHelpers';
import { EmailService } from '@backend/services/EmailService';
import OrganizationsService from '@backend/services/OrganizationsService';
import { UsersService } from '@backend/services/UsersService';
import { OrgUser } from '@type/organization';
import jwt from 'jsonwebtoken';
import { uuidv7 } from 'uuidv7';

const transformOrgUser = (orgUser: any): OrgUser => ({
  id: orgUser.id,
  organization_id: orgUser.organization_id,
  user_id: orgUser.user_id,
  email: orgUser.email,
  membership_type: orgUser.membership_type,
  created_at: toISOString(orgUser.created_at),
  updated_at: toISOString(orgUser.updated_at),
});

const OrganizationMembersService = {
  getOrganizationMembers: async (organizationId: string): Promise<OrgUser[]> => {
    const members = await db('user_organizations')
      .join('users', 'user_organizations.user_id', '=', 'users.id')
      .where('user_organizations.organization_id', organizationId)
      .select('user_organizations.*', 'users.email');

    return members.map(transformOrgUser);
  },

  getMembershipType: async (
    organizationId: string,
    userId: string,
  ): Promise<'owner' | 'admin' | 'member'> => {
    const orgUser = await db('user_organizations')
      .where({ organization_id: organizationId, user_id: userId })
      .select('membership_type')
      .first();

    return orgUser ? orgUser.membership_type : 'none';
  },

  getOrCreateOrganizationMember: async (
    organizationId: string,
    userId: string,
    membershipType: 'admin' | 'member',
  ): Promise<OrgUser> => {
    let orgUser = await db('user_organizations')
      .where({ organization_id: organizationId, user_id: userId })
      .first();

    if (orgUser) {
      [orgUser] = await db('user_organizations')
        .where({ organization_id: organizationId, user_id: userId })
        .update({ membership_type: membershipType })
        .returning('*');
    } else {
      [orgUser] = await db('user_organizations')
        .insert({
          id: uuidv7(),
          organization_id: organizationId,
          user_id: userId,
          membership_type: membershipType,
        })
        .returning('*');
    }

    return transformOrgUser(orgUser);
  },

  addOrganizationMember: async (
    organizationId: string,
    userEmail: string,
    membershipType: 'admin' | 'member',
  ): Promise<{ orgUser: OrgUser; created: boolean }> => {
    const { user, created: userCreated } = await UsersService.getOrCreateUserByEmail(userEmail);

    const orgUser = await OrganizationMembersService.getOrCreateOrganizationMember(
      organizationId,
      user.id,
      membershipType,
    );

    if (userCreated) {
      const org = await OrganizationsService.getOrganizationById(organizationId);
      const token = jwt.sign({ email: userEmail, organizationId, membershipType }, JWT_SECRET, {
        expiresIn: '7d',
      });
      EmailService.sendEmail(
        userEmail,
        `You've been invited to join ${org?.name} analytics at Phinxer`,
        `Hi!

You've been invited to the analytics team at ${org?.name}.

To accept the invitation, open the following link:

https://phinxer.com/welcome?token=${token}

See you soon!`,
      );
    } else {
      // TODO: Send email
    }

    return { orgUser, created: userCreated };
  },
};

export default OrganizationMembersService;
