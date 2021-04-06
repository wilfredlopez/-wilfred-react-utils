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


export function downloadByUrl(url: string, filename: string = '*') {
  filename = filename !== '*' ? filename : url.substring(url.lastIndexOf("/") + 1).split("?=")[0]
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'blob'
  xhr.onload = function () {
    var a = document.createElement('a')
    a.href = window.URL.createObjectURL(xhr.response)
    a.download = filename
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
  xhr.open('GET', url)
  xhr.send()
}