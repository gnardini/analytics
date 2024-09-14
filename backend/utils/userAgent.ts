export function isBot(userAgent?: string) {
  if (!userAgent) {
    return false;
  }
  const bots = [
    'bot',
    'spider',
    'AhrefsSiteAudit',
    'Slurp',
    'ia_archiver',
    'APIs-Google',
    'Google-Site-Verification',
    'ubermetrics-technologies.com',
    'Mediapartners-Google',
    'crawler',
    'admantx',
    'thetradedesk.com',
    'integralads.com',
    'paloaltonetworks.com',
    'weborama-fetcher',
    'verity',
    'dataminr.com',
    'Go-http-client',
    'facebookexternalhit',
    'python-requests',
  ];
  return !!bots.find((bot) => userAgent.toLowerCase().includes(bot.toLowerCase()));
}
