import Cache from '@/api/cache'

describe('class Cache', () => {
  it('should load default values when no arguments provided', () => {
    global.localStorage = {
      getItem: jest.fn(() => {}),
    }

    const cache = new Cache()
    expect(cache.interface).toEqual(localStorage)
    expect(cache.key).toEqual('cache')
  })

  it('should begin with an empty object when there is no current cache', () => {
    const cacheInterface = {
      getItem: jest.fn(() => null),
    }

    const cache = new Cache(cacheInterface, 'test-cache')

    expect(cache.data).toEqual({})
    expect(cacheInterface.getItem).toHaveBeenCalledTimes(1)
    expect(cacheInterface.getItem).toHaveBeenCalledWith('test-cache')
  })

  it('should load data from cache when it exists', () => {
    const cacheInterface = {
      getItem: jest.fn(() => ({ item1: 1, item2: 2 })),
    }

    const cache = new Cache(cacheInterface, 'test-cache')

    expect(cache.data).toEqual({ item1: 1, item2: 2 })
    expect(cacheInterface.getItem).toHaveBeenCalledTimes(1)
    expect(cacheInterface.getItem).toHaveBeenCalledWith('test-cache')
  })

  it('should load data from correct cache key, if multiple items exist', () => {
    const cacheData = {
      cache1: { item1: 1 },
      cache2: { item2: 2 },
    }

    const cacheInterface = {
      getItem: jest.fn((key) => cacheData[key]),
    }

    const cache = new Cache(cacheInterface, 'cache2')

    expect(cache.data).toEqual({ item2: 2 })
    expect(cacheInterface.getItem).toHaveBeenCalledTimes(1)
    expect(cacheInterface.getItem).toHaveBeenCalledWith('cache2')
  })

  it('should load same data without pulling from storage again on subsequent calls', () => {
    const cacheInterface = {
      getItem: jest.fn(() => ({ item1: 1, item2: 2 })),
    }

    const cache = new Cache(cacheInterface)

    expect(cache.data).toEqual({ item1: 1, item2: 2 })
    expect(cacheInterface.getItem).toHaveBeenCalledTimes(1)
    expect(cache.data).toEqual({ item1: 1, item2: 2 })
    expect(cacheInterface.getItem).toHaveBeenCalledTimes(1)
  })
})
