import convertCurrency from '@/lib/convertCurrency'

describe('function convertCurrency()', () => {
  it('should return 0 if amount is 0 or not provided', () => {
    expect(convertCurrency()).toEqual(0)
    expect(convertCurrency({ amount: 0 })).toEqual(0)
  })

  it('should throw an error if baseCurrency or targetCurrency is not in the exchangeRates arg', () => {
    expect(() => {
      convertCurrency({
        exchangeRates: { USD: 1, MXN: 1 },
        baseCurrency: 'EUR',
        targetCurrency: 'MXN',
        amount: 1,
      })
    }).toThrow() // base currency not in it

    expect(() => {
      convertCurrency({
        exchangeRates: { USD: 1, MXN: 1 },
        baseCurrency: 'USD',
        targetCurrency: 'EUR',
        amount: 1,
      })
    }).toThrow() // target currency not in it

    expect(() => {
      convertCurrency({
        exchangeRates: { USD: 1, MXN: 1 },
        baseCurrency: 'EUR',
        targetCurrency: 'RUB',
        amount: 1,
      })
    }).toThrow() // neither currency in it
  })
})
