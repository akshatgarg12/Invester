import { Currency } from "./util/currency"

const SERVER_DEV_URL = "http://localhost:8080"
const SERVER_PROD_URL = "https://invester-api.herokuapp.com"
export const SERVER_URL = process.env.NODE_ENV === "development" ? SERVER_DEV_URL : SERVER_PROD_URL
export const getCurrentStocksPriceURL = SERVER_URL + '/stocks'
export const getCurrentCryptoPriceURL = SERVER_URL + '/crypto'
export const getCurrentMutualFundPriceURL = SERVER_URL + '/mutualFunds'
export const getCurrencyRatesURL = SERVER_URL + '/currency'

export const currencies = [
  {
    value : Currency.INR,
    symbol : "₹"
  },
  {
    value : Currency.USD,
    symbol : "$"
  }
]