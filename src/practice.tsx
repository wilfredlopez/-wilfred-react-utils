import { type } from "os";
import { memo } from "react";

export {};

function addVideoStream(element: HTMLVideoElement, stream: MediaStream) {
  element.srcObject = stream;
  element.addEventListener("loadedmetadata", () => {
    element.play();
  });
}

/**
 * Gets a video stream from the user and adds it to the element.
 * @param element HTML Video Element (could be a ref with React.useRef)
 */
function getUserMedia(element: HTMLVideoElement) {
  navigator.mediaDevices.getUserMedia({
    video: true,
  }).then((stream) => {
    addVideoStream(element, stream);
  }).catch((e) => {
    console.log(e);
  });
}

export type ParametersOf<T> = T extends (...args: infer T) => any ? T : never;

export function memoize<
  T extends (...args: any[]) => ReturnType<T>,
  A extends ParametersOf<T>,
>(
  func: T,
  resolver?: (...args: A) => any,
): { (...args: A): ReturnType<T>; cache: Map<A, ReturnType<T>> } {
  if (
    typeof func !== "function"
  ) {
    throw new TypeError(
      `Expected a function but received ${typeof func}`,
    );
  }
  if (
    (typeof resolver !== "undefined" && typeof resolver !== "function")
  ) {
    throw new TypeError(
      `Expected a function as resolver but received ${typeof resolver}`,
    );
  }
  const memoized = function (...args: A) {
    // const key: A = resolver ? resolver.apply(memoize, args) : args[0]; //args 0? or args?
    let key: any = resolver ? resolver.apply(memoize, args) : args;
    key = key.toString() as A;
    const cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    const result = func.apply(memoize, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || Map)() as Map<A, ReturnType<T>>;
  return memoized;
}

memoize.Cache = Map;

class Me {
}

function reduceFibOriginal(n: number = 0) {
  if (n <= 2) return 1;
  let fivNums = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    fivNums[i] = fivNums[i - 1] + fivNums[i - 2];
  }
  return fivNums[n];
}

function reduceFib(n: number = 0) {
  if (n <= 2) return 1;
  return Array(n).fill([1, 0]).reduce(
    (prev, _acc) => [prev[0] + prev[1], prev[0]],
  )[0];
}

console.log(reduceFib(20)); // 6765

function repeat(n: number, fn: Function) {
  for (let i = 0; i <= n; i++) {
    fn();
  }
}

function timeIt(func: Function, { label = "Execution time", log = true } = {}) {
  const start = +new Date();

  // task starts
  func();
  // task ends

  const end = +new Date();
  const text = `${label}: ${end - start} ms`;
  if (log) {
    console.log(text);
  }
  return { text, time: end - start };
}

// console.log('%c ALL CONSOLE LOGS SHOULD BE %c TRUE',"background:black ; color: white", "color: green; font-size:15px")

function findPermutations(
  string: string,
  cache: { [key: string]: string[] } = {},
): Array<string> {
  if (!string || typeof string !== "string") {
    throw new Error("Only Acepting Srings");
  } else if (string.length < 2) {
    return [string];
  }
  if (cache[string]) {
    return cache[string];
  }
  let permutationsArray = [];

  for (let i = 0; i < string.length; i++) {
    let char = string[i];

    if (string.indexOf(char) !== i) {
      continue;
    }

    let remainingChars = string.slice(0, i) +
      string.slice(i + 1, string.length);

    for (let permutation of findPermutations(remainingChars, cache)) {
      permutationsArray.push(char + permutation);
    }
  }
  cache[string] = permutationsArray;
  return permutationsArray;
}
function findPermutationsNoCache(
  string: string,
): Array<string> {
  if (!string || typeof string !== "string") {
    throw new Error("Only Acepting Srings");
  } else if (string.length < 2) {
    return [string];
  }

  let permutationsArray = [];

  for (let i = 0; i < string.length; i++) {
    let char = string[i];

    if (string.indexOf(char) !== i) {
      continue;
    }

    let remainingChars = string.slice(0, i) +
      string.slice(i + 1, string.length);

    for (let permutation of findPermutationsNoCache(remainingChars)) {
      permutationsArray.push(char + permutation);
    }
  }
  return permutationsArray;
}

// const lookup = "aaabbbccc";
// console.time("findPermutations");
// const result1 = findPermutations(lookup);
// console.log(result1.length);
// console.timeEnd("findPermutations");
// console.time("findPermutationsNoCache");
// const result2 = findPermutationsNoCache(lookup);
// console.log(result2.length);
// console.timeEnd("findPermutationsNoCache");

// console.log(result1.length === result2.length);
// console.log(JSON.stringify(result1) === JSON.stringify(result2));
