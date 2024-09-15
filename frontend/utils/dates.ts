import { DateTime } from 'luxon';

function toUnixTimestamp(dateTime: DateTime): number {
  return Math.floor(dateTime.startOf('day').toSeconds()); // Get Unix timestamp in seconds
}

export function getStartDate(dateRange: string): number {
  const today = now();

  switch (dateRange) {
    case 'last_30_days':
      return toUnixTimestamp(today.minus({ days: 30 }));
    case 'last_7_days':
      return toUnixTimestamp(today.minus({ days: 7 }));
    case 'last_6_months':
      return toUnixTimestamp(today.minus({ months: 6 }));
    case 'last_year':
      return toUnixTimestamp(today.minus({ years: 1 }));
    case 'all_time':
      return toUnixTimestamp(today.minus({ years: 30 })); // Arbitrary date in the past
    default:
      return toUnixTimestamp(today.minus({ days: 30 }));
  }
}

export function getEndDate(): number {
  return toUnixTimestamp(now().plus({ days: 1 }));
}

export function now() {
  const now = DateTime.now();
  const zoned = now.setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  return zoned.isValid ? zoned : now;
}
