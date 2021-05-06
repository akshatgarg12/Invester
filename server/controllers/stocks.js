const axios = require('axios')

const getCurrentPrice = async (symbol) => {
  const options = {
    method: 'GET',
    url: `https://realstonks.p.rapidapi.com/${symbol}`,
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'realstonks.p.rapidapi.com'
    } 
  };
  try{
    const response = await axios.request(options)
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

const getCurrentPrices = async (symbols) => {
  const apiCalls = symbols.map((s) => getCurrentPrice(s))
  try{
    const data = await Promise.all(apiCalls)
    console.log(data)
    return data
  }catch(e){
    console.log(e)
    throw e
  }
}

module.exports = {
  getCurrentPrices
}