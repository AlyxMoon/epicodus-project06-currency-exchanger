
export default class Cache {
  constructor (cacheInterface = localStorage, key = 'cache') {
    this.interface = cacheInterface
    this.key = key

    this.loadCache()
  }

  get data () {
    if (!this._data) this.loadCache()
    return this._data
  }

  loadCache () {
    const cachedData = this.interface.getItem(this.key)
    this._data = cachedData || {}
  }
}
