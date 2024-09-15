import { JWT_SECRET } from '@backend/config';
import { db } from '@backend/db/db';
import OrganizationMembersService from '@backend/services/OrganizationMembersService';
import { transformUser } from '@backend/services/UsersService';
import { User } from '@type/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { uuidv7 } from 'uuidv7';

const AuthService = {
  logIn: async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
    const user = await db('users').where({ email }).first();
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });

    const [updatedUser] = await db('users')
      .where({ id: user.id })
      .update({ last_access: new Date() })
      .returning('*');

    return {
      user: transformUser(updatedUser),
      token,
    };
  },

  signUp: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db('users')
      .insert({
        id: uuidv7(),
        email,
        password: hashedPassword,
        last_access: null,
      })
      .returning('*');

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '30d' });

    return {
      user: transformUser(newUser),
      token,
    };
  },

  verifyAuthToken: async (token: string): Promise<User | null> => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await db('users').where({ id: decoded.userId }).first();

      if (!user) return null;

      return transformUser(user);
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  },

  verifyInvitationToken: (
    token: string,
  ): { email: string; organizationId: string; membershipType: 'admin' | 'member' } => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        email: string;
        organizationId: string;
        membershipType: 'admin' | 'member';
      };
      return {
        email: decoded.email,
        organizationId: decoded.organizationId,
        membershipType: decoded.membershipType,
      };
    } catch (error) {
      throw new Error('Invalid or expired invitation token');
    }
  },

  signUpWithInvitation: async (
    token: string,
    password: string,
  ): Promise<{ user: User; token: string }> => {
    const { email, organizationId, membershipType } = AuthService.verifyInvitationToken(token);

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db('users')
      .insert({
        id: uuidv7(),
        email,
        password: hashedPassword,
        last_access: null,
      })
      .returning('*');

    await OrganizationMembersService.getOrCreateOrganizationMember(
      organizationId,
      newUser.id,
      membershipType,
    );

    const newToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '30d' });

    return {
      user: transformUser(newUser),
      token: newToken,
    };
  },
};

export default AuthService;
