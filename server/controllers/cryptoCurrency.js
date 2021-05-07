const axios = require('axios')

const getCoinsBySymbols =async(symbols) => {
  const url = `https://api.coingecko.com/api/v3/coins/list?include_platform=false`

  const options = {
    method: 'GET',
    url,
    headers: {
      'accept': "application/json"
    } 
  };

  try{
    const response = await axios.request(options)
    const {data} = response
    const coins = symbols.map((s) => data.find((c) => c.symbol.toLowerCase() === s.toLowerCase()))
    return coins
  }catch(e){
    console.log(e)
    throw e
  }
}

// also pass a ticker to get the current price
const getCurrentPrices = async (symbols) => {
  const coins = await getCoinsBySymbols(symbols)
  const ids_array = coins.map((c) => c.id)
  const ids = ids_array.join(',')
 
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=inr,usd`

  const options = {
    method: 'GET',
    url,
    headers: {
      'accept': "application/json"
    } 
  };

  try{
    const response = await axios.request(options)
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

module.exports = {
  getCurrentPrices
}