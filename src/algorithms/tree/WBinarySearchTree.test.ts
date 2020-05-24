import { WBinarySearchTree } from "./WBinarySearchTree"

interface DataType {
  priority: number
  data: string
}

let bst: WBinarySearchTree<DataType> | null = null

describe.skip("BinarySearchTree", () => {
  beforeEach(() => {
    //head 20
    bst = new WBinarySearchTree<DataType>({
      priority: 20,
      data: "20",
    })
    //right 21
    bst.insert({ priority: 21, data: "21" })
    //right.right
    bst.insert({ priority: 50, data: "50" })
    //left
    bst.insert({ priority: 1, data: "1" })
    //left.left
    bst.insert({ priority: 2, data: "2" })

    /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
  })

  it("Returns an Iterator function", () => {
    let data: string[] = []
    for (const val of bst) {
      data.push(val.data)
    }
    expect(data).toStrictEqual(["20", "1", "21", "2", "50"])
  })
  it("Doesnt add if the priority is the same and 2nd parameter set to false", () => {
    /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
    expect(bst.insert({ priority: 50, data: "NEW 50" }, false)).toBeFalsy()
    expect(bst.insert({ priority: 50, data: "NEW 50" }, false)).toBeFalsy()
    // expect(bst.right.right.value).toEqual({ priority: 50, data: "50" })
    expect(bst.right.right.value).toEqual({ priority: 50, data: "50" })
  })
  it("Replaces the value if the priority is the same and 2nd parameter is true", () => {
    bst.insert({ priority: 50, data: "50" })
    const replace = bst.insert({ priority: 50, data: "NEW 50" }, true)
    expect(replace).toBeTruthy()
    // expect(bst.right.right.value).toEqual({ priority: 50, data: "NEW 50" })
    expect(bst.right.right.value).toEqual({ priority: 50, data: "NEW 50" })
  })
  it("creates a bst and inserts the value in the correct place", () => {
    /* TREE SKETCH
      *      20
      1        21 
      2       50
      */

    expect(bst.value).toEqual({ priority: 20, data: "20" })
    expect(bst.left.value).toEqual({ priority: 1, data: "1" })
    expect(bst.left.right.value).toEqual({ priority: 2, data: "2" })
    expect(bst.right.value).toEqual({ priority: 21, data: "21" })
    expect(bst.right.right.value).toEqual({ priority: 50, data: "50" })
  })
  it("Finds the values with the method contains", () => {
    expect(bst.contains(21)).toBeTruthy()
    expect(bst.contains(100)).toBeFalsy()
  })

  describe("depthFirstTraversal", () => {
    it("in-order returns the values from less to greater", () => {
      let i = 0

      function log(value) {
        const int = parseInt(value)
        expect(int).toBeGreaterThan(i)
        i = int
      }
      bst.depthFirstTraversal(log, "in-order")
    })
    it("pre-order returns the values from left to right", () => {
      let values = []
      function log(value) {
        values.push(value)
      }
      bst.depthFirstTraversal(log, "pre-order")
      /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
      // const expected = [
      //   { priority: 20, data: "20" },
      //   { priority: 1, data: "1" },
      //   { priority: 2, data: "2" },
      //   { priority: 21, data: "21" },
      //   { priority: 50, data: "50" },
      // ];
      const expecting = ["20", "1", "2", "21", "50"]

      expect(values).toStrictEqual(expecting)
    })
    it("post-order returns the values from right to left", () => {
      let values = []
      function log(value) {
        values.push(value)
      }
      bst.depthFirstTraversal(log, "post-order")
      /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
      // console.log(values, "VALUES");
      // const expected = [
      //   { priority: 2, data: "2" },
      //   { priority: 1, data: "1" },
      //   { priority: 50, data: "50" },
      //   { priority: 21, data: "21" },
      //   { priority: 20, data: "20" },
      // ];
      const expecting = ["2", "1", "50", "21", "20"]

      expect(values).toStrictEqual(expecting)
    })
  })
  describe("breadthFirstTraversal", () => {
    it("Returns all the values from top to bottom", () => {
      let values = []
      function log(value: DataType) {
        values.push(value)
      }
      bst.breadthFirstTraversal(log)
      /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
      const expecting = ["20", "1", "21", "2", "50"]
      // const expected = [
      //   { priority: 20, data: "20" },
      //   { priority: 1, data: "1" },
      //   { priority: 21, data: "21" },
      //   { priority: 2, data: "2" },
      //   { priority: 50, data: "50" },
      // ];
      expect(values).toEqual(expecting)
    })
  })
  describe("getMaxVal and getMinVal", () => {
    it("Returns all  the nodes from top to bottom", () => {
      const minval = bst.getMinVal()
      const maxVal = bst.getMaxVal()
      /* TREE SKETCH
      *      20
      1        21 
      2       50
      */
      expect(minval).toStrictEqual("1")
      expect(maxVal).toStrictEqual("50")
    })
  })
  describe("getValue", () => {
    it("Returns all  the nodes from top to bottom", () => {
      const value = bst.getValue(20)
      const goodVal = bst.getValue(1)
      const noValue = bst.getValue(105)
      const ceroVal = bst.getValue(0)
      const lessVal = bst.getValue(-1)
      expect(value).toStrictEqual("20")
      expect(goodVal).toStrictEqual("1")
      expect(noValue).toBe(null)
      expect(ceroVal).toBe(null)
      expect(lessVal).toBe(null)
    })
  })
})
