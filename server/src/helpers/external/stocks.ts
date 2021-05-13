import axios from 'axios'
import {config} from 'dotenv'
config()
enum Market{
  NSE = "NSE",
  NASDAQ = "NASDAQ"
}
interface StockInfoType{
  symbol : string,
  market : Market
}
const findWithAttr = (array:Array<StockInfoType>,value:any) => {
  for(var i = 0; i < array.length; i += 1) {
      if(array[i]["symbol"] === value.symbol && array[i]["market"] === value.market) {
          return i;
      }
  }
  return -1;
}
class Stock{
  baseUrlNASDAQ:string = "https://realstonks.p.rapidapi.com"
  baseUrlNSE : string = "https://latest-stock-price.p.rapidapi.com/any"

  async getPriceFromNASDAQ({symbol, market} : StockInfoType){
     // check the stock broker and call that api.
     const url = `${this.baseUrlNASDAQ}/${symbol}`
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
         market,
         currentPrice : d.price
       }
     }catch(e){
       console.log(e)
       throw e
     }
  }
  async getPriceFromNSE(symbols:Array<StockInfoType>){
    const url = this.baseUrlNSE
     try{
       const identifiers = symbols.map((s) => (s.symbol.toLocaleUpperCase() + "EQN")).join(',')
       const response = await axios.request({
         method: 'GET',
         url,
         headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "latest-stock-price.p.rapidapi.com",
          "useQueryString": true
        },
        // get the identifier first
        params : {
          "Identifier": identifiers
        }
       })
       const {data} = response
      //  const d = JSON.parse(data)
       return data.map((s:any) => {
         const {symbol , lastPrice } = s;
          return {
            symbol,
            market : Market.NSE,
            currentPrice : lastPrice
          }
       })
     }catch(e){
       console.log(e)
       throw e
     }
  }
  
  async getCurrentPrices(symbols:Array<StockInfoType>){
    console.log(symbols)
    let apiCalls:Array<Promise<any>> = []
    const NASDAQstocks = symbols.filter((s) => s.market === Market.NASDAQ)
    const NSEstocks = symbols.filter((s) => s.market === Market.NSE)
    if(NASDAQstocks.length){
      apiCalls = NASDAQstocks.map((s) => this.getPriceFromNASDAQ(s))
    }
    if(NSEstocks.length) {
      apiCalls.push(this.getPriceFromNSE(NSEstocks))
    }
    try{
      const data = await Promise.all(apiCalls)
      let NASDAQprices = data.slice(0,NASDAQstocks.length)
      let NSEprices = data.slice(NASDAQstocks.length)[0]
      const prices =  [...NSEprices, ...NASDAQprices]
      console.log(prices)
      return prices.sort(function(a, b){  
        return findWithAttr(symbols, a) - findWithAttr(symbols, b)
      });
    }catch(e){
      console.log(e)
      throw e
    }
  }
}

const stocks =  new Stock()
export default stocks