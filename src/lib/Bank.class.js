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

    const timestamp = (new Date()).toUTCString()
    this.activity.push(`${timestamp} | You added ${amount} ${type} to your account`)
  }

  setCurrencyType (type) {
    const current = this.currencyType

    this.balance = convertCurrency({
      exchangeRates: this.exchangeRates,
      baseCurrency: current,
      targetCurrency: type,
      amount: this.balance,
    })
    this.currencyType = type

    const timestamp = (new Date()).toUTCString()
    this.activity.push(`${timestamp} | You updated your currency type from ${current} to ${type}`)
  }
}
