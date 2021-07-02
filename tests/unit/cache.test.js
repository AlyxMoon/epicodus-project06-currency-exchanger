import Cache from '@/api/cache'

describe('class Cache', () => {
  it('should begin with an empty object when there is no current cache', () => {
    const cacheInterface = {
      getItem: jest.fn(() => null),
    }

    const cache = new Cache(cacheInterface, 'test-cache')

    expect(cacheInterface.getItem).toHaveBeenCalledTimes(1)
    expect(cacheInterface.getItem).toHaveBeenCalledWith('test-cache')
    expect(cache.data).toEqual({})
  })

  it('should load data from cache when it exists', () => {
    const cacheInterface = {
      getItem: jest.fn(() => ({ item1: 1, item2: 2 })),
    }

    const cache = new Cache(cacheInterface, 'test-cache')

    expect(cacheInterface.getItem).toHaveBeenCalledTimes(1)
    expect(cacheInterface.getItem).toHaveBeenCalledWith('test-cache')
    expect(cache.data).toEqual({ item1: 1, item2: 2 })
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

    expect(cacheInterface.getItem).toHaveBeenCalledTimes(1)
    expect(cacheInterface.getItem).toHaveBeenCalledWith('cache2')
    expect(cache.data).toEqual({ item2: 2 })
  })
})
