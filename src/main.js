import 'purecss/build/pure-min.css'
import '@/styles/main.scss'
import 'regenerator-runtime'

import exchangeRate from './api/exchangeRate'

const main = async () => {
  const something = await exchangeRate.getApiData()
  console.log(something)
}

main()
