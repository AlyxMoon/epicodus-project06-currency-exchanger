import 'purecss/build/pure-min.css'
import '@/styles/main.scss'
import 'regenerator-runtime'

import Cache from '@/api/cache'
import ExchangeRate from '@/api/exchangeRate'

import convertCurrency from '@/lib/convertCurrency'
import dateHasPassed from '@/lib/dateHasPassed'

const populateSelectOptions = (apiData) => {
  const elBaseCurrency = document.querySelector('#input-baseCurrency')
  const elTargetCurrency = document.querySelector('#input-targetCurrency')

  const createOptionElement = (currency) => {
    const option = document.createElement('option')
    option.innerText = currency
    option.value = currency
    return option
  }

  for (const currency in apiData.conversion_rates) {
    elBaseCurrency.add(createOptionElement(currency))
    elTargetCurrency.add(createOptionElement(currency))
  }
}

const addEventListeners = (apiData) => {
  document.querySelector('.input-area form')
    .addEventListener('submit', (event) => {
      event.preventDefault()

      const amount = document.querySelector('#input-amount').value
      const baseCurrency = document.querySelector('#input-baseCurrency').value
      const targetCurrency = document.querySelector('#input-targetCurrency').value

      const converted = convertCurrency({
        exchangeRates: apiData.conversion_rates,
        amount: parseInt(amount) || 0,
        baseCurrency,
        targetCurrency,
      })

      const elOutput = document.querySelector('#output-converted')

      elOutput.innerText = `${amount} in ${baseCurrency} becomes ${converted.toFixed(2)} in ${targetCurrency}.`
    })
}

const shouldCallApi = (cache) => {
  return (
    !cache.data.time_next_update_utc ||
    dateHasPassed(new Date(cache.data.time_next_update_utc))
  )
}

const main = async () => {
  const cache = new Cache()

  if (shouldCallApi(cache)) {
    try {
      cache.data = await ExchangeRate.getApiData()
    } catch (error) {
      console.log(error)
      // TODO: do something with error here
    }
  }

  populateSelectOptions(cache.data)
  addEventListeners(cache.data)
}

main()
