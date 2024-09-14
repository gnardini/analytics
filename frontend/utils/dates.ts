import { DateTime } from 'luxon';

function toISODateSafe(dateTime: DateTime): string {
  return dateTime.toISODate() ?? '';
}

export function getStartDate(dateRange: string): string {
  const today = now();

  switch (dateRange) {
    case 'last_30_days':
      return toISODateSafe(today.minus({ days: 30 }));
    case 'last_7_days':
      return toISODateSafe(today.minus({ days: 7 }));
    case 'last_6_months':
      return toISODateSafe(today.minus({ months: 6 }));
    case 'last_year':
      return toISODateSafe(today.minus({ years: 1 }));
    case 'all_time':
      return '2000-01-01';
    default:
      return toISODateSafe(today.minus({ days: 30 }));
  }
}

export function getEndDate(): string {
  return toISODateSafe(now().plus({ days: 1 }));
}

export function now() {
  const now = DateTime.now();
  const zoned = now.setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  return zoned.isValid ? zoned : now;
}
