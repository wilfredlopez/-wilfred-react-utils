// JS PRACTICE FILE.

/**-----------------------------------------------------
 * 
 * *********************PROBLEMS***********************
 *
 *------------------------------------------------------/

/**
 * reverse string without using array.reverse
 * @param {string} str 
 * 
 */
function reveseString(str) {
  //TODO
}

/**
 * @param {string} str1 
 * @returns {boolean}
 * 
 */
function isPalindrom(str1) {
  //TODO
}
/**
 * reverse number without loosing the sign.
 * @param {number} number 
 * 
 */
function reveseInt(number) {
  //TODO
}
/*************************************
 * FIZZBUZZ
 * Log to console numbers from 1 to 100. if the number is divisible by 15 log FIZZBUZZ. if divisible by 3 log FIZZ if divisible by 5 log BUZZ
 ***************************************/
//TODO

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
function factorial(num) {
}
function factorialRecursive(num) {
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
  return -1;
}

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
}

/**
 * 
 * @param {Array} leftArr 
 * @param {Array} rightArr 
 * @param {(v1,v2) => boolean} compare 
 * @returns {Array} returns a sorted merged array.
 */
function merge(leftArr, rightArr, compare = (v1, v2) => v1 > v2) {
  let result = [];

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
  return arr;
}
function pivot(arr, startIndex = 0, endIndex = arr.length + 1) {
}

/**
 * Write a helper method that gets the digit located at the specified position.
 * 0 being the most right position (for 12345 that would be 5).
 * for example getDigitAt(12345,0) // returns 5
 * @param {number} number 
 * @param {number} position 
 * @returns {number}
 */
function getDigitAt(number, position) {
}

/**
 * Write a helper method digitCount that returns the count of digits in a number.
 * 0 being the most right position (for 12345 that would be 5).
 * for example digitCount(22) // returns 2
 * console.log(digitCount(225)) //  3
 * @param {number} number 
 * @returns {number}
 */
function digitCount(number) {
}

/**
 * Write a helper method mostDigits that given an array of numbers returns the count of the largest number in the list.
 * this uses the helper method digitCount written before. 
 * for example digitCount(22) // returns 2
 * console.log(digitCount(225)) //  3
 * @param {Array<numbers>} numbers 
 * @returns {Number} largest number of digits.
 * @example
 * console.log(mostDigits([1, 2, 322])); // 3
 */
function mostDigits(numbers) {
  //TODO
}
/**
 * RADIX SORT
 * - figure out how many digits the largest number has.
 * - loop from k=0 up to this largest number of digits.
 * - for each iteration of the loop:
 *     - create buckets of each digit (0, 9) (empty arrays)
 *     - iterate over the nums array and get the digitAt the k position for each number.
 *     - push each number on correcponding bucket based on its kth digit.
 *     - Replace our exising array with values in our buckets
 * - return list at the end.
 * @param {Array<number>} nums
 * @return {Array<number>} sorted array
 * @complexity O(nk)
 * @example
 * console.log(radixSort([89, 200, 2, 299, 1])); //[ 1, 2, 89, 200, 299 ]
 */
function radixSort(nums) {
  return nums;
}

/**
 * CREATE A LINKED LIST
 * - first create the SingleNode class that accepts a value and next.
 */

class SingleNode {
  constructor(value, next = null) {
    //TODO
  }
}

/**
 * LnkedList with head, tail and length properties. makes use of the SingleNode class. 
 * you can insert/push/set/unshift items. you can pop/remove/shift and you can get items or revese the order.
 * Easy to insert (better than arrays) O(1)
 * Not good to get items/Access like arrays or object where you can use the index. O(n)
 * removing O(1) or O(n)
 */
export class SinglyLinkedList {
  constructor() {
    //TODO
  }

  /**
   * Insert a the end.
   * @param val 
   * @returns this
   */
  push(val) {
    //TODO
  }

  /**
   * Removes from the end.
   * @returns the value that was removed.
   */
  pop() {
    //TODO
  }

  /**
   * Remove from the begining (the head)
   * @returns the item that was removed or null
   */
  shift() {
    //TODO
  }

  /**
   * Insert at the begining
   * @param val 
   * @return this
   */
  unshift(val) {
    //TODO
    return this;
  }

  /**
   * 
   * @param {number} index 
   * @returns the value at index or null
   */
  get(index) {
    //TODO
  }

  /**
   * Sets a new value to existing node at index.
   * @param {number} index 
   * @param {*} value 
   * @returns {boolean}
   */
  set(index, value) {
    //TODO
  }

  /**
   * Inserts value at index. 
   * if index less than 0 or greater than the length of the linked list returns false.
   * @param index index needs to be between 0 and the total length of the LinkedList.
   * @param value value to insert.
   * @returns {boolean}
   */
  insert(index, value) {
    //TODO
  }

  /**
   * Removes at index if valid index.
   * @param {number} index 
   * @returns the removed value or null
   */
  remove(index) {
    //TODO
  }

  /**
   * Reverses the list in place and returns this.
   */
  revese() {
    //TODO
  }

  *[Symbol.iterator]() {
    //TODO
  }
}
// const list = new SinglyLinkedList();
// // adding
// list.push("Wilfred");
// list.push("yanna");
// list.push("Austria");
// list.push("Catalina");
// list.push("Pablo");
// // console.log(list.unshift("Mom"));
// list.set(0, "mami");
// list.insert(0, "NEW");
// list.unshift("2");

// for (let val of list) {
//   console.log(val);
// }
