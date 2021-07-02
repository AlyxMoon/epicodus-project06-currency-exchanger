
export default class Cache {
  constructor (cacheInterface = localStorage, key = 'cache') {
    this.interface = cacheInterface
    this.key = key
  }

  get data () {
    if (!this._data) this.loadCache()
    return this._data
  }

  set data (value) {
    this.updateCache(value)
    return this.data
  }

  loadCache () {
    const cachedData = this.interface.getItem(this.key)
    this._data = (cachedData && JSON.parse(cachedData)) || {}
  }

  updateCache (data) {
    this.interface.setItem(this.key, JSON.stringify(data))
    this._data = data
  }
}
