const EDITORIAL_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Format an ISO calendar date as "October 22, 2026".
 *
 * Deliberately avoids Intl and toLocaleDateString so the server render and the
 * browser render cannot drift by locale or by host timezone. The date is parsed
 * as a UTC calendar date and validated; anything unexpected is returned as is.
 */
export function formatEditorialDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return value;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const probe = new Date(Date.UTC(year, month - 1, day));
  if (
    probe.getUTCFullYear() !== year ||
    probe.getUTCMonth() !== month - 1 ||
    probe.getUTCDate() !== day
  ) {
    return value;
  }
  return `${EDITORIAL_MONTHS[month - 1]} ${day}, ${year}`;
}
