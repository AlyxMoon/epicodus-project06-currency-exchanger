import convertCurrency from '@/lib/convertCurrency'

describe('function convertCurrency()', () => {
  const exchangeRates = {
    USD: 1,
    EUR: 0.8416,
    MXN: 19.9907,
    KES: 107.7367,
  }

  it('should return 0 if amount is 0 or not provided', () => {
    expect(convertCurrency()).toEqual(0)
    expect(convertCurrency({ amount: 0 })).toEqual(0)
  })

  it('should throw an error if baseCurrency or targetCurrency is not in the exchangeRates arg', () => {
    expect(() => {
      convertCurrency({
        exchangeRates,
        baseCurrency: 'HKD',
        targetCurrency: 'MXN',
        amount: 1,
      })
    }).toThrow() // base currency not in it

    expect(() => {
      convertCurrency({
        exchangeRates,
        baseCurrency: 'USD',
        targetCurrency: 'JOD',
        amount: 1,
      })
    }).toThrow() // target currency not in it

    expect(() => {
      convertCurrency({
        exchangeRates,
        baseCurrency: 'GIP',
        targetCurrency: 'RUB',
        amount: 1,
      })
    }).toThrow() // neither currency in it
  })

  it('should correctly convert a currency from USD', () => {
    expect(convertCurrency({
      exchangeRates,
      baseCurrency: 'USD',
      targetCurrency: 'EUR',
      amount: 10,
    })).toBeCloseTo(8.416, 4)

    expect(convertCurrency({
      exchangeRates,
      baseCurrency: 'USD',
      targetCurrency: 'KES',
      amount: 10,
    })).toBeCloseTo(1077.3670, 4)
  })
})
