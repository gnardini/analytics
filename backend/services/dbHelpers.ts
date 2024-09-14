export const toISOString = (date: Date | string): string =>
  date instanceof Date ? date.toISOString() : new Date(date).toISOString();

export const parseDate = (date: Date | string): string => toISOString(date).split('T')[0];

export const parseNumber = (value: any): number => Number(value);
