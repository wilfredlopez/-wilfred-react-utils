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

// /**
//  * Returns the string with proper case and also *trims the white space.
//  * @param str string to add proper case
//  * @example toProperCase(" hello world") // "Hello World"
//  */
// function toProperCaseOld(str: string) {
//   // str = str.trim()
//   const words = str.match(/\w+(.)?/gim)

//   //base case. one single word
//   let proper = str.replace(/^\w/g, str[0].toUpperCase())

//   //if there is an array of words
//   if (words) {
//     proper = ""
//     for (const w of words) {
//       proper += ` ${w.trim().replace(/^\w/g, w[0].toUpperCase())}`
//     }
//   }
//   return proper.trim()
// }

/**
 * Returns the string with proper case.
 * @param str string to add proper case
 * @example toProperCase(" hello world") // " Hello World"
 */
export function toProperCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
