export type ResourceStatus = "pending" | "error" | "success"

/**
 * Utitily function to use with React.Suspense and Concurrent mode.
 * returns and object with a .read() method.
 * @example const resource = createResource(fetchData())
 * const data = resource.read()
 * @param asyncFn a function that returns a Promise.
 */
export function createResource<T extends any>(asyncFn: () => Promise<T>) {
  let status: ResourceStatus = "pending"
  let error: Error
  let suspender = asyncFn().then(
    (r) => {
      status = "success"
      result = r
    },
    (e) => {
      status = "error"
      error = e
    },
  )
  let result: T
  return {
    read() {
      if (status === "error") throw error
      if (status === "pending") throw suspender
      if (status === "success") return result
      throw new Error("Something went wrong")
    },
  }
}

/**
 * Utitily function to use with React.Suspense and Concurrent mode.
 * returns and object with a .read() method.
 * @param promise a function that returns a Promise.
 */
export function wrapPromise<T extends any>(promise: Promise<T>) {
  let status: ResourceStatus = "pending"
  let result: T
  let suspender: Promise<void> = promise.then(
    (r) => {
      status = "success"
      result = r
    },
    (e) => {
      status = "error"
      result = e
    },
  )
  return {
    read() {
      if (status === "pending") {
        throw suspender
      } else if (status === "error") {
        throw result
      } else if (status === "success") {
        return result
      }
    },
  }
}
