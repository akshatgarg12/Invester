import axios from 'axios'
import {config} from 'dotenv'
config()

class Stock{
  baseUrl:string = "https://realstonks.p.rapidapi.com"

  async getCurrentPrice(symbol:string){
    // check the stock broker and call that api.
    const url = `${this.baseUrl}/${symbol}`
    try{
      const response = await axios.request({
        method: 'GET',
        url,
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'realstonks.p.rapidapi.com'
        }
      })
      const {data} = response
      const d = JSON.parse(data)
      return {
        symbol,
        currentPrice : d.price
      }
    }catch(e){
      console.log(e)
      throw e
    }
  }
  async getCurrentPrices(symbols:string[]){
    const apiCalls = symbols.map((s:string) => this.getCurrentPrice(s.toUpperCase()))
    try{
      const data = await Promise.all(apiCalls)
      return data
    }catch(e){
      console.log(e)
      throw e
    }
  }
}

const stocks =  new Stock()
export default stocks