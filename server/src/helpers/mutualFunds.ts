import axios from 'axios'
import redis from './redis'
const startsWith = (str:string, word:string) => {
  return str.lastIndexOf(word, 0) === 0;
}

class MutualFunds{
  baseUrl: string = "https://api.mfapi.in/mf"
  async find(prefix : string) {
    try{
      const response = await axios.request({
        method: 'GET',
        url: this.baseUrl,
        headers: {
          "accept" : "application/json"
        }
      })
      const {data} = response
      console.log(data.length)
      const x = data.filter((d:any) => startsWith(d.schemeName, prefix))
      return x.slice(0,10)
    }catch(e){
      console.log(e)
      throw e
    }
  }
  async getCurrentPrice(symbol : string){
    try{
      const cache = await redis.clientGet(symbol + "." + "MUTUALFUNDS")
      if(cache){
        return {
          symbol ,
          currentPrice : cache
        }
      }
      const response = await axios.request({
        method: 'GET',
        url: `${this.baseUrl}/${symbol}`,
        headers: {
          "accept" : "application/json"
        }
      })
      const {data} = response
      redis.clientSet(symbol + "." + "MUTUALFUNDS",data.data[0].nav)
      return {
        symbol ,
        currentPrice : data.data[0].nav
      }
    }catch(e){
      console.log(e)
      throw e
    }
  }
  async getCurrentPrices(symbols : string[]){
    const apiCalls = symbols.map((s) => this.getCurrentPrice(s))
    try{
      const data = await Promise.all(apiCalls)
      return data
    }catch(e){
      console.log(e)
      throw e
    }
  }
}

const mutualFund = new MutualFunds()
export default mutualFund