/**
 *
 * @param {string} binaryString
 * @example
 * binaryToText("01001101 01100001 01110100 01110100 01100101 00100000 01000010 01101100 01100001 01100011 01101011 00100000 01000101 01110110 01100101 01110010 01111001 01110100 01101000 01101001 01101110 01100111 00101110");
 * // "Matte Black Everything."
 */
export function binaryToText(binaryString: string) {
  return binaryString
    .split(' ')
    .map(b => parseInt(b, 2))
    .map(num => String.fromCharCode(num))
    .join('')
}

/**
 *
 * @param {string} text
 * @example
 * textToBinary("Matte Black Everything.")
 * // "01001101 01100001 01110100 01110100 01100101 00100000 01000010 01101100 01100001 01100011 01101011 00100000 01000101 01110110 01100101 01110010 01111001 01110100 01101000 01101001 01101110 01100111 00101110"
 */
export function textToBinary(text: string) {
  return text
    .split('')
    .map(b => b.charCodeAt(0).toString(2))
    .join(' ')
}
