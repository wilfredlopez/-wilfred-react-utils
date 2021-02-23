
/**
 * 
 * @param request IDBRequest | IDBTransaction
 * @public
 * @example
 * defaultGetStore()('readonly', (s) => {
 *   const promise = promisifyRequest(s.get('me'))
 *   promise.then((res) => {
 *     console.log({ res })
 *   })
 * })
 */
function promisifyRequest<T = undefined>(
  request: IDBRequest<T> | IDBTransaction,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // @ts-ignore - file size hacks
    request.oncomplete = request.onsuccess = () => resolve(request.result)
    // @ts-ignore - file size hacks
    request.onabort = request.onerror = () => reject(request.error)
  })
}

/**
 * 
 * @param dbName name of database
 * @param storeName name of custom store
 * @public
 */
function createStore(dbName: string, storeName: string): UseStore {
  const request = indexedDB.open(dbName)
  request.onupgradeneeded = () => request.result.createObjectStore(storeName)
  const dbp = promisifyRequest(request)

  return (txMode, callback) =>
    dbp.then((db) =>
      callback(db.transaction(storeName, txMode).objectStore(storeName)),
    )
}

export type UseStore = <T>(
  txMode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => T | PromiseLike<T>,
) => Promise<T>

let getDefaultStoreFunc: UseStore | undefined


const DEFAULT_STORE = {
  DBNAME: "WL_KEY-STORE",
  STORE_NAME: 'KEY_STORE'
}

function getDefaultStore() {
  if (!getDefaultStoreFunc) {
    getDefaultStoreFunc = createStore(DEFAULT_STORE.DBNAME, DEFAULT_STORE.STORE_NAME)
  }
  return getDefaultStoreFunc
}

/**
 * Get a value by its key.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 * @public
 */
function get<T = any>(
  key: IDBValidKey,
  customStore = getDefaultStore(),
): Promise<T | undefined> {
  return customStore('readonly', (store) => promisifyRequest(store.get(key)))
}

/**
 * Set a value with a key.
 *
 * @param key
 * @param value
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 * @public
 */
function set(
  key: IDBValidKey,
  value: any,
  customStore = getDefaultStore(),
): Promise<void> {
  return customStore('readwrite', (store) => {
    store.put(value, key)
    return promisifyRequest(store.transaction)
  })
}

/**
 * Set multiple values at once. This is faster than calling set() multiple times.
 * It's also atomic – if one of the pairs can't be added, none will be added.
 *
 * @param entries Array of entries, where each entry is an array of `[key, value]`.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 * @public
 */
function setMany(
  entries: [IDBValidKey, any][],
  customStore = getDefaultStore(),
): Promise<void> {
  return customStore('readwrite', (store) => {
    entries.forEach((entry) => store.put(entry[1], entry[0]))
    return promisifyRequest(store.transaction)
  })
}

/**
 * Get multiple values by their keys
 *
 * @param keys
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 * @public
 */
function getMany(
  keys: IDBValidKey[],
  customStore = getDefaultStore(),
): Promise<any[]> {
  return customStore('readonly', (store) =>
    Promise.all(keys.map((key) => promisifyRequest(store.get(key)))),
  )
}

/**
 * Update a value. This lets you see the old value and update it as an atomic operation.
 *
 * @param key
 * @param updater A callback that takes the old value and returns a new value.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 * @public
 */
function update<T = any>(
  key: IDBValidKey,
  updater: (oldValue: T | undefined) => T,
  customStore = getDefaultStore(),
): Promise<void> {
  return customStore(
    'readwrite',
    (store) =>
      // Need to create the promise manually.
      // If I try to chain promises, the transaction closes in browsers
      // that use a promise polyfill (IE10/11).
      new Promise((resolve, reject) => {
        store.get(key).onsuccess = function () {
          try {
            store.put(updater(this.result), key)
            resolve(promisifyRequest(store.transaction))
          } catch (err) {
            reject(err)
          }
        }
      }),
  )
}

/**
 * Delete a particular key from the store.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 * @public
 */
function del(
  key: IDBValidKey,
  customStore = getDefaultStore(),
): Promise<void> {
  return customStore('readwrite', (store) => {
    store.delete(key)
    return promisifyRequest(store.transaction)
  })
}

/**
 * Clear all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 * @public
 */
function clear(customStore = getDefaultStore()): Promise<void> {
  return customStore('readwrite', (store) => {
    store.clear()
    return promisifyRequest(store.transaction)
  })
}



function eachCursor(
  customStore: UseStore,
  callback: (cursor: IDBCursorWithValue) => void,
): Promise<void> {
  return customStore('readonly', (store) => {
    // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
    // And openKeyCursor isn't supported by Safari.
    store.openCursor().onsuccess = function () {
      if (!this.result) return
      callback(this.result)
      this.result.continue()
    }
    return promisifyRequest(store.transaction)
  })
}

/**
 * Get all keys in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 * @public
 */
function keys(customStore = getDefaultStore()): Promise<IDBValidKey[]> {
  const items: IDBValidKey[] = []

  return eachCursor(customStore, (cursor) => items.push(cursor.key)).then(
    () => items,
  )
}

/**
 * Get all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 * @public
 */
function values(
  customStore = getDefaultStore(),
): Promise<IDBValidKey[]> {
  const items: any[] = []

  return eachCursor(customStore, (cursor) => items.push(cursor.value)).then(
    () => items,
  )
}

/**
 * Get all entries in the store. Each entry is an array of `[key, value]`.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 * @public
 */
function entries(
  customStore = getDefaultStore(),
): Promise<[IDBValidKey, any][]> {
  const items: [IDBValidKey, any][] = []

  return eachCursor(customStore, (cursor) =>
    items.push([cursor.key, cursor.value]),
  ).then(() => items)
}

export const indexDBStore = {
  createStore,
  getDefaultStore,
  get,
  set,
  setMany,
  getMany,
  update,
  del,
  clear,
  keys,
  values,
  entries,
  promisifyRequest
}

export default indexDBStore

//@example use

const store = indexDBStore.createStore('W', 'W')


// //read-write
store('readwrite', (s) => {
  s.add('me', 'me')
})

// //read
store('readonly', (s) => {
  //normal use
  s.get('me').onsuccess = function () {
    console.log({ res: this.result })
  }
  //using promisify
  const p = promisifyRequest(s.get('me'))
  p.then((res) => {
    console.log({ res })
  })
})

// //utilities
// indexDBStore.get('me', store)
// indexDBStore.get('me', store).then(res => {
//   console.log(res)
// })
// indexDBStore.del('s', store)

// //[key, value]
// indexDBStore.entries(store).then(data => {
//   console.log({ entries: data })
// })
// indexDBStore.values(store).then(s => {
//   console.log({s})
// })
// indexDBStore.clear(store)