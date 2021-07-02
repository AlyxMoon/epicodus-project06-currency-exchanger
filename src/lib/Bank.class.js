import convertCurrency from '@/lib/convertCurrency'

export default class Bank {
  constructor ({
    balance = 0,
    currencyType = 'USD',
    exchangeRates = {},
    activity = [],
  } = {}) {
    this.balance = balance
    this.currencyType = currencyType
    this.exchangeRates = exchangeRates
    this.activity = activity
  }

  addBalance (amount, type = 'USD') {
    const converted = type === this.currencyType
      ? amount
      : convertCurrency({
        exchangeRates: this.exchangeRates,
        baseCurrency: type,
        targetCurrency: this.currencyType,
        amount,
      })

    this.balance += converted

    this.activity.push(`You added ${amount} ${type} to your account`)
  }
}
