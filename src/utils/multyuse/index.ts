/**
 * Doesnt allow the function to execute more than 1 before the threshold is met. like a debounce function.
 * @param fn 
 * @param threshhold delay amount in ms
 * @param scope the this scope
 * @example
 * $('body').on('mousemove', throttle(function (event) {
  console.log('tick');
}, 1000));
 */
export function throttle<T extends Function>(
  fn: T,
  threshhold: number = 250,
  scope?: any,
) {
  threshhold || (threshhold = 250)
  let last: number, deferTimer: NodeJS.Timeout
  return function () {
    var context: Window | any = scope || window // this was actually "this"

    var now = +new Date(),
      args = arguments
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}
