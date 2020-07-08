/**
 * Utility class to time the functions.
 * @example
 * const stopWatch = new StopWatch();
 * stopWatch.start();
 * let i = 0;
 * while (i < 1000) {
 *   i++;
 * }
 * console.log(stopWatch.printElapsed("test")); // test [1ms] [0.001s]
 */
export default class StopWatch {
  performance: boolean;
  startTime: number;
  stopTime: number;
  running: boolean;
  constructor(useWindowPerformance: boolean = false) {
    this.startTime = 0;
    this.stopTime = 0;
    this.running = false;
    if (!useWindowPerformance) {
      this.performance = false;
    } else {
      this.performance = typeof window !== "undefined"
        ? !!window.performance
        : false;
    }
  }
  currentTime() {
    return this.performance ? window.performance.now() : new Date().getTime();
  }
  start() {
    this.startTime = this.currentTime();
    this.running = true;
    return this;
  }
  stop() {
    this.stopTime = this.currentTime();
    this.running = false;
    return this;
  }

  getElapsedMilliseconds() {
    if (this.running) {
      this.stopTime = this.currentTime();
    }

    return this.stopTime - this.startTime;
  }

  getElapsedSeconds() {
    return this.getElapsedMilliseconds() / 1000;
  }

  printElapsed(name = "Elapsed:") {
    const log =
      `${name} [${this.getElapsedMilliseconds()}ms] [${this.getElapsedSeconds()}s]`;
    //THIS LOG IS INTENTIONAL.
    console.log(log);
    return log;
  }
}
