import 'purecss/build/pure-min.css'
import '@/styles/main.scss'
import 'regenerator-runtime'

import Cache from '@/api/cache'
import ExchangeRate from '@/api/exchangeRate'

import Bank from '@/lib/Bank.class'
import convertCurrency from '@/lib/convertCurrency'
import dateHasPassed from '@/lib/dateHasPassed'

const populateSelectOptions = (apiData) => {
  const elBaseCurrency = document.querySelector('#input-baseCurrency')
  const elTargetCurrency = document.querySelector('#input-targetCurrency')
  const elBankCurrency = document.querySelector('#input-bankCurrency')

  const createOptionElement = (currency) => {
    const option = document.createElement('option')
    option.innerText = currency
    option.value = currency
    return option
  }

  for (const currency in apiData.conversion_rates) {
    elBaseCurrency.add(createOptionElement(currency))
    elTargetCurrency.add(createOptionElement(currency))
    elBankCurrency.add(createOptionElement(currency))
  }
}

const addEventListeners = (apiData, bank) => {
  document.querySelector('button[data-action="convert"]')
    .addEventListener('click', () => {
      const amount = document.querySelector('#input-amount').value
      const baseCurrency = document.querySelector('#input-baseCurrency').value
      const targetCurrency = document.querySelector('#input-targetCurrency').value

      const elOutput = document.querySelector('#output-converted')
      const elAlertBox = document.querySelector('.error-box')

      elAlertBox.classList.add('hide')

      try {
        const converted = convertCurrency({
          exchangeRates: apiData.conversion_rates,
          amount: parseInt(amount) || 0,
          baseCurrency,
          targetCurrency,
        })

        elOutput.innerText = `${amount} in ${baseCurrency} becomes ${converted.toFixed(2)} in ${targetCurrency}.`
      } catch (error) {
        elAlertBox.innerText = error.message
        elAlertBox.classList.remove('hide')
      }
    })

  document.querySelector('button[data-action="deposit"]')
    .addEventListener('click', () => {
      const amount = document.querySelector('#input-amount').value
      const baseCurrency = document.querySelector('#input-baseCurrency').value

      const elBalanceOutput = document.querySelector('#output-bank-balance')
      const elBalanceTable = document.querySelector('table tbody')
      const elAlertBox = document.querySelector('.error-box')

      elAlertBox.classList.add('hide')

      try {
        bank.addBalance(parseInt(amount) || 0, baseCurrency)

        elBalanceOutput.innerText = bank.balance.toFixed(2)

        const latestActivity = document
          .createElement('tr')
          .appendChild(document.createElement('td'))

        latestActivity.innerText = bank.activity[bank.activity.length - 1]
        elBalanceTable.prepend(latestActivity.parentElement)
      } catch (error) {
        elAlertBox.innerText = error.message
        elAlertBox.classList.remove('hide')
      }
    })

  document.querySelector('#input-bankCurrency')
    .addEventListener('change', (event) => {
      const nextCurrency = event.target.value

      const elBalanceOutput = document.querySelector('#output-bank-balance')
      const elBalanceTable = document.querySelector('table tbody')
      const elAlertBox = document.querySelector('.error-box')

      try {
        bank.setCurrencyType(nextCurrency)

        elBalanceOutput.innerText = bank.balance.toFixed(2)

        const latestActivity = document
          .createElement('tr')
          .appendChild(document.createElement('td'))

        latestActivity.innerText = bank.activity[bank.activity.length - 1]
        elBalanceTable.prepend(latestActivity.parentElement)
      } catch (error) {
        elAlertBox.innerText = error.message
        elAlertBox.classList.remove('hide')
      }
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
      const data = await ExchangeRate.getApiData()
      cache.data = data
    } catch (error) {
      const elAlertBox = document.querySelector('.error-box')

      elAlertBox.innerText = error.apiErrorType
        ? error.apiErrorMessage
        : error.message

      elAlertBox.classList.remove('hide')
    }
  }

  const bank = new Bank({
    exchangeRates: cache.data.conversion_rates || {},
  })

  populateSelectOptions(cache.data)
  addEventListeners(cache.data, bank)
}

main()
