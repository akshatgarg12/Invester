import axios from 'axios'
import {config} from 'dotenv'
import redis from './redis'
import {asyncForEach} from '../constants'
import e from 'express'

config()
enum Market{
  NSE = "NSE",
  NASDAQ = "NASDAQ"
}
interface StockInfoType{
  symbol : string,
  market : Market
}
const findWithAttr = (array:StockInfoType[],value:any) => {
  for(let i = 0; i < array.length; i += 1) {
      if(array[i].symbol === value.symbol && array[i].market === value.market) {
          return i;
      }
  }
  return -1;
}
class Stock{
  baseUrlNASDAQ:string = "https://realstonks.p.rapidapi.com"
  baseUrlNSE : string = "https://latest-stock-price.p.rapidapi.com/any"

  async getPriceFromNASDAQ({symbol, market} : StockInfoType){
    try{
      const cache = await redis.clientGet(symbol+"."+market)
      if(cache){
        return{
          symbol,
          market,
          currentPrice : cache
        }
      }
    }catch(e){
      // console.log(e)
    }
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

      await redis.clientSet(symbol+"."+market, d.price)
      return {
        symbol,
        market,
        currentPrice : d.price
      }
  }
    catch(e){
    console.log(e)
    throw e
    }
  }
  async getPriceFromNSE(stocks:StockInfoType[]){
    const symbols = stocks.map((s:StockInfoType) => s.symbol.toUpperCase())
    const url = this.baseUrlNSE
     try{
       // check for cache
       const cacheData:any[] = []
       let ctr = 0
       let prices:any[] = []
       const callback = async (s:any) => {
        try{
          const cache = await redis.clientGet(s.symbol+"."+Market.NSE)
          if(cache){
            cacheData.push({
              symbol : s.symbol,
              market : Market.NSE,
              currentPrice: cache
            })
          }else ctr++;
        }catch(e){
          console.log(e)
          ctr++
        }
       }

       await asyncForEach(stocks,callback)

       prices = [...prices, ...cacheData]

       if(ctr){
        const response = await axios.request({
          method: 'GET',
          url,
          headers: {
           "x-rapidapi-key": process.env.RAPID_API_KEY,
           "x-rapidapi-host": "latest-stock-price.p.rapidapi.com",
           "useQueryString": true
         },
        })
        const {data} = response
        // console.log(data)
        const cacheFn = async (s : any) => {
          const {symbol , lastPrice } = s;
          // set the cache
          await redis.clientSet(symbol.toUpperCase() + "." + Market.NSE, lastPrice)
        }
       await asyncForEach(data, cacheFn)
       
       const priceData : any[] = []
       const fn = async (symbol:any) => {
          const cache = await redis.clientGet(symbol+"."+Market.NSE)
          priceData.push({
            symbol,
            market : Market.NSE,
            currentPrice : cache
          })
        }
        await asyncForEach(symbols, fn)
        prices = [...prices, ...priceData]
       }
       return prices
     }catch(e){
       console.log(e)
       throw e
     }
  }

  async getCurrentPrices(symbols:StockInfoType[]){
    console.log(symbols)
    let apiCalls:Promise<any>[] = []
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
      const NASDAQprices = data.slice(0,NASDAQstocks.length)
      const NSEprices = data.slice(NASDAQstocks.length)[0]
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