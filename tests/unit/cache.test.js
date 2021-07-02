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
})
