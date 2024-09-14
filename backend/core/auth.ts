import { JWT_SECRET } from '@backend/config';
import jwt from 'jsonwebtoken';
import AuthService from '../services/AuthService';

export const parseCookies = (cookieString: string | undefined): { [key: string]: string } => {
  const cookies: { [key: string]: string } = {};
  if (cookieString) {
    cookieString.split(';').forEach((cookie) => {
      const parts = cookie.split('=');
      const key = parts[0].trim();
      const value = parts[1] || '';
      cookies[key] = decodeURIComponent(value.trim());
    });
  }
  return cookies;
};

export const authenticateUser = async (
  cookieHeader: string,
  setHeader: (key: string, value: string) => void,
) => {
  const cookies = parseCookies(cookieHeader);
  const token = cookies['token'] || null;

  const user = token ? await AuthService.verifyAuthToken(token) : null;

  if (user) {
    const newToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });
    setHeader(
      'Set-Cookie',
      `token=${newToken}; HttpOnly; Path=/; Max-Age=${30 * 24 * 60 * 60}; SameSite=Strict; Secure`,
    );
  }

  return user;
};
