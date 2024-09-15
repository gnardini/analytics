// https://vike.dev/data
import { authenticateUser } from '@backend/core/auth';
import { UsersService } from '@backend/services/UsersService';
import { Organization } from '@type/organization';
import { User } from '@type/user';
import { redirect } from 'vike/abort';
import type { PageContextServer } from 'vike/types';

export type DashboardData = {
  user: User;
  organizations: Organization[];
  activeOrg: Organization;
  membershipType: 'owner' | 'admin' | 'member';
};

export default async function data(context: PageContextServer): Promise<DashboardData> {
  const user = await authenticateUser(context.headers?.cookie ?? '', (key, value) => {
    // console.log('Would like to set header ', key);
  });
  if (!user) {
    throw redirect('/');
  }
  const orgId = context.urlParsed.search.org_id;
  const { organizations, activeOrg, membershipType } = await UsersService.getOrganizationsAndActive(
    user,
    orgId,
  );
  if (organizations.length === 0) {
    throw redirect('/settings');
  }

  return { user, organizations, activeOrg, membershipType };
}
