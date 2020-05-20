import { WBinarySearchTree } from "./WBinarySearchTree";

interface DataType {
  priority: number;
  data: string;
}

let bst: WBinarySearchTree<DataType> | null = null;

describe.skip("BinarySearchTree", () => {
  beforeEach(() => {
    //head 20
    bst = new WBinarySearchTree<DataType>({
      priority: 20,
      data: "20",
    });
    //right 21
    bst.insert({ priority: 21, data: "21" });
    //right.right
    bst.insert({ priority: 50, data: "50" });
    //left
    bst.insert({ priority: 1, data: "1" });
    //left.left
    bst.insert({ priority: 2, data: "2" });

    /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
  });
  it("creates a bst and inserts the value in the correct place", () => {
    /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
    expect(bst.value).toEqual({ priority: 20, data: "20" });
    expect(bst.left.value).toEqual({ priority: 1, data: "1" });
    expect(bst.left.right.value).toEqual({ priority: 2, data: "2" });
    expect(bst.right.value).toEqual({ priority: 21, data: "21" });
    expect(bst.right.right.value).toEqual({ priority: 50, data: "50" });
  });
  it("Finds the values with the method contains", () => {
    expect(bst.contains({ priority: 21, data: "21" })).toBeTruthy();
    expect(bst.contains({ priority: 100, data: "100" })).toBeFalsy();
  });

  describe("depthFirstTraversal", () => {
    it("in-order returns the values from less to greater", () => {
      let i = 0;

      function log(value) {
        expect(value.priority).toBeGreaterThan(i);
        i = value.priority;
      }
      bst.depthFirstTraversal(log, "in-order");
    });
    it("pre-order returns the values from left to right", () => {
      let values = [];
      function log(value) {
        values.push(value);
      }
      bst.depthFirstTraversal(log, "pre-order");
      /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
      const expected = [
        { priority: 20, data: "20" },
        { priority: 1, data: "1" },
        { priority: 2, data: "2" },
        { priority: 21, data: "21" },
        { priority: 50, data: "50" },
      ];
      expect(values).toStrictEqual(expected);
    });
    it("post-order returns the values from right to left", () => {
      let values = [];
      function log(value) {
        values.push(value);
      }
      bst.depthFirstTraversal(log, "post-order");
      /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
      const expected = [
        { priority: 2, data: "2" },
        { priority: 1, data: "1" },
        { priority: 50, data: "50" },
        { priority: 21, data: "21" },
        { priority: 20, data: "20" },
      ];
      expect(values).toStrictEqual(expected);
    });
  });
  describe("breadthFirstTraversal", () => {
    it("Returns all  the nodes from top to bottom", () => {
      let values = [];
      function log(node: WBinarySearchTree<DataType>) {
        values.push(node.value);
      }
      bst.breadthFirstTraversal(log);
      /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
      const expected = [
        { priority: 20, data: "20" },
        { priority: 1, data: "1" },
        { priority: 21, data: "21" },
        { priority: 2, data: "2" },
        { priority: 50, data: "50" },
      ];
      expect(values).toEqual(expected);
    });
  });
  describe("getMaxVal and getMinVal", () => {
    it("Returns all  the nodes from top to bottom", () => {
      const minval = bst.getMinVal();
      const maxVal = bst.getMaxVal();
      /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
      expect(minval).toStrictEqual({ priority: 1, data: "1" });
      expect(maxVal).toStrictEqual({ priority: 50, data: "50" });
    });
  });
  describe("getValue", () => {
    it("Returns all  the nodes from top to bottom", () => {
      const value = bst.getValue({ priority: 20, data: "20" });
      const noValue = bst.getValue({ priority: 105, data: "105" });
      expect(value).toStrictEqual({ priority: 20, data: "20" });
      expect(noValue).toBe(null);
    });
  });
});
