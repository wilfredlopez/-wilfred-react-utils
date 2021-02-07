/**
 * Creates a file with the data and submits a click event via an html <a></a> element to download it to the user's device.
 * @param data can be any data. for example a json file.
 * @param filename name of the output file
 * @param type type of file. for example one of these ["image/png", "image/jpeg", "image/gif",'application/json', "text/plain" ]
 * @example 
 * function saveToFile() {
    const data = JSON.stringify(songs)
    const filename = `file-${new Date().getTime()}.json`
    downloadToFile(data, filename, "application/json")
  }
 */
export function downloadToFile(
  data: BufferSource | Blob | string,
  filename: string,
  type: string,
) {
  const file = new Blob([data], { type: type })
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename)
  else {
    // Others
    const a = document.createElement("a"),
      url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(function () {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}
