export function allValuesInArrayAreEqual(arg: any[]): boolean {
  if (!(arg instanceof Array)) {
    throw new Error("Arg is not an array");
  } else {
    return arg.every((value, _index, array) => value === array[0]);
  }
}

const test = [1, 1, 2, 1, 1];

console.log(allValuesInArrayAreEqual(test));
