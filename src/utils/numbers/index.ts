/**
 * Turns the seconds into formatted minutes to display.
 * This function only returns minutes. not hours. for hours please consirer using the formatDuration function.
 * @param s seconds
 * @example
 * const formatedMins = turnSecondsToFormatedMinutes(1000) //16:40
 *
 */
export function turnSecondsToFormatedMinutes(s: number) {
  const rountedMinutes = (s - (s %= 60)) / 60;
  const isLessThan9 = 9 < Math.round(s);
  const roundedSeconds = Math.round(s);
  const spacer = isLessThan9 ? ":" : ":0";
  return rountedMinutes + spacer + roundedSeconds;
}

/**
 * Formats seconds into duration. eg. formatDuration(60000) => '00:06:00'
 * @param seconds total seconds
 */
export function formatDuration(seconds: number) {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

/**
 *
 * @param value Total cents.
 * @example formatCentsToDollars(50759) // 507.59
 */
export const formatCentsToDollars = function (value: string | number) {
  value = (value + "").replace(/[^\d.-]/g, "");
  value = parseFloat(value);
  return value ? value / 100 : 0;
};

export function addUpTo(n: number) {
  return n * (n + 1) / 2;
}
