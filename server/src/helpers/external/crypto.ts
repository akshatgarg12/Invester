import axios from 'axios'

class Crypto {
  baseUrl : string = "https://api.coingecko.com/api/v3"
  coinListUrl : string = `${this.baseUrl}/coins/list?include_platform=false`

  async getCoinsBySymbol(symbols : string[]){
    const url = this.coinListUrl
    try{
      const response = await axios.request({
        method:"GET",
        url,
        headers: {
          'accept': "application/json"
        }
      })
      const {data} = response
      const coins = symbols.map((s) => data.find((c:any) => c.symbol.toLowerCase() === s.toLowerCase()))
      return coins
    }catch(e){
      console.log(e)
      throw e
    }
  }
  async getCurrentPrices(symbols : string[]){
    const coins = await this.getCoinsBySymbol(symbols)
    const idsArray = coins.map((c) => c.id)
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
      const d = coins.map((c, index) => {
        return {
        symbol : c.symbol,
        currentPrice : data[c.id].inr
      }
    })
      return d
    }catch(e){
      console.log(e)
      throw e
    }
  }
}

const crypto = new Crypto()
export default crypto