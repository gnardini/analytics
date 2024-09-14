import { db, getDatabase } from '@backend/db/db';
import { toISOString } from '@backend/services/dbHelpers';
import { Organization } from '@type/organization';
import { uuidv7 } from 'uuidv7';

const transformOrganization = (org: any): Organization => ({
  id: org.id,
  name: org.name,
  created_at: toISOString(org.created_at),
  updated_at: toISOString(org.updated_at),
  setup_complete_at: org.setup_complete_at ? toISOString(org.setup_complete_at) : null,
});

const OrganizationsService = {
  createOrganization: async (name: string, userId: string): Promise<Organization> => {
    const [organization] = await db('organizations')
      .insert({
        id: uuidv7(),
        name,
      })
      .returning('*');

    await db('user_organizations').insert({
      id: uuidv7(),
      user_id: userId,
      organization_id: organization.id,
      membership_type: 'owner',
    });

    return transformOrganization(organization);
  },

  getOrganizationsForUser: async (userId: string): Promise<Organization[]> => {
    const organizations = await db('organizations')
      .select(`organizations.*`)
      .join('user_organizations', `organizations.id`, `user_organizations.organization_id`)
      .where(`user_organizations.user_id`, userId);

    return organizations.map(transformOrganization);
  },

  userOwnsOrganization: async (
    userId: string,
    organizationId: string,
    adminOnly: boolean = false,
  ): Promise<boolean> => {
    const result = await db('user_organizations')
      .whereIn('membership_type', adminOnly ? ['owner', 'admin'] : ['owner', 'admin', 'member'])
      .andWhere({
        user_id: userId,
        organization_id: organizationId,
      })
      .first();

    return !!result;
  },

  getOrganizationById: async (organizationId: string): Promise<Organization | null> => {
    const organization = await db('organizations').where('id', organizationId).first();

    if (!organization) {
      return null;
    }

    return transformOrganization(organization);
  },

  getOrganizationByName: async (domain: string): Promise<Organization | null> => {
    const organization = await db('organizations').where('name', domain).first();

    if (!organization) {
      return null;
    }

    return transformOrganization(organization);
  },

  setOrgSetupComplete: async (organizationId: string): Promise<Organization> => {
    const [updatedOrg] = await db('organizations')
      .where('id', organizationId)
      .update({
        setup_complete_at: getDatabase().fn.now(),
      })
      .returning('*');

    return transformOrganization(updatedOrg);
  },
};

export default OrganizationsService;
