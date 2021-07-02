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
})
