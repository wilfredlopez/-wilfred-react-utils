export function throttle<T extends Function>(
  fn: T,
  threshhold: number = 250,
  scope?: any,
) {
  threshhold || (threshhold = 250);
  let last: number, deferTimer: NodeJS.Timeout;
  return function () {
    var context: Window | any = scope || window; // this was actually "this"

    var now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
