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

