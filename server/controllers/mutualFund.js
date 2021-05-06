const axios = require('axios')

function startsWith(str, word) {
  return str.lastIndexOf(word, 0) === 0;
}

const findMutualFund = async (prefix) => {
  const options = {
    method: 'GET',
    url: `https://api.mfapi.in/mf`,
    headers: {
      "accept" : "application/json"
    } 
  };
  try{
    const response = await axios.request(options)
    const {data} = response
    console.log(data.length)
    const x = data.filter((d) => startsWith(d.schemeName, prefix))
    return x.slice(0,10)
  }catch(e){
    console.log(e)
    throw e
  }
}

const getCurrentPrice = async (symbol) => {
  const options = {
    method: 'GET',
    url: `https://api.mfapi.in/mf/${symbol}`,
    headers: {
      "accept" : "application/json"
    } 
  };
  try{
    const response = await axios.request(options)
    const {data} = response
    return data
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
  getCurrentPrices,
  findMutualFund
}