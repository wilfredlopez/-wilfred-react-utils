
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



function createBoundMethods(useStore_fn: UseStoreDefaultFunc): Methods {
  return {
    clear: clear.bind(null, useStore_fn),
    del: (key: IDBValidKey, customStore: UseStore | UseStoreDefaultFunc = useStore_fn) => del(key, customStore),
    entries: entries.bind(null, useStore_fn),
    get: (key: IDBValidKey, customStore: UseStoreDefaultFunc | UseStore = useStore_fn) => get(key, customStore),
    keys: keys.bind(null, useStore_fn),
    getMany: (keys: IDBValidKey[], customStore: UseStoreDefaultFunc | UseStore = useStore_fn) => getMany(keys, customStore),
    set: (key: IDBValidKey, value: any, customStore: UseStoreDefaultFunc | UseStore = useStore_fn) => set(key, value, customStore),
    update: <T>(key: IDBValidKey, updater: (oldValue: T | undefined) => T, customStore: UseStoreDefaultFunc | UseStore = useStore_fn) => update<T>(key, updater, customStore),
    setMany: (entries: [IDBValidKey, any][], customStore: UseStoreDefaultFunc | UseStore = useStore_fn) => setMany(entries, customStore),
    values: values.bind(null, useStore_fn),
    count: (key: IDBValidKey | IDBKeyRange, customStore: UseStoreDefaultFunc | UseStore = useStore_fn) => count(key, customStore),
    eachCursor: (callback: (cursor: IDBCursorWithValue) => void,
      customStore: UseStore | UseStoreDefaultFunc = useStore_fn) => eachCursor(callback, customStore)
  }
}

function getMethod(mode: IDBTransactionMode, useStore_fn: UseStoreDefaultFunc) {
  const _readonly = <T>(callback: (store: IDBObjectStore) => T | PromiseLike<T>) => useStore_fn(mode, callback)
  const bindMethods = createBoundMethods(useStore_fn)
  const readonly: UseStoreGetters[typeof mode] = Object.assign(_readonly, {
    ...bindMethods
  })

  return readonly
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

  const useStore_fn = <T>(txMode: IDBTransactionMode, callback: (store: IDBObjectStore) => T | PromiseLike<T>,) =>
    dbp.then((db) =>
      callback(db.transaction(storeName, txMode).objectStore(storeName)),
    )

  const readonly: UseStoreGetters['readonly'] = getMethod('readonly', useStore_fn)
  const readwrite: UseStoreGetters['readwrite'] = getMethod('readwrite', useStore_fn)
  const versionchange: UseStoreGetters['versionchange'] = getMethod('versionchange', useStore_fn)
  const bindMethods = createBoundMethods(useStore_fn)
  return Object.assign(useStore_fn, {
    readonly,
    readwrite,
    versionchange,
    ...bindMethods
  })
}

/**
 * @public
 */
export type UseStore = UseStoreDefaultFunc & UseStoreGetters

type UseStoreDefaultFunc = <T>(
  txMode: IDBTransactionMode,
  callback: UseStoreCallBack<T>
) => Promise<T>

type Methods = Omit<typeof indexDBStore, 'createStore' | 'getDefaultStore' | 'promisifyRequest'>

type UseStoreCallBack<T> = (store: IDBObjectStore) => T | PromiseLike<T>
type GetterCallBack = <T>(callback: UseStoreCallBack<T>) => Promise<T>
export type UseStoreGetters = {
  readonly: GetterCallBack & Methods
  readwrite: GetterCallBack & Methods
  versionchange: GetterCallBack & Methods
} & Methods



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
  customStore: UseStore | UseStoreDefaultFunc = getDefaultStore(),
): Promise<T | undefined> {
  return customStore('readonly', (store) => promisifyRequest(store.get(key)))
}


/**
 * Retrieves the number of records matching the given key or key range in query.
 * @param key 
 * @public
 */
function count(
  key: IDBValidKey | IDBKeyRange,
  customStore: UseStore | UseStoreDefaultFunc = getDefaultStore(),
): Promise<number> {
  return customStore('readonly', (store) => promisifyRequest(store.count(key)))
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
  customStore: UseStore | UseStoreDefaultFunc = getDefaultStore(),
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
  customStore: UseStore | UseStoreDefaultFunc = getDefaultStore(),
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
  customStore: UseStore | UseStoreDefaultFunc = getDefaultStore(),
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
  customStore: UseStore | UseStoreDefaultFunc = getDefaultStore(),
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
  customStore: UseStore | UseStoreDefaultFunc = getDefaultStore(),
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
function clear(customStore: UseStore | UseStoreDefaultFunc = getDefaultStore()): Promise<void> {
  return customStore('readwrite', (store) => {
    store.clear()
    return promisifyRequest(store.transaction)
  })
}



function eachCursor(
  callback: (cursor: IDBCursorWithValue) => void,
  customStore: UseStore | UseStoreDefaultFunc = getDefaultStore(),
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
function keys(customStore: UseStore | UseStoreDefaultFunc = getDefaultStore()): Promise<IDBValidKey[]> {
  const items: IDBValidKey[] = []

  return eachCursor((cursor) => items.push(cursor.key), customStore).then(
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
  customStore: UseStore | UseStoreDefaultFunc = getDefaultStore(),
): Promise<IDBValidKey[]> {
  const items: any[] = []

  return eachCursor((cursor) => items.push(cursor.value), customStore).then(
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
  customStore: UseStore | UseStoreDefaultFunc = getDefaultStore(),
): Promise<[IDBValidKey, any][]> {
  const items: [IDBValidKey, any][] = []

  return eachCursor((cursor) =>
    items.push([cursor.key, cursor.value]),
    customStore,
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
  promisifyRequest,
  count,
  eachCursor
}

export default indexDBStore

//@example use

// const store = indexDBStore.createStore('WDB', 'myStore')

// //write
// store.readwrite(db => {
//   db.add('react-utils', 'rutil')
//   db.add('s', 'sssss')
// })

// //get all entries
// store.entries().then(data => {
//   console.log({ entries: data })
// })

// //delete
// store.del('s')

// //get all values
// store.values().then(s => {
//   console.log({ s })
// })

// //Read
// store.readonly.get('rutil').then(value => {
//   console.log('value with key rutil is: ', value)
// })

// //Clear all the data in store.
// store.clear().then(() => {
//   console.log('store is cleared.')
// })

// //COUNT: Retrieve the number of records matching the given key

// //COUNT: Object API
// store.count('rutil').then(result => {
//   console.log(`count is : `, result)
// })
// //COUNT: Function API
// store('readonly', db => {
//   const request = db.count('rutil')
//   request.onsuccess = function () {
//     console.log(`count is : `, this.result)
//   }
// })


