import axios from 'axios'
import { getCurrencyRatesURL } from '../../constant';

export enum Currency{
  INR = "INR",
  USD = "USD"
}

export const currencyRates = async (from : Currency, to : Currency) => {
  try{
    const url = getCurrencyRatesURL
    const response = await axios.get(url, {
      params : {
        to,
        from
      }
    });
    return response.data.rate
  }catch(e){
    console.log(e)
    throw e
  }
  
}


