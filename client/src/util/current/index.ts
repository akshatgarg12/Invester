import axios from 'axios'
import {getCurrentStocksPriceURL, getCurrentMutualFundPriceURL, getCurrentCryptoPriceURL
} from '../../constant'
import { InvestmentType } from '../investment'

export const InvestmentURLs = {
  "stocks" : getCurrentStocksPriceURL,
  "cryptoCurrencies" : getCurrentCryptoPriceURL,
  "mutualFunds" : getCurrentMutualFundPriceURL
}


export const getCurrentPrice = async (symbols:Array<string>, type : InvestmentType) => {
  // console.log("runnnign")
  const url = InvestmentURLs[type]
  const response = await axios(url, {
    method:"POST",
    data : {symbols},
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  console.log(response.data)
  return response.data;
 
}