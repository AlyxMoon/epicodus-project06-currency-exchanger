
/**
 * Takes a currency type and value and uses exchange rates to convert the value into the desired currency
 *
 * @example
 * // returns 2
 * convertCurrency({ exchangeRates: { USD: 1, EUR: 0.5 }, baseCurrency: 'USD', targetCurrency: 'EUR', amount: 1 })
 * @param {Object} arguments - input arguments for the function
 * @param {Object} arguments.exchangeRates - An object containing a series of key->value pairs where key is a currency
 * @param {string} arguments.baseCurrency - The currency to be converted
 * @param {string} arguments.targetCurrency - The desired currency to be returned
 * @param {number} arguments.amount - The currency value to be converted
 * @returns {number} Returns the currency value after updating the amount based on difference between base and target currency
 */
const convertCurrency = ({
  exchangeRates = {},
  baseCurrency = 'USD',
  targetCurrency = 'USD',
  amount = 0,
} = {}) => {
  if (!amount) return 0
}

export default convertCurrency
