type SortType = "sortedAssending" | "sortedDesending";

/**
 * Returns the index of the search number in the array.
 * This uses Binary Search and requires the array to be sorted.
 * @param data  a sorted array of numbers
 * @param searchN a number in the array to get the index of.
 * @complexcity O(log n)
 */
export function getSortedNumberArrayIndex(
  data: Array<number>,
  searchN: number,
) {
  let sortType: SortType = data[0] < data[data.length - 1]
    ? "sortedAssending"
    : "sortedDesending";
  //Bases cases depending on sorting order.
  //this could be omitted but makes it faster and avoids going on the loop thru the entire array.
  if (sortType === "sortedAssending") {
    //if starts at 0 and seaching for -29 the value wont be there.
    if (searchN < data[0]) return -1;
    //if ends at 15 and seaching for 100 the value wont be there.
    if (searchN > data[data.length - 1]) return -1;
  } else {
    //sorted descending
    if (searchN > data[0]) return -1;
    if (searchN < data[data.length - 1]) return -1;
  }
  let start = 0;
  let end = data.length - 1;
  let middle = Math.floor((start + end) / 2);

  function loopAssending() {
    while (data[middle] !== searchN && start <= end) {
      if (start === data.length) return -1;
      searchN < data[middle] ? end = middle - 1 : start = middle + 1;
      middle = Math.floor((start + end) / 2);
    }
  }
  function loopDesending() {
    while (data[middle] !== searchN && start <= end) {
      searchN > data[middle] ? end = middle - 1 : start = middle + 1;
      middle = Math.floor((start + end) / 2);
    }
  }
  sortType === "sortedAssending" ? loopAssending() : loopDesending();
  return data[middle] === searchN ? middle : -1;
  //   return data[middle];
}

const dataAsc = [0, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const dataDes = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4];

const indexInAsc = getSortedNumberArrayIndex(dataAsc, 12);
const indexInDesc = getSortedNumberArrayIndex(dataDes, 12);
console.log(indexInAsc);
console.log(dataAsc[indexInAsc]);
console.log(indexInDesc);
console.log(dataDes[indexInDesc]);
