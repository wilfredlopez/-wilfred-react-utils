import { Validator } from "../../validator";

//eslint-disable-next-line
const freeGlobal = typeof global === "object" && global !== null &&
  global.Object === Object && global;

/** Detect free variable `globalThis` */
const freeGlobalThis = typeof globalThis === "object" && globalThis !== null &&
  //eslint-disable-next-line
  globalThis.Object == Object && globalThis;

// /** Detect free variable `self`. */
// const freeSelf = typeof self === "object" && self !== null &&
//   self.Object === Object && self;

/** Used as a reference to the global object. */
const root: typeof globalThis = freeGlobalThis || freeGlobal ||
  //eslint-disable-next-line
  Function("return this")();

interface DebounceOptions {
  leading?: number;
  maxWait?: number;
  trailing?: number;
}

export function debounce(
  func: Function,
  wait: number,
  options: DebounceOptions = {},
) {
  let lastArgs: any[] | undefined,
    lastThis: Function | undefined,
    maxWait: number | undefined,
    result: any,
    timerId: number | undefined,
    lastCallTime: number | undefined;

  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF =
    (!wait && wait !== 0 && typeof root.requestAnimationFrame === "function");

  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  wait = +wait || 0;
  if (Validator.isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? Math.max(+(options.maxWait || 0), wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time: number) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function startTimer(pendingFunc: FrameRequestCallback, wait: number) {
    if (useRAF) {
      root.cancelAnimationFrame(timerId as number);
      return root.requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, wait);
  }

  function cancelTimer(id: number) {
    if (useRAF) {
      return root.cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, (maxWait || 0) - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) ||
      (maxing && timeSinceLastInvoke >= (maxWait || 0)));
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function trailingEdge(time: number) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function pending() {
    return timerId !== undefined;
  }

  function debounced(...args: any[]) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    //@ts-ignore
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}
