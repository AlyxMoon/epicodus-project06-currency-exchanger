
/**
 *  @typedef {Object} ExchangeRateApiResult
 *  @property {string} result - string indicating success or not, typical value is 'success'.
 *  @property {string} documentation - link to the ExchangeRate API documentation.
 *  @property {string} terms_of_use - link to the ExchangeRate API terms of use.
 *  @property {number} time_last_update_unix - When the ExchangeRate API source data was last updated, in seconds since UNIX epoch.
 *  @property {number} time_last_update_utc - When the ExchangeRate API source data was last updated, formatted as an ISO string
 *  @property {number} time_next_update_unix - When the ExchangeRate API source data will be updated next, in seconds since UNIX epoch.
 *  @property {number} time_next_update_utc - When the ExchangeRate API source data  will be updated next, formatted as an ISO string
 *  @property {string} base_code - The currency being checked against, this is determined by the input to the API
 *  @property {Object} conversion_rates - A object of all currencies and their relative value vs the base_code currency. The key is currency and the value is their exchange rate. Example { USD: 1, EUR: 0.8416 }
 */

/**
 *  Class used as a utility for communicating with the ExchangeRate API.
 */
export default class ExchangeRateApi {
  /**
   * Used as a reference to translate an error-type from the ExchangeRate API to a user-friendly message.
   * @static
   */
  static errorTypeMessages = {
    'unsupported-code': 'The currency code used for the API was not a valid one. Please try again with a different currency code.',
    'malformed-request': 'Something about how the API request was assembled was incorrect. This is a code issue, please let me know by opening an issue on the Github Repo linked in the footer.',
    'invalid-key': 'The API key was invalid, this would be caused by an improper setup. Please check that it\'s the correct one given by ExchangeRate and that you put it correctly in the .env file.',
    'inactive-account': 'The API key you used has not been activated yet, you need to confirm your email address with ExchangeRate before you can use it.',
    'quota-reached': 'Wow, this site is way more popular than I expected! The API quota has been reached and will not be refreshed until the 2nd of the next month. Please try again then, or spin up an instance of this project yourself by following the setup instructions in the README (you can find it in the Github repo).',
  }

  /**
   *  Makes a call to the ExchangeRate API and returns the data from it
   *  @static
   *  @param {string} [currency=USD] - What currency to use as the base when comparing currencies. Default is 'USD' if not provided. Uses the standard ISO 4217 three letter currency codes.
   *  @param {string} [apiKey] - Api key used for communicating with the API. By default, will use the API_KEY in the .env file.
   *  @returns {PromiseLike<ExchangeRateApiResult>} The resulting data from the ExchangeRate API, resolved as a promise
   */
  static async getApiData (currency = 'USD', apiKey = process.env.API_KEY) {
    const url = 'https://v6.exchangerate-api.com/v6'
    const endpoint = 'latest'

    const response = await fetch(`${url}/${apiKey}/${endpoint}/${currency}`)

    if (!response.ok) {
      throw new Error('Could not reach the API. Please try again later.')
    }

    const data = await response.json()

    if (data.result === 'error') {
      const error = new Error('test error')
      error.apiErrorType = data['error-type']
      error.apiErrorMessage = this.errorTypeMessages[data['error-type']]
      throw error
    }

    return data
  }
}
