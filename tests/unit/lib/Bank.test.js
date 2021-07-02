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

  describe('function addBalance()', () => {
    let bank

    beforeEach(() => {
      bank = new Bank({
        balance: 0,
        currencyType: 'USD',
        exchangeRates: { USD: 1, EUR: 0.8, MXP: 20 },
      })
    })

    it('should add to the balance when only amount is provided', () => {
      bank.addBalance(50)
      expect(bank.balance).toEqual(50)
      bank.addBalance(100)
      expect(bank.balance).toEqual(150)
    })

    it('should add to the balance and account for currency conversion when only amount is provided', () => {
      bank.addBalance(4, 'EUR')
      expect(bank.balance).toEqual(5)
      bank.addBalance(20, 'MXP')
      expect(bank.balance).toEqual(6)
    })

    it('should add an entry to the activity', () => {
      bank.addBalance(50)
      expect(bank.activity.length).toEqual(1)
      bank.addBalance(100, 'EUR')
      expect(bank.activity.length).toEqual(2)
    })
  })

  describe('function setCurrencyType()', () => {
    let bank

    beforeEach(() => {
      bank = new Bank({
        balance: 10,
        currencyType: 'USD',
        exchangeRates: { USD: 1, EUR: 0.8, MXP: 20 },
      })
    })

    it('should update the currencyType and convert the balance', () => {
      bank.setCurrencyType('EUR')
      expect(bank.currencyType).toEqual('EUR')
      expect(bank.balance).toEqual(8)
    })

    it('should add an entry to the activity log', () => {
      bank.setCurrencyType('EUR')
      expect(bank.activity.length).toEqual(1)
    })
  })
})
