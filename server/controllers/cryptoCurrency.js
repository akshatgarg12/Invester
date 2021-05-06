const axios = require('axios')
const coinsDatabase = require('../database/coins.json')

const getCoinsBySymbols = (symbols) => {
  const coins = symbols.map((s) => coinsDatabase.find((c) => c.symbol === s))
  return coins
}

const getCurrentPrices = async (symbols) => {
  const coins = getCoinsBySymbols(symbols)
  const ids_array = coins.map((c) => c.id)
  const ids = ids_array.join(',')
 
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=inr`

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
      currentPrice : data[c.id]
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