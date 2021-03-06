import axios from 'axios'
import Fuse from 'fuse.js'

import { asyncForEach } from '../constants'
import redis from './redis'
const findWithAttr = (array:string[],value:any) => {
  for(let i = 0; i < array.length; i += 1) {
      if(array[i].toUpperCase() === value.symbol.toUpperCase()) {
          return i;
      }
  }
  return -1;
}
class Crypto {
  baseUrl : string = "https://api.coingecko.com/api/v3"
  coinListUrl : string = `${this.baseUrl}/coins/list?include_platform=false`

  async getCoinsBySymbol(symbols : string[]){
    const url = this.coinListUrl
    try{
    const cache:any = await redis.clientGet("CoinList" + "." + "CRYPTO")
    let data:any[] = []
    if(cache){
      data = JSON.parse(cache)
    }else{
        const response = await axios.request({
          method:"GET",
          url,
          headers: {
            'accept': "application/json"
          }
        })
        data = response.data
        const eightHoursInSecs = 18*60*60
        await redis.clientSet("CoinList" + "." + "CRYPTO", JSON.stringify(data),eightHoursInSecs )
      }
    const coins = symbols.map((s) => data.find((c:any) => c.symbol.toLowerCase() === s.toLowerCase()))
    return coins
    }
    catch(e){
      console.log(e)
      throw e
    }
  }
  async getCurrentPrices(symbols : string[]){
    console.log(symbols)
    const coins = await this.getCoinsBySymbol(symbols)
    const idsArray:string[] = []
    const cachedData:any[] = []
    const newData:any[] = []
    const remainingCoins :any[] = []
    const callback = async (c:any) => {
      try{
        const cache = await redis.clientGet(c.id + "." + "CRYPTO")
        if(cache){
          console.log(c.id)
          cachedData.push({
            symbol : c.symbol,
            currentPrice :cache
          })
        }else{
          remainingCoins.push(c)
          idsArray.push(c.id)
        }
      }
      catch(e){
        remainingCoins.push(c)
        idsArray.push(c.id)
        console.log(e)
      }
    }
    await asyncForEach(coins,callback)
    try{
    if(idsArray.length){
        const ids = idsArray.join(',')
        const url = `${this.baseUrl}/simple/price?ids=${ids}&vs_currencies=inr,usd`

        const response = await axios.request({
          method: 'GET',
          url,
          headers: {
            'accept': "application/json"
          }
        })
        const {data} = response
        const fn = async (c:any) => {
          if(data[c.id].inr){
            redis.clientSet(c.id + "." + "CRYPTO", data[c.id].inr);
            newData.push({
              symbol : c.symbol,
              currentPrice : data[c.id]?.inr
            })
          }
        }
        await asyncForEach(remainingCoins, fn)
      }
      const finalData:any[] = [...cachedData, ...newData]
      finalData.sort(function(a, b){
        return findWithAttr(symbols, a) - findWithAttr(symbols, b)
      });
      console.log(finalData)
      return finalData
    }catch(e){
      console.log(e)
      throw e
    }
   }
  async find(prefix : string){
    try{
      const url = this.coinListUrl
      const cache:any = await redis.clientGet("CoinList" + "." + "CRYPTO")
      let data:any[] = []
      if(cache){
        data = JSON.parse(cache)
      }else{
          const response = await axios.request({
            method:"GET",
            url,
            headers: {
              'accept': "application/json"
            }
          })
          data = response.data
          const eightHoursInSecs = 18*60*60
          await redis.clientSet("CoinList" + "." + "CRYPTO", JSON.stringify(data),eightHoursInSecs )
      }
      // match with prefix
      const options = {
        includeScore: false,
        // Search in `author` and in `tags` array
        keys: ['symbol', 'name']
      }
      const fuse = new Fuse(data, options)
      const result = fuse.search(prefix)
      const suggestions = result.map((r) => r.item)
      return suggestions.slice(0,15);
    }catch(e){
      throw e;
    }
  }
}

const crypto = new Crypto()
export default crypto