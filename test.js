//@ts-check
const ReactUtils = require("./dist/index")

const path = require("path")

const data = ReactUtils.loadCsv(path.join(__dirname, "testdata.csv"), {
  converters: {
    inStock: (val) => (val === "true" ? true : false),
  },
})

console.log(data.table)
