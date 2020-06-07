//Logarithmic O(log n) // better than O(n)
export function indexOf<T extends any>(
  array: Array<T>,
  element: T,
  offset = 0,
): number {
  // Best Case O(1)
  if (array.length === 1) {
    return array[0] === element ? 0 : -1;
  }
  // split array in half
  const half = Math.floor(array.length / 2);

  const current = array[half];

  if (current === element) {
    return offset + half;
  } else if (element > current) {
    const right = array.slice(half);
    return indexOf(right, element, offset + half);
  } else {
    const left = array.slice(0, half);
    return indexOf(left, element, offset);
  }
}

// Usage example with a list of names in ascending order:
// const directory = [
//   "Adrian",
//   "Bella",
//   "Charlotte",
//   "Daniel",
//   "Emma",
//   "Hanna",
//   "Isabella",
//   "Jayden",
//   "Kaylee",
//   "Luke",
//   "Mia",
//   "Nora",
//   "Olivia",
//   "Paisley",
//   "Riley",
//   "Thomas",
//   "Wyatt",
//   "Xander",
//   "Zoe",
//   ["asd"],
// ];

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

// console.log(NumberHelper.getRandomInt(16, 20))

// const res = NumberHelper.tryParseInt('asd')

// if (res.success)
// {
//   console.log(res.value)
// } else
// {
//   console.log(res.error)
// }

// console.log(NumberHelper.isOdd(5))

// console.log(NumberHelper.isPowerOfTwo(16))

// console.log(NumberHelper.fibonacci(20))

// function validParenthesis(str: string) {
//   //str {([])}
//   const validChars: { [key: string]: string } = {
//     "{": "}",
//     "[": "]",
//     "(": ")",
//   };
//   let queue = [];
//   for (let s of str) {
//     //Is an open value
//     if (validChars[s]) {
//       queue.push(s);
//     } else {
//       let value = queue.pop()!;
//       //Not an open value. compare with open values in queue
//       if (validChars[value] !== s) {
//         return false;
//       }
//     }
//   }
//   //if queue still has open values that means that there are remaining values not closed properly.
//   if (queue.length) {
//     return false;
//   }

//   return true;
// }

// console.log(validParenthesis("([{}])"));

//Search thru sorted array.
// function binarySearch(arr: number[], target: number) {
//   if (!arr.length) return -1;

//   let hi = arr.length - 1;
//   let low = 0;

//   while (low <= hi) {
//     let mid = Math.floor((hi + low) / 2);
//     const midVal = arr[mid];
//     if (target === midVal) return mid;
//     if (target > midVal) {
//       low = mid + 1;
//     } else {
//       hi = mid - 1;
//     }
//   }

//   return -1;
// }

// console.log(binarySearch([1, 22, 33, 40, 55], 40));

// function findtwoSum(numbers: number[], target: number) {
//   //Solution 1. Greedy O(n^2)
//   // for (let i = 0; i < numbers.length; i++) {
//   //   let current = numbers[i];
//   //   for (let inner = i + 1; inner < numbers.length; inner++) {
//   //     let next = numbers[inner];
//   //     if (current + next === target) return [current, next];
//   //   }
//   // }
//   // return [];

//   //Solution 2: Hash Table O(n)
//   let ht: { [key: number]: number } = {};
//   for (let i = 0; i < numbers.length; i++) {
//     const current = numbers[i];
//     const want = target - current;
//     if (want in ht) {
//       const leftIndex = ht[want];
//       return [leftIndex, i];
//     } else {
//       ht[current] = i;
//     }
//   }
//   return [];
// }

// console.log(findtwoSum([3, 4, 8, 2], 12));
