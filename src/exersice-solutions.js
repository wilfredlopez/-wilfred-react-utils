// JS PRACTICE FILE.

/**
 * Utility class to time the functions.
 * @example
 * const stopWatch = new StopWatch();
 * stopWatch.start();
 * let i = 0;
 * while (i < 1000) {
 *   i++;
 * }
 * console.log(stopWatch.printElapsed("test")); // test [1ms] [0.001s]
 */
export default class StopWatch {
  constructor(useWindowPerformance = false) {
    this.startTime = 0;
    this.stopTime = 0;
    this.running = false;
    if (!useWindowPerformance) {
      this.performance = false;
    } else {
      this.performance = typeof window !== "undefined"
        ? !!window.performance
        : false;
    }
  }
  currentTime() {
    return this.performance ? window.performance.now() : new Date().getTime();
  }
  start() {
    this.startTime = this.currentTime();
    this.running = true;
    return this;
  }
  stop() {
    this.stopTime = this.currentTime();
    this.running = false;
    return this;
  }

  getElapsedMilliseconds() {
    if (this.running) {
      this.stopTime = this.currentTime();
    }

    return this.stopTime - this.startTime;
  }

  getElapsedSeconds() {
    return this.getElapsedMilliseconds() / 1000;
  }

  printElapsed(name = "Elapsed:") {
    const log =
      `${name} [${this.getElapsedMilliseconds()}ms] [${this.getElapsedSeconds()}s]`;
    //THIS LOG IS INTENTIONAL.
    console.log(log);
    return log;
  }
}

/*************************************
 * FIZZBUZZ
 * Log to console numbers from 1 to 100. if the number is divisible by 15 log FIZZBUZZ. if divisible by 3 log FIZZ if divisible by 5 log BUZZ
 ***************************************/
// for (let i = 1; i <= 100; i++) {
//   if (i % 15 === 0) {
//     console.log("FIZZBUZZ");
//   } else if (i % 5 === 0) {
//     console.log("BUZZ");
//   } else if (i % 3 === 0) {
//     console.log("FIZZ");
//   } else {
//     console.log(i);
//   }
// }

/************************************************
 * characterCounter. 
 * @param {String} str
 * write a function that returns and object with the key of each unique alpha-numeric character in a string and the value of the count of how many time repeats.
 * details:
 * - capital insensitive (returns only lowercase).
 * - ignores spaces and all other non alpha-numeric characters.
 * - should return and empty object if called with invalid parameters.
 * - [OPTIONAL] if number is passed as parameter it turns it into string.
 * @example
 * //Valid Calls
 * console.log(characterCounter("Hello")); // { h: 1, e: 1, l: 2, o: 1 }
 * console.log(characterCounter("Lopez Lopez")); // { l: 2, o: 2, p: 2, e: 2, z: 2 }
 * 
 * //Invalid calls
 * console.log(characterCounter()); // {}
 * console.log(characterCounter(2000)); // {} or  { 0: 3, 2: 1 }
 * 
 ************************************/
function characterCounter(str) {
  if (!str) return {};
  if (typeof str === "number") {
    str = str.toString();
  }
  const result = {};

  for (let char of str) {
    char = char.toLowerCase();
    if (!(/[a-zA-Z0-9]/.test(char))) {
      continue;
    }
    result[char] = ++result[char] || 1;
  }

  return result;
}

// //Valid Calls
// console.log(characterCounter("Hello")); // { h: 1, e: 1, l: 2, o: 1 }
// console.log(characterCounter("Lopez Lopez")); // { l: 2, o: 2, p: 2, e: 2, z: 2 }

// //Invalid calls
// console.log(characterCounter()); // {}
// console.log(characterCounter(2000)); // {} or  { 0: 3, 2: 1 }

/***************************************************************
   * Write a function called sameFrequency, which accepts 2 arrays. 
   * The function returns true if every value in the array1 has 
   * its corresponding value squared in the second array (array2). 
   * The arrays should have the same frequencies.
   * 
   * @returns {boolean} boolean
   * @param {Array<number>} array1
   * @param {Array<number>} array2
   * @example
   * const arr1 = [1, 2, 3], arr2 = [1, 9, 4];
   * console.log(sameFrequency(arr1, arr2)); // returns true
   * console.log(sameFrequency([1, 2, 3, 2], [9, 1, 4, 4])); // returns true
   * console.log(sameFrequency(arr1, arr1)); // returns false
   * console.log(sameFrequency(arr1, [1, 9])); // returns false
   *
   **************************************************/
function sameFrequency(array1, array2) {
  if (array1.length !== array2.length) return false;

  let freqLeft = {};
  let freqRight = {};

  for (const num of array1) {
    freqLeft[num] = ++freqLeft[num] || 1;
  }

  for (const num of array2) {
    freqRight[num] = ++freqRight[num] || 1;
  }

  for (const key in freqLeft) {
    const squared = key * key;

    //validate exist
    if (!(squared in freqRight)) {
      return false;
    }

    //validate same count.
    if (freqLeft[key] !== freqRight[squared]) {
      return false;
    }
  }
  return true;
}

// const arr1 = [1, 2, 3], arr2 = [1, 9, 4];
// console.log(sameFrequency(arr1, arr2)); // returns true
// console.log(sameFrequency([1, 2, 3, 2], [9, 1, 4, 4])); // returns true
// console.log(sameFrequency(arr1, arr1)); // returns false
// console.log(sameFrequency(arr1, [1, 9])); // returns false

/**
   * Given two strings, write a function called validAnagram to determine if the second string is an anagram of the first string.
   * an anagram is a word, phase or name formed by rearranging the letters of another such as cinema, formed from iceman.
   * @param { string } string1 
   * @param { string } string2 
   * @returns {boolean} boolean
   * @example
   * 
   * console.log(validAnagram("", "")); //true
   * console.log(validAnagram("aaz", "zza")); //false
   * console.log(validAnagram("rat", "car")); //false
   * console.log(validAnagram("anagram", "nagaram")); //true
   * console.log(validAnagram("awesome", "awesom")); //false
   * console.log(validAnagram("qwerty", "qeywrt")); //true
   * console.log(validAnagram("texttwisttime", "timetwisttest")); //true
   * @notes
   * - case insensitive. 
   * - spaces and non alpha-numeric characters are not accounted for.
   * 
   */
function validAnagram(string1, string2) {
  if (string1.length !== string2.length) return false;
  string1 = string1.toLowerCase();
  string2 = string2.toLowerCase();

  let lookUp = {};
  for (const char of string1) {
    lookUp[char] = ++lookUp[char] || 1;
  }

  for (const match of string2) {
    if (!lookUp[match]) {
      return false;
    } else {
      lookUp[match] = lookUp[match] - 1;
    }
  }

  return true;
}

// console.log(validAnagram("", "")); //true
// console.log(validAnagram("qwerty", "qeywrt")); //true
// console.log(validAnagram("Qwerty", "qeywrT")); //true
// console.log(validAnagram("anagram", "nagaram")); //true
// console.log(validAnagram("texttwisttime", "timetwisttext")); //true
// console.log(validAnagram("aaz", "zza")); //false
// console.log(validAnagram("rat", "car")); //false
// console.log(validAnagram("awesome", "awesom")); //false

/**
 * *********************************************
 * count unique values in an array of numbers.
 * @param {Array<number>} arr
 * @NOTES Array needs to be sorted
 * 
 * @example
 * console.log(countUniqueValues([1, 1, 2, 2, 3])); // 3
 * console.log(countUniqueValues([1, 1, 3, 4, 5, 6, 7])); // 6
 * console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
 * *********************************************
 */
function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  let unique = 0;
  for (let index = 1; index < arr.length; index++) {
    const val = arr[index];
    if (val !== arr[unique]) {
      unique++;
      arr[unique] = val;
    }
  }

  return unique + 1;
}

// console.log(countUniqueValues([1, 1, 2, 2, 3])); // 3
// console.log(countUniqueValues([1, 1, 3, 4, 5, 6, 7])); // 6
// console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2

/**
 * sumZero: find the first paid where the sum is zero in a sorted array.
 * @param {Array<number>} numbers
 * @returns {[number, number] | null } returns a tuple of the values or null.
 * 
 * @example
 * console.log(sumZero([-3, -2, -1, 0, 1, 2, 3, 4])); //returns [-3,3]
 * console.log(sumZero([])); //returns null
 * console.log(sumZero([1, 2, 3])); //returns null
 * console.log(sumZero([-5, -2, 0, 1, 2])); //returns [-2,2]
 * console.log(sumZero([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])); //returns [-1,1]
 */
function sumZero(numbers) {
  if (!numbers || numbers.length === 0) return null;

  let leftPoint = 0;
  let rightPoint = numbers.length - 1;

  while (leftPoint < rightPoint) {
    const sum = numbers[rightPoint] + numbers[leftPoint];
    if (sum === 0) return [numbers[leftPoint], numbers[rightPoint]];
    if (sum > 0) {
      rightPoint--;
    } else {
      leftPoint++;
    }
  }
  return null;
}

// console.log(sumZero([-3, -2, -1, 0, 1, 2, 3, 4])); //returns [-3,3]
// console.log(sumZero([])); //returns null
// console.log(sumZero([1, 2, 3])); //returns null
// console.log(sumZero([-5, -2, 0, 1, 2])); //returns [-2,2]
// console.log(sumZero([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])); //returns [-1,1]

/**
 * maxSubArraySum: function witch accepts an array of integers and a number.
 * calculates the maximum sum of n consecutive elememts in an array
 * @param {Array<number>} data 
 * @param {number} numberOfTimes 
 * @returns {number | null} the number or null if empty array
 * @example
 * console.log(maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 2)); //returns 10
 * console.log(maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 4)); //returns 17
 * console.log(maxSubArraySum([4, 2, 1, 6], 1)); //returns 6
 * console.log(maxSubArraySum([4, 2, 1, 6, 2], 4)); //returns 13
 * console.log(maxSubArraySum([1], 4)); //returns null
 */
function maxSubArraySum(data, numberOfTimes) {
  //Edge Cases
  if (!data || data.length === 0) return null;
  if (typeof numberOfTimes === "undefined") {
    numberOfTimes = 1;
  }
  if (data.length < numberOfTimes) return null;

  //Good Solution (O(n))
  //hold the sum of n (numberOfTimes) integers in the array
  let maxSum = 0;
  //keeps track of current sum of n (numberOfTimes) integers in the array
  let tempSum = 0;

  //find sum of first n(numberOfTimes) digits and set the initial maxSum;
  for (
    let time = 0;
    time < numberOfTimes;
    time++
  ) {
    maxSum += data[time];
  }

  tempSum = maxSum;
  //Loop over the array starting from numberOfTimes to update the maxSum
  for (
    let dataIndex = numberOfTimes;
    dataIndex < data.length;
    dataIndex++
  ) {
    //update tempSum (tempSum is the accumulator of the n(numberOfTimes) previews values sum)
    tempSum = tempSum - data[dataIndex - numberOfTimes] + data[dataIndex]; //set maxSum if new tempSum is greater
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
  //NAIVE SOLUTION (O(n2))
  //   let max = -Infinity;
  //   for (
  //     let dataIndex = 0;
  //     dataIndex < data.length - numberOfTimes + 1;
  //     dataIndex++
  //   ) {
  //     let temp = 0;
  //     for (let time = 0; time < numberOfTimes; time++) {
  //       temp += data[dataIndex + time];
  //     }
  //     if (temp > max) {
  //       max = temp;
  //     }
  //   }

  //   return max;
}

// console.log(maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 2)); //returns 10
// console.log(maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 4)); //returns 17
// console.log(maxSubArraySum([4, 2, 1, 6], 1)); //returns 6
// console.log(maxSubArraySum([4, 2, 1, 6, 2], 4)); //returns 13
// console.log(maxSubArraySum([1], 4)); //returns null

/**
 * given a sorted array of integers, write a function called search that accepts a value and returns the index where
 * the value passed was found. or return -1 if not found.
 * Should use Divide and conquer approach for time complexity of O(n log n)
 * @param {Array<number>} data
 * @param {number} value
 * @example
 * console.log(search([1, 2, 3, 4, 5, 6], 2)); //1
 * console.log(search([1, 2, 3, 4, 5, 6], 5)); // 4
 * console.log(search([1, 2, 3, 4, 5, 6], 6)); // 5
 * console.log(search([1, 2, 3, 4, 5, 6], 11)); // -1
 */
function search(data, value) {
  //Edge cases
  if (!data || data.length === 0 || typeof value === "undefined") return -1;

  //Divide and conquer approach O(n log n)
  let min = 0;
  let max = data.length - 1;
  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    const curent = data[middle];
    if (curent === value) return middle;
    if (curent < value) {
      min = middle + 1;
    } else if (curent > value) {
      max = middle - 1;
    }
  }

  //NAIVE APPROACH O(n)
  //   for (let index = 0; index < data.length; index++) {
  //     if (data[index] === value) {
  //       return index;
  //     }
  //   }
  return -1;
}

// console.log(search(["a", "b", "c"], "c")); //2
// console.log(search([1, 2, 3, 4, 5, 6], 2)); //1
// console.log(search([1, 2, 3, 4, 5, 6], 5)); // 4
// console.log(search([1, 2, 3, 4, 5, 6], 6)); // 5
// console.log(search([1, 2, 3, 4, 5, 6], 11)); // -1

/**
 * finds if there are dupplicates in the arguments passed.
 * @returns {boolean} returns true or false using regular javascript comparison. objects will be the same only if they point to the same reference in memory.
 * @param  { ...any } args 
 * @example
 * console.log(areThereDuplicates(1, 2, 3)); // false
 * console.log(areThereDuplicates(1, 2, 3, 2)); // true
 * console.log(areThereDuplicates("name", "name", "noName")); // true
 * console.log(areThereDuplicates(true, false, true)); // true
 * const arr = [true, false, true];
 * console.log(areThereDuplicates(arr, arr)); // true
 * console.log(areThereDuplicates([1], [1])); // false
 * const obj = { name: "wil" };
 * console.log(areThereDuplicates({ name: "wil" }, { name: "wil" })); // false
 * console.log(areThereDuplicates(obj, obj)); // true
 * 
 */
function areThereDuplicates(...args) {
  //One Liner Solution
  //   return new Set(arguments).size !== arguments.length;
  // Two pointers
  args.sort((a, b) => a > b);
  let start = 0;
  let next = 1;
  while (next < args.length) {
    if (args[start] === args[next]) {
      return true;
    }
    start++;
    next++;
  }
  return false;
}

// console.log(areThereDuplicates(1, 2, 3)); // false
// console.log(areThereDuplicates(1, 2, 3, 2)); // true
// console.log(areThereDuplicates("name", "name", "noName")); // true
// console.log(areThereDuplicates(true, false, true)); // true
// const arr = [true, false, true];
// console.log(areThereDuplicates(arr, arr)); // true
// console.log(areThereDuplicates([1], [1])); // false
// const obj = { name: "wil" };
// console.log(areThereDuplicates({ name: "wil", data: 1 }, { name: "wil" })); // false
// console.log(areThereDuplicates(obj, obj)); // true

/**
 * write a factorial function without using recursion and a factorialRecursive function with recursion.
 * @param {number} num
 * @returns {number}
 * factorialRecursive(4) // 24 
 * factorial(4) // 24 
 * factorialRecursive(6) // 720 
 * factorial(6) // 720 
 * 
 */
const CACHED_FACTORIALS = {};
function factorial(num) {
  if (CACHED_FACTORIALS[num]) {
    return CACHED_FACTORIALS[num];
  }
  let total = 1;
  for (let i = 2; i <= num; i++) {
    total = total * i;
  }
  CACHED_FACTORIALS[num] = total;
  return total;
}
function factorialRecursive(num, cache = CACHED_FACTORIALS) {
  if (cache[num]) {
    return cache[num];
  }
  if (num < 1) return 0;
  if (num === 1) return 1;
  const result = num * factorialRecursive(num - 1, cache);
  cache[num] = result;
  return result;
}

// console.log(factorialRecursive(4)); // 24
// console.log(factorialRecursive(6)); // 720
// console.log(factorialRecursive(6)); // 720
// console.log(factorial(6)); // 720
// console.log(factorial(6)); // 720
// console.log(factorial(6)); // 720

/**
 * Implement the Array.indexOf function. (Linear Search)
 * @param {Array<number>} array
 * @param {number} value
 * @return { number } index of the value in the array or -1
 * @example
 * console.log(indexOf([1, 2, 3], 3)); // 2
 * console.log(indexOf(["a", "b", "c"], 3)); // -1
 * console.log(indexOf(["a", "b", "c"], "a")); // 0
 */

function indexOf(array, value) {
  for (let index = 0; index < array.length; index++) {
    if (array[index] === value) return index;
  }
  return -1;
}

// console.log(indexOf([1, 2, 3], 3)); // 2
// console.log(indexOf(["a", "b", "c"], 3)); // -1
// console.log(indexOf(["a", "b", "c"], "a")); // 0

/**
 * implement binary search given a sorted array of numbers or strings.
 * @param {Array<number | string>} array 
 * @param {number | string>} value
 * @return { number } index of the value in the array or -1
 * @timeComplexity O(log n)
 * @example
 * console.log(binarySearch([1, 2, 3, 4], 3)); // 2
 * console.log(binarySearch([1, 2, 3, 4], 2)); // 1
 * console.log(binarySearch([1, 2, 3, 4], 1)); // 0
 * console.log(binarySearch([1, 2, 3, 4, 500, 550, 570, 600], 550)); // 5
 * console.log(
 *   binarySearch([1, 2, 3, 4, 500, 550, 570, 600, 620, 680, 900, 1000], 1000),
 * ); // 11
 * console.log(
 *   binarySearch([1, 2, 3, 4, 500, 550, 570, 600, 620, 680, 900, 1000], 1),
 * ); // 0
 * console.log(binarySearch(["a", "b", "c", "d", "e"], "d")); // 3
 */

function binarySearch(array, value) {
  if (array.length === 0) return -1;
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    if (array[middle] === value) {
      return middle;
    }
    if (array[middle] < value) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return -1;
}

// console.log(binarySearch([1, 2, 3, 4], 3)); // 2
// console.log(binarySearch([1, 2, 3, 4], 2)); // 1
// console.log(binarySearch([1, 2, 3, 4], 1)); // 0
// console.log(binarySearch([1, 2, 3, 4, 500, 550, 570, 600], 550)); // 5
// console.log(
//   binarySearch([1, 2, 3, 4, 500, 550, 570, 600, 620, 680, 900, 1000], 1000),
// ); // 11

// console.log(binarySearch(["a", "b", "c", "d", "e"], "d")); // 3

/*
 * ---------------------------------------------------
 *  SORTING
 * https://visualgo.net/en
 * https://www.toptal.com/developers/sorting-algorithms
 * ----------------------------------------------------
 */

/**
   * Itility function to swap values in array.
   * @param {Array} array 
   * @param {number} leftIndex 
   * @param {number} rightIndex 
   */
function swap(array, leftIndex, rightIndex) {
  [array[leftIndex], array[rightIndex]] = [
    array[rightIndex],
    array[leftIndex],
  ];
}

/**
 * Implement selectionSort.
 * - store the first index as the smallest value ("minimum").
 * - compare first item to the next in the array until you find a smaller number.
 * - if smaller number is found, designate that number(index) to the new "minimum" and continue until the end.
 * - if the value of the minimum index stored is not the same as the value(@index) you began with, swap the values.
 * - repeat until the array is sorted.
 * @param {Array<number>} array
 */
function selectionSort(array) {
  for (let index = 0; index < array.length; index++) {
    let lowest = index;
    for (let j = index + 1; j < array.length; j++) {
      const element = array[j];
      if (element < array[lowest]) {
        lowest = j;
      }
    }
    if (array[lowest] !== array[index]) {
      swap(array, index, lowest);
    }
  }
  return array;
}

/**
 * Implement insertion sort.
 * - Pick the second element in the array
 * - compare the second element with the one before and swap if necessary.
 * - continue to the next element and if is in the correct order, iterate through the sorted portion(
 * eg. the left side) to place the element in the correct place.
 * @param {Array<number>} arr 
 * @returns {Array<number>}
 */
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    for (let j = i - 1; j >= 0 && arr[j] > current; j--) {
      swap(arr, j + 1, j);
    }
  }

  return arr;
}

/**
 * Implement mergeSort. 
 * Works by decomposing the array into smaller arrays of 0 or 1 elements, then building up a newly sorted array.
 * Could use recurssion (split > merge > sort)
 * Instructions:
 * - write a helper function merge that can merge 2 arrays and returns a sorted array. (arrays could be of different lengths).
 * - split the array into elements of 0 and 1 and use the merge helper function to merge them back.
 * -  return the merged array.
 * @param {Array} arr 
 * @returns {Array} array sorted.
 */
function mergeSort(arr, compare = (v1, v2) => v1 > v2) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compare);
  const right = mergeSort(arr.slice(mid), compare);
  return merge(left, right, compare);
}

/**
 * 
 * @param {Array} leftArr 
 * @param {Array} rightArr 
 * @param {(v1,v2) => boolean} compare 
 * @returns {Array} returns a sorted merged array.
 */
function merge(leftArr, rightArr, compare = (v1, v2) => v1 > v2) {
  let leftI = 0;
  let rightI = 0;
  let result = [];
  while (leftI < leftArr.length && rightI < rightArr.length) {
    if (
      compare(leftArr[leftI], rightArr[rightI])
    ) {
      result.push(rightArr[rightI]);
      rightI++;
    } else {
      result.push(leftArr[leftI]);
      leftI++;
    }
  }
  while (leftI < leftArr.length) {
    result.push(leftArr[leftI]);
    leftI++;
  }
  while (rightI < rightArr.length) {
    result.push(rightArr[rightI]);
    rightI++;
  }
  return result;
}

/**
 * 
 * @param {Array} arr array to sort.
 * @param {number?} startIndex defaults to 0
 * @param {number?} endIndex defaults to arr.length -1
 * @returns {Array} sorted array.
 */
function quickSort(arr, startIndex = 0, endIndex = arr.length - 1) {
  if (startIndex < endIndex) {
    let pivotIndex = pivot(arr, startIndex, endIndex);
    //left
    quickSort(arr, startIndex, pivotIndex - 1);
    //right
    quickSort(arr, pivotIndex + 1, endIndex);
  }
  return arr;
}
function pivot(arr, startIndex = 0, endIndex = arr.length + 1) {
  let pivot = arr[startIndex];
  let swapIndex = startIndex;

  for (let i = startIndex + 1; i < endIndex + 1; i++) {
    const element = arr[i];
    if (pivot > element) {
      swapIndex++;
      swap(arr, swapIndex, i);
    }
  }
  swap(arr, startIndex, swapIndex);

  return swapIndex;
}
/**
 * -----------------------------------------
 * ***************TESTING*******************
 * -----------------------------------------
 */

function genArray(length = 200, random = 1000) {
  return Array.from(
    { length: length },
    () => Math.floor(Math.random() * random),
  );
}
const stopWatch = new StopWatch();
const toSortArr = genArray(5);
// const toSortArr = [{ name: "A" }, { name: "C" }, { name: "B" }, { name: "Z" }];

// stopWatch.start();
// console.log(selectionSort(toSortArr));
// console.log(stopWatch.stop().printElapsed("QuickSort"));

stopWatch.start();
console.log(
  quickSort([99, 100, 200, 50, 30, 1000, 0, 20]),
);
console.log(stopWatch.stop().printElapsed("QuickSort"));
