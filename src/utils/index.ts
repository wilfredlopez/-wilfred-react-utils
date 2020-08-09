import { Validator } from "../validator";

export {
  AssertionError,
  assert,
  assertIsString,
  assertNever,
  forceString,
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isString,
  isTypeof,
  isUndefined,
  isNullOrUndefined,
} from "./assetion";
export {
  turnSecondsToFormatedMinutes,
  formatDuration,
  formatCentsToDollars,
  addUpTo,
  fib,
  idGenetaror,
  NumberHelper,
} from "./numbers";
export { downloadToFile } from "./downloadToFile";
export { createResource, wrapPromise } from "./createResource";
export { DateFormatter, getMonthFromInt, PrecisionTime } from "./dates";
export * from "./multiuse";
export { autoscroll } from "./scroll";
export { PatternGenerator, StringHelper } from "./strings";
export { Cipher } from "./code";
export {
  bubleSort,
  insertionSort,
  mergeArr,
  mergeSort,
  radixSort,
  ArrayHelper,
} from "./arrays";

export function getAsString(
  value: any,
): string | undefined {
  if (!value) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return getAsString(value[0]);
  }
  if (Validator.isObject(value)) {
    return undefined;
  }
  return value;
}
export function getAsNumber(
  value: any,
): number | undefined {
  const result = getAsString(value);
  if (!result) {
    return undefined;
  }
  const num = parseInt(result);
  if (isNaN(num)) {
    return undefined;
  }
  return num;
}
