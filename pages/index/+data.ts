// https://vike.dev/data
import { authenticateUser } from '@backend/core/auth';
import { User } from '@type/user';
import type { PageContextServer } from 'vike/types';

export type LandingData = {
  user: User | null;
};

export default async function data(context: PageContextServer): Promise<LandingData> {
  const user = await authenticateUser(context.headers?.cookie ?? '', (key, value) => {
    // console.log('Would like to set header ', key);
  });
  return { user };
}
