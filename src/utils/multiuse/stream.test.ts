import Stream from "./Stream";
import { wait } from "@testing-library/react";

const counterFunction = (n: number) => n + 1;
const nGenerator = () => Math.round(Math.random() * 20);

describe.skip("Stream", () => {
  describe("Static Methods", () => {
    it("Generates a stream with Stream.Generate", () => {
      const CounterStream = Stream.Generate(counterFunction);
      const expected = [2, 3, 4, 5];
      let data = [];

      CounterStream.setLimit(4).forEach(1).run((n) => {
        data.push(n);
      });
      expect(data).toStrictEqual(expected);
    });
    it("Generates Stream with Stream.Iterate", () => {
      const CounterStream = Stream.Iterate(1, counterFunction);
      const expected = [2, 3, 4, 5];
      let data = [];
      CounterStream.setLimit(4).forEach().run((n) => {
        data.push(n);
      });
      expect(data).toStrictEqual(expected);
    });
  });
  describe("Limit", () => {
    it("Takes a default limit with the constructor", () => {
      const stream1 = new Stream(nGenerator, 10);
      let totalIters = 0;
      stream1.forEach().run((_n) => {
        totalIters++;
      });
      expect(totalIters).toBe(10);
    });
    it("sets the limit on the fly", () => {
      const stream1 = new Stream(nGenerator, 10);
      let totalIters = 0;
      stream1.setLimit(3).forEach().run((n) => {
        totalIters++;
      });
      expect(totalIters).toBe(3);
    });
  });
  describe("forEach", () => {
    let generatorStream: Stream<number, never>;
    let counterStream: Stream<number, number>;
    beforeAll(() => {
      generatorStream = new Stream(nGenerator, 10);
      counterStream = new Stream(counterFunction, 10);
    });
    it("Takes no initial argument if the type of initial argument is never or undefined", () => {
      let iters = 0;
      generatorStream.setLimit(10).forEach().run(() => {
        iters++;
      });
      expect(iters).toBe(10);
    });
    it("Takes initial argument if required by the type of function", async () => {
      let iters = 0;
      counterStream.setLimit(2).forEach(1).run(() => {
        iters++;
      });

      expect(iters).toBe(2);
    });
    it("It skips when especified.", () => {
      let iters = 0;
      //{ initialArgument: 1 }
      counterStream.setLimit(5).setSkip(2).forEach(1).run(() => {
        iters++;
      });

      expect(iters).toBe(3);
    });
  });

  describe("TakeUntil", () => {
    const userGeneratorStream = new Stream(() => {
      return {
        name: "wilfred",
      };
    });
    beforeEach(() => {
      userGeneratorStream.reset();
    });

    it("Takes until the function returns true", () => {
      const generated = [];
      userGeneratorStream
        .takeUntil(() => generated.length === 3)
        .forEach().run(
          (user) => {
            generated.push(user);
          },
        );
      expect(generated.length).toBe(3);
    });

    it("Takes while the function returns false", () => {
      const generated = [];
      userGeneratorStream
        .takeWhile(() => generated.length !== 3)
        .forEach().run(
          (user) => {
            generated.push(user);
          },
        );
      expect(generated.length).toBe(3);
    });

    it("Stops when the stop method is called.", () => {
      const generated = [];
      userGeneratorStream
        .forEach().run(
          (user) => {
            generated.push(user);
            if (generated.length === 5) {
              userGeneratorStream.stop();
            }
          },
        );
      expect(generated.length).toBe(5);
    });
  });

  describe("promise", () => {
    it("Takes function arguments", async () => {
      const toLowerCaseSteam = new Stream((s: string) => s.toLowerCase(), 2);
      let data: string[] = await toLowerCaseSteam.promise("HELLO");
      expect(data).toStrictEqual(["hello", "hello"]);
    });
    it("Returns a promise of an array of items", () => {
      const userGenetaror = new Stream(() => {
        return {
          name: "wilfred",
        };
      });
      let users: {
        name: string;
      }[] = [];
      wait(() => {
        userGenetaror.setLimit(2).promise().then((data) => {
          users = data;
        });
        expect(users.length).toBe(2);
        expect(users[0].name).toBeDefined();
        expect(users[1].name).toBeDefined();
      });
    });
  });
});
