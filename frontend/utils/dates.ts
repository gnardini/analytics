import { DateTime } from 'luxon';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function getStartDate(dateRange: string): string {
  const today = DateTime.now().setZone(timezone);

  switch (dateRange) {
    case 'last_30_days':
      return today.minus({ days: 30 }).toISODate();
    case 'last_7_days':
      return today.minus({ days: 7 }).toISODate();
    case 'last_6_months':
      return today.minus({ months: 6 }).toISODate();
    case 'last_year':
      return today.minus({ years: 1 }).toISODate();
    case 'all_time':
      return '2000-01-01'; // Arbitrary old date
    default:
      return today.minus({ days: 30 }).toISODate();
  }
}

export function getEndDate(): string {
  return DateTime.now().setZone(timezone).plus({ days: 1 }).toISODate();
}
