export function getStartDate(dateRange: string): string {
  const today = new Date();
  switch (dateRange) {
    case 'last_30_days':
      return new Date(today.setDate(today.getDate() - 30)).toISOString().split('T')[0];
    case 'last_7_days':
      return new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];
    case 'last_6_months':
      return new Date(today.setMonth(today.getMonth() - 6)).toISOString().split('T')[0];
    case 'last_year':
      return new Date(today.setFullYear(today.getFullYear() - 1)).toISOString().split('T')[0];
    case 'all_time':
      return '2000-01-01'; // Arbitrary old date
    default:
      return new Date(today.setDate(today.getDate() - 30)).toISOString().split('T')[0];
  }
}

export function getEndDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}