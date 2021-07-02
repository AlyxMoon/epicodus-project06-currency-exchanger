import Cache from '@/api/cache'

describe('class Cache', () => {
  it('should begin with an empty object when there is no current cache', () => {
    global.localStorage = jest.fn(() => ({
      getItem: jest.fn(() => null),
    }))

    const cache = new Cache()

    expect(localStorage.getItem).toHaveBeenCalledTimes(1)
    expect(localStorage.getItem).toHaveBeenCalledWith('cache')
    expect(cache.data).toEqual({})
  })
})
