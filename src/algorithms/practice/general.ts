export {};

//console log from 1 to n
//if divisible by three logout FIZZ instead
// if divisible by five logout BUZZ instead
// if n is divisible by both 3 and five logout FIZZBUZZ instead
function fizzbuzz(num: number) {
  let result = ``;
  for (let i = 1; i <= num; i++) {
    if (i % 3 === 0 && i % 5 === 0) result += `FIZZBUZZ\n`;
    else if (i % 3 === 0) result += `FIZZ\n`;
    else if (i % 5 === 0) result += `BUZZ\n`;
    else result += `${i}\n`;
  }
  console.log(result);
  return result;
}

function isPalindrome(text: string) {
  return text.toLowerCase().split(/\W/gi).reverse().join("") ===
    text.toLocaleLowerCase().split(/\W/gi).join("");
  // return text.toLowerCase().split("").reverse().join("") === text.toLowerCase();
}

function reverseWords(str: string) {
  const revWords = str.split(" ");
  let output: string[] = [];
  for (let letter of revWords) {
    output.push(letter.split("").reverse().join(""));
  }
  return output.join(" ");
}
console.log(isPalindrome("RaceCar"));
console.log(fizzbuzz(20));
console.log(reverseWords("Coding Javascript"));
