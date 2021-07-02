
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
    return response.json()
  }
}
