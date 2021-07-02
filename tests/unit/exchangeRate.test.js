import ExchangeRateApi from '@/api/exchangeRate'

describe('class ExchangeRateApi', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ result: 'success' }),
  }))

  beforeEach(() => fetch.mockClear())

  it('getApiData(): should try to call fetch with the correct inputs', async () => {
    const result = await ExchangeRateApi.getApiData('EUR', '123456')

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('https://v6.exchangerate-api.com/v6/123456/latest/EUR')
    expect(result).toEqual({ result: 'success' })
  })
})
