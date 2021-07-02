import Bank from '@/lib/Bank.class.js'

describe('class Bank', () => {
  it('begins with default data initalized', () => {
    const bank = new Bank()

    expect(bank).toEqual({
      balance: 0,
      currencyType: 'USD',
      exchangeRates: {},
      activity: [],
    })
  })

  it('allows setting default properties', () => {
    const bank = new Bank({
      balance: 10,
      currencyType: 'ASD',
      exchangeRates: { USD: 1, EUR: 0.8 },
      activity: ['something happened yesterday'],
    })

    expect(bank).toEqual({
      balance: 10,
      currencyType: 'ASD',
      exchangeRates: { USD: 1, EUR: 0.8 },
      activity: ['something happened yesterday'],
    })
  })
})
