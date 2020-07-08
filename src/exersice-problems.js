// JS PRACTICE FILE.

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
  // TODO:
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
}

// console.log(validAnagram("", "")); //true
// console.log(validAnagram("qwerty", "qeywrt")); //true
// console.log(validAnagram("Qwerty", "qeywrT")); //true
// console.log(validAnagram("anagram", "nagaram")); //true
// console.log(validAnagram("texttwisttime", "timetwisttext")); //true
// console.log(validAnagram("aaz", "zza")); //false
// console.log(validAnagram("rat", "car")); //false
// console.log(validAnagram("awesome", "awesom")); //false
