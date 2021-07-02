import 'purecss/build/pure-min.css'
import '@/styles/main.scss'
import 'regenerator-runtime'

import exchangeRate from '@/api/exchangeRate'
import convertCurrency from '@/lib/convertCurrency'

const main = async () => {
  const something = await exchangeRate.getApiData()

  console.log(something)
  console.log(convertCurrency())
}

main()
