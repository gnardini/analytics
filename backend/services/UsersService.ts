import { db } from '@backend/db/db';
import { toISOString } from '@backend/services/dbHelpers';
import OrganizationMembersService from '@backend/services/OrganizationMembersService';
import OrganizationsService from '@backend/services/OrganizationsService';
import { Organization } from '@type/organization';
import { User } from '@type/user';

export const transformUser = (user: any): User => ({
  id: user.id,
  email: user.email,
  active_org: user.active_org,
  events_left: user.events_left,
  created_at: toISOString(user.created_at),
  updated_at: toISOString(user.updated_at),
  last_access: user.last_access ? toISOString(user.last_access) : null,
  last_events_update: user.last_events_update ? toISOString(user.last_events_update) : null,
});

export const UsersService = {
  async updateActiveOrg(user: User, orgId: string): Promise<User> {
    const [updatedUser] = await db('users')
      .where('id', user.id)
      .update({ active_org: orgId })
      .returning('*');
    return transformUser(updatedUser);
  },

  async getOrganizationsAndActive(
    user: User,
    queryOrgId?: string,
  ): Promise<{
    organizations: Organization[];
    activeOrg: Organization;
    membershipType: 'owner' | 'admin' | 'member';
  }> {
    const organizations = await OrganizationsService.getOrganizationsForUser(user.id);

    const activeOrg =
      organizations.find((org) => org.id === queryOrgId) ??
      organizations.find((org) => org.id === user.active_org) ??
      organizations[0];

    if (activeOrg && activeOrg.id !== user.active_org) {
      await this.updateActiveOrg(user, activeOrg.id);
    }

    const membershipType = await OrganizationMembersService.getMembershipType(
      activeOrg.id,
      user.id,
    );

    return { organizations, activeOrg, membershipType };
  },

  async getOrCreateUserByEmail(email: string): Promise<{ user: User; created: boolean }> {
    let user = await db('users').where('email', email).first();
    const created = !user;

    if (!user) {
      [user] = await db('users').insert({ email }).returning('*');
    }

    console.log('user', user);

    return { user: transformUser(user), created };
  },

  async addCreditsToUser(userId: string, credits: number): Promise<User> {
    const [updatedUser] = await db('users')
      .where('id', userId)
      .increment('events_left', credits)
      .returning('*');
    return transformUser(updatedUser);
  },
};
