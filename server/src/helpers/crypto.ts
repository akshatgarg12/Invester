import axios from 'axios'
import { asyncForEach } from '../constants'
import redis from './redis'
const findWithAttr = (array:Array<string>,value:any) => {
  for(var i = 0; i < array.length; i += 1) {
      if(array[i] === value.symbol) {
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
    let data:Array<any> = []
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
        redis.clientSet("CoinList" + "." + "CRYPTO", JSON.stringify(data))
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
    const idsArray:Array<string> = []
    let cachedData:Array<any> = []
    let newData:Array<any> = []
    const remainingCoins :Array<any> = []
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
    if(idsArray.length){
      const ids = idsArray.join(',')
      const url = `${this.baseUrl}/simple/price?ids=${ids}&vs_currencies=inr,usd`
      try{
        const response = await axios.request({
          method: 'GET',
          url,
          headers: {
            'accept': "application/json"
          }
        })
        const {data} = response
        newData = remainingCoins.map((c, index) => {
          if(data[c.id].inr){
            redis.clientSet(c.id + "." + "CRYPTO", data[c.id].inr);
            return {
              symbol : c.symbol,
              currentPrice : data[c.id]?.inr
           } 
          }    
      })    
      }catch(e){
        console.log(e)
        throw e
      }
    }
    let finalData:Array<any> = [...cachedData, ...newData]
    console.log(finalData)
    return finalData.sort(function(a, b){  
      return findWithAttr(symbols, a) - findWithAttr(symbols, b)
    });
  }
}

const crypto = new Crypto()
export default crypto