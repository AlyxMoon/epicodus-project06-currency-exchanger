import ExchangeRateApi from '@/api/exchangeRate'

describe('class ExchangeRateApi', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ result: 'success' }),
  }))

  beforeEach(() => fetch.mockClear())

  it('getApiData(): should try to call fetch with the correct inputs', async () => {
    const result = await ExchangeRateApi.getApiData('EUR', '123456')

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('https://v6.exchangerate-api.com/v6/123456/latest/EUR')
    expect(result).toEqual({ result: 'success' })
  })

  it('getApiData(): should try to call fetch with the correct default values', async () => {
    global.process.env = { API_KEY: 42 }
    const result = await ExchangeRateApi.getApiData()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('https://v6.exchangerate-api.com/v6/42/latest/USD')
    expect(result).toEqual({ result: 'success' })
  })

  it('getApiData(): should throw an error if the server did not give an ok response', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ result: 'error' }),
    }))

    await expect(ExchangeRateApi.getApiData()).rejects.toBeTruthy()
  })

  it('getApiData(): should throw an error if the server responded with an error result and include the api error type', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        result: 'error',
        'error-type': 'invalid-key',
      }),
    }))

    await expect(ExchangeRateApi.getApiData()).rejects.toHaveProperty('apiErrorType', 'invalid-key')
  })
})
