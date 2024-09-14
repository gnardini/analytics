import { db } from '@backend/db/db';
import { ClickHouseService } from '@backend/services/ClickHouseService';
import { transformUser } from '@backend/services/UsersService';
import { User } from '@type/user';
import asyncPool from 'tiny-async-pool';

const BATCH_SIZE = 10;

const CreditUpdateService = {
  async getAllUsers(): Promise<User[]> {
    const users = await db('users').select('*');
    return users.map(transformUser);
  },

  async getOrganizationsForUser(userId: string): Promise<string[]> {
    const orgs = await db('user_organizations')
      .where({ user_id: userId, membership_type: 'owner' })
      .pluck('organization_id');
    return orgs;
  },

  async updateUserCredits(userId: string, eventsUsed: number): Promise<void> {
    await db('users').where({ id: userId }).decrement('events_left', eventsUsed);
  },

  async processUser(user: User): Promise<void> {
    const organizationIds = await this.getOrganizationsForUser(user.id);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const endTime = new Date();
    const eventsUsed = await ClickHouseService.getEventsCountLastHour(
      organizationIds,
      formatToClickhouseDateTime(oneHourAgo),
      formatToClickhouseDateTime(endTime),
    );
    await this.updateUserCredits(user.id, eventsUsed);
  },

  async updateAllUserCredits(): Promise<void> {
    try {
      // TODO: Don't get all users at the same time.
      const users = await this.getAllUsers();
      await asyncPool(BATCH_SIZE, users, this.processUser.bind(this));
    } catch (e) {
      console.error(e);
    }
  },
};

const formatToClickhouseDateTime = (date: Date): string => {
  return date.toISOString().split('.')[0].replace('T', ' ');
};

export default CreditUpdateService;
