/**
 * returns the string as it was if its not greater than the max Length. otherwise it will return three dots at the end keeping the specified length.
 * @param value the string value you need to make sure doesnt go over the maxlenght
 * @param maxLength the max length that the string should have. @default 20.
 */
export function reduceLongString(
  value: string,
  maxLength: number = 20,
): string {
  if (value.length > maxLength) {
    return value.substr(0, maxLength - 3) + "..."
  } else {
    return value
  }
}
