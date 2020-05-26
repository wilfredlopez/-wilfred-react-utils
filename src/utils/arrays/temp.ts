//Logarithmic O(log n) // better than O(n)
export function indexOf<T extends any>(
  array: Array<T>,
  element: T,
  offset = 0,
): number {
  // Best Case O(1)
  if (array.length === 1) {
    return array[0] === element ? 0 : -1
  }
  // split array in half
  const half = Math.floor(array.length / 2)

  const current = array[half]

  if (current === element) {
    return offset + half
  } else if (element > current) {
    const right = array.slice(half)
    return indexOf(right, element, offset + half)
  } else {
    const left = array.slice(0, half)
    return indexOf(left, element, offset)
  }
}

// Usage example with a list of names in ascending order:
const directory = [
  "Adrian",
  "Bella",
  "Charlotte",
  "Daniel",
  "Emma",
  "Hanna",
  "Isabella",
  "Jayden",
  "Kaylee",
  "Luke",
  "Mia",
  "Nora",
  "Olivia",
  "Paisley",
  "Riley",
  "Thomas",
  "Wyatt",
  "Xander",
  "Zoe",
]

// console.log(indexOf(directory, "Hanna")) // => 5
// console.log(indexOf(directory, "AZoedrian")) // => 0
// console.log(indexOf(directory, "Thomas"))
// console.log(indexOf(directory, "Thomas"))
// console.log(indexOf(directory, "Hanna"))
// console.log(directory.indexOf("Thomas"))

// const { reverseArray, splitArray, chunkArr } = ArrayHelper
// const testArr = [1, 2, 3, "data", null]
// console.log(splitArray(testArr))
// console.log(reverseArray(testArr))
// console.log(chunkArr(testArr, 2))
