import { parseCookies } from '@backend/core/auth';
import { mapLocationToCountry } from '@backend/utils/countries';
import { Request, Response } from 'express';
import { UAParser } from 'ua-parser-js';
import { URL } from 'url';
import { uuidv7 } from 'uuidv7';

const USER_ID_COOKIE = 'gna7_uid';
const SESSION_ID_COOKIE = 'gna7_sid';
const USER_COOKIE_MAX_AGE = 365 * 24 * 60 * 60 * 1000; // 1 year
const SESSION_COOKIE_MAX_AGE = 30 * 60 * 1000; // 30 minutes

export const TrackingService = {
  track(
    data: {
      event: string;
      data: string | null;
      extra_data: Record<string, any> | null;
      referrer: string | null;
      timezone: string | null;
    },
    req: Request,
    res: Response,
    organizationId: string,
  ) {
    const cookies = parseCookies(req.headers.cookie);
    const origin = req.headers.origin;
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    const userId = this.setOrRefreshUserId(res, cookies);
    const sessionId = this.setOrRefreshSessionId(res, cookies);
    const language = this.extractLanguage(req.headers['accept-language']);

    const parser = new UAParser(req.headers['user-agent'] ?? '');
    const browser = parser.getBrowser().name ?? '';
    const device = parser.getDevice().type ?? 'desktop';

    const referrerDomain = this.extractDomain(data.referrer);

    let parsedData = data.data;
    let extraData = data.extra_data || {};
    extraData.user_agent = req.headers['user-agent'];

    if (data.event === 'pageview' && data.data) {
      const { pathname, extraParams } = this.parsePageviewData(data.data);
      parsedData = pathname;
      extraData = { ...extraData, ...extraParams };
    }

    return {
      organization_id: organizationId,
      user_id: userId,
      session_id: sessionId,
      created_at: Math.floor(Date.now() / 1000),
      device,
      browser,
      language,
      location: data.timezone,
      country: mapLocationToCountry(data.timezone),
      referrer: referrerDomain,
      event: data.event,
      data: parsedData,
      extra_data: Object.keys(extraData).length > 0 ? extraData : null,
    };
  },

  parsePageviewData(url: string): { pathname: string; extraParams: Record<string, string> } {
    try {
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname;
      const extraParams: Record<string, string> = {};

      for (const [key, value] of parsedUrl.searchParams.entries()) {
        if (key.startsWith('utm_') || key === 'ref' || key === 'source') {
          extraParams[key] = value;
        }
      }

      return { pathname, extraParams };
    } catch (error) {
      console.error('Error parsing pageview URL:', error);
      return { pathname: url, extraParams: {} };
    }
  },

  extractDomain(url: string | null): string | null {
    if (!url) return null;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch (error) {
      console.error('Error extracting domain:', error);
      return null;
    }
  },

  extractLanguage(acceptLanguage: string | string[] | undefined): string | null {
    if (typeof acceptLanguage === 'string') {
      const primaryLanguage = acceptLanguage.split(',')[0];
      return primaryLanguage.split('-')[0] || null;
    }
    return null;
  },

  setOrRefreshUserId(res: Response, cookies: Record<string, string>): string {
    let userId = cookies[USER_ID_COOKIE];
    if (!userId) {
      userId = uuidv7();
    }
    res.cookie(USER_ID_COOKIE, userId, {
      maxAge: USER_COOKIE_MAX_AGE,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return userId;
  },

  setOrRefreshSessionId(res: Response, cookies: Record<string, string>): string {
    let sessionId = cookies[SESSION_ID_COOKIE];
    if (!sessionId) {
      sessionId = uuidv7();
    }
    res.cookie(SESSION_ID_COOKIE, sessionId, {
      maxAge: SESSION_COOKIE_MAX_AGE,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return sessionId;
  },
};
