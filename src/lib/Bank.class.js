
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
}
