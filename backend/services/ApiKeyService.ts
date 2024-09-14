import { db } from '@backend/db/db';
import { toISOString } from '@backend/services/dbHelpers';
import { ApiKey, Organization } from '@type/organization';
import crypto from 'crypto';
import OrganizationsService from './OrganizationsService';
import { uuidv7 } from 'uuidv7';

const transformApiKey = (apiKey: any): ApiKey => ({
  id: apiKey.id,
  organization_id: apiKey.organization_id,
  name: apiKey.name,
  key: apiKey.key,
  created_at: toISOString(apiKey.created_at),
  updated_at: toISOString(apiKey.updated_at),
});

const generateApiKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

const ApiKeyService = {
  createApiKey: async (organizationId: string, name: string | null): Promise<ApiKey> => {
    const [apiKey] = await db('api_keys')
      .insert({
        id: uuidv7(),
        organization_id: organizationId,
        name,
        key: generateApiKey(),
      })
      .returning('*');

    return transformApiKey(apiKey);
  },

  getOrganizationByApiKey: async (apiKey: string): Promise<Organization | null> => {
    const key = await db('api_keys').where('key', apiKey).first();

    if (!key) {
      return null;
    }

    return OrganizationsService.getOrganizationById(key.organization_id);
  },
};

export default ApiKeyService;
