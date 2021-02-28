
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
    entries: (config: GetConfigWithFilter = {}) => entries({ customStore: useStore_fn, ...config }),
    get: (key: IDBValidKey | IDBKeyRange, config: GetConfig = {}) => get(key, { customStore: useStore_fn, ...config }),
    keys: keys.bind(null, useStore_fn),
    getMany: (keys: (IDBValidKey | IDBKeyRange)[], config: GetConfig = {}) => getMany(keys, { customStore: useStore_fn, ...config }),
    set: (key: IDBValidKey, value: any, customStore: UseStoreDefaultFunc | UseStore = useStore_fn) => set(key, value, customStore),
    update: <T>(key: IDBValidKey, updater: (oldValue: T | undefined) => T, customStore: UseStoreDefaultFunc | UseStore = useStore_fn) => update<T>(key, updater, customStore),
    setMany: (entries: [IDBValidKey, any][], customStore: UseStoreDefaultFunc | UseStore = useStore_fn) => setMany(entries, customStore),
    values: (config: GetConfigWithFilter = {}) => values({ customStore: useStore_fn, ...config }),
    count: (key: IDBValidKey | IDBKeyRange, customStore: UseStoreDefaultFunc | UseStore = useStore_fn) => count(key, customStore),
    eachCursor: (callback: (cursor: IDBCursorWithValue) => void,
      config: GetConfigWithFilter = {}) => eachCursor(callback, { customStore: useStore_fn, ...config })
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



interface CreateStoreConfig {
  version?: number | undefined, options?: IDBObjectStoreParameters | undefined,
  deleteOnUpdate?: boolean,
  onupgradeHandler?: (store: IDBObjectStore, request: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any
}

/**
* 
* @param dbName name of database
* @param storeName name of custom store
* @public
*/
function createStore(dbName: string, storeName: string, config: CreateStoreConfig = {}): UseStore {
  const request = indexedDB.open(dbName, config.version)
  request.onupgradeneeded = (evt) => {
    const newVersion = evt.newVersion
    if (newVersion) {
      console.warn(`upgrading indexdb from version ${evt.oldVersion} to version ${newVersion}`)
    }
    let store: IDBObjectStore
    if (request.result.objectStoreNames.contains(storeName)) {

      if (config.deleteOnUpdate) {

        request.result.deleteObjectStore(storeName)
        store = request.result.createObjectStore(storeName, config.options)

        if (config.onupgradeHandler) {
          config.onupgradeHandler(store, request, evt)
        }
      } else {
        store = request.transaction?.objectStore(storeName)!
        if (config.onupgradeHandler) {
          config.onupgradeHandler(store, request, evt)
        }
      }


    } else {

      store = request.result.createObjectStore(storeName, config.options)

      if (config.onupgradeHandler) {
        config.onupgradeHandler(store, request, evt)
      }
    }
    //not needed by just for typesafety
    return store
  }
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
  key: IDBValidKey | IDBKeyRange,
  { customStore = getDefaultStore(), indexKey }: GetConfig = {}
): Promise<T | undefined> {
  return customStore('readonly', (store) => {
    let getter: IDBIndex | IDBObjectStore
    if (indexKey) {
      getter = store.index(indexKey)
    } else {
      getter = store
    }
    return promisifyRequest(getter.get(key))
  })
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

interface GetConfigWithFilter {
  indexKey?: string,
  customStore?: UseStore | UseStoreDefaultFunc
  filter?: IDBKeyRange
}
interface GetConfig {
  indexKey?: string,
  customStore?: UseStore | UseStoreDefaultFunc
}

/**
* Get multiple values by their keys
*
* @param keys
* @param customStore Method to get a custom store. Use with caution (see the docs).
* @public
*/
function getMany(
  keys: (IDBValidKey | IDBKeyRange)[],
  { customStore = getDefaultStore(), indexKey }: GetConfig = {}
): Promise<any[]> {
  return customStore('readonly', (store) =>
    Promise.all(keys.map((key) => {
      let getter: IDBIndex | IDBObjectStore = store
      if (indexKey) {
        getter = store.index(indexKey)
      }
      return promisifyRequest(getter.get(key))
    })),
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
  { customStore = getDefaultStore(), indexKey, filter }: GetConfigWithFilter
): Promise<void> {
  return customStore('readonly', (store) => {
    let getter: IDBObjectStore | IDBIndex = store
    if (typeof indexKey !== 'undefined') {
      getter = store.index(indexKey)
    }
    // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
    // And openKeyCursor isn't supported by Safari.
    getter.openCursor(filter).onsuccess = function () {
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

  return eachCursor((cursor) => items.push(cursor.key), { customStore }).then(
    () => items,
  )
}

/**
* Get all values in the store.
*
* @param customStore Method to get a custom store. Use with caution (see the docs).
* @public
*/
function values<T = IDBValidKey>(
  config: GetConfigWithFilter = {}
): Promise<T[]> {
  const items: T[] = []

  return eachCursor((cursor) => items.push(cursor.value), { customStore: getDefaultStore(), ...config }).then(
    () => items as any,
  )
}

/**
* Get all entries in the store. Each entry is an array of `[key, value]`.
*
* @param customStore Method to get a custom store. Use with caution (see the docs).
* @public
*/
function entries(
  config: GetConfigWithFilter = {}
): Promise<[IDBValidKey, any][]> {
  const items: [IDBValidKey, any][] = []

  return eachCursor((cursor) =>
    items.push([cursor.key, cursor.value]),
    { customStore: getDefaultStore(), ...config },
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

// // @example use
// const store = indexDBStore.createStore('WDB', 'myStore', {
//   version: 1,
//   onupgradeHandler: (store, request, event) => {
//     //do transactions that can only happen on upgrade events.
//     store.createIndex('IdIndex', 'id', { unique: true })
//     console.log(request, event)
//   }
// })

// //write
// store.readwrite(db => {
//   db.add({ id: "1", name: "1 name" }, '1',)
//   db.add({ id: "2", name: "2 name" }, '2',)
// })

// //get all entries
// store.entries().then(data => {
//   console.log({ entries: data })
// })


// //get all values
// store.values().then(values => {
//   console.log('values: ', { values })
// })

// //Read
// store.readonly.get('2').then(value => {
//   console.log('value with key 2 is: ', value)
// })



// //COUNT: Retrieve the number of records matching the given key

// //COUNT: Object API
// const range = IDBKeyRange.bound('0', "2")
// store.count(range).then(result => {
//   console.log(`count is : `, result)
// })
// //COUNT: Function API
// store('readonly', db => {
//   const request = db.count('2')
//   request.onsuccess = function () {
//     console.log(`count is : `, this.result)
//   }
// })

// //delete
// store.del('1').then(() => {
//   console.log("Delete complete for key 1")
// })

// store.readonly.get('1').then(value => {
//   console.log('value with key 1 is now: ', value)
// })
// //Clear all the data in store.
// store.clear().then(() => {
//   console.log('store is cleared.')
// })