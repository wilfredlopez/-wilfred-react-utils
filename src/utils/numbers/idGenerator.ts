function makeid(length: number, max: number = 20) {
  let result = ""
  let min = max
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  let charactersLength = characters.length
  for (let i = 0; i < length || i <= min; i++) {
    if (i >= max) break
    let randomPoz = Math.floor(Math.random() * charactersLength)
    result += characters.charAt(randomPoz)
    // +
    // characters.substring(randomPoz, randomPoz - 1)
  }

  return result.replace(/(.|$)/g, function () {
    return ((Math.random() * 36) | 0)
      .toString(36)
      [Math.random() < 0.5 ? "toString" : "toUpperCase"]()
  })
}

/**
 * Generates random ids
 * @deprecated Please use PatternGenerator instead.
 * @example
 *  const ids = idGenetaror()
    console.log(ids.next().value) //randomstring
    console.log(ids.next())
    console.log(ids.next())
    console.log(ids.next())
    console.log(ids.next())
 */
export function* idGenetaror(
  maxLength: number = 26,
): Generator<string, string, string> {
  let index = 0
  while (true) {
    index++
    yield `${index}${makeid(index, maxLength)}`.slice(0, maxLength)
  }
}

// const ids = idGenetaror(13)

// console.log(ids.next().value)
// console.log(ids.next().value)
// console.log(ids.next().value.length)
// console.log(ids.next().value.length)
// console.log(ids.next().value.length)
// console.log(ids.next())
// console.log(ids.next())
// console.log(ids.next())
// console.log(ids.next())
// console.log(ids.next())
// console.log(ids.next())
// console.log(ids.next().value.length)
// console.log(ids.next().value.length)
