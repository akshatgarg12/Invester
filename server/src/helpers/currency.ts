import axios from 'axios'
import redis from './redis'

// to and from are expected to be INR and USD 
class Currency {
  async rate(from : string, to : string){
    try{
      const cachedResult:any = await redis.clientGet("Rates.Currency")
      if(cachedResult){
        let r = JSON.parse(cachedResult)
        return (r[to]/r[from])
      }
      const url = 
      `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_ACCESS_KEY}&symbols=${from},${to}`
      // cache this result for 3 hours 
      const response = await axios.get(url)
      const {data} = response
      const {rates} = data
      const fiveHoursInSecs =  5*60*60
      await redis.clientSet("Rates.Currency", JSON.stringify(rates), fiveHoursInSecs)
      return (rates[to]/rates[from])
    }
    catch(e){
      console.log(e)
      throw e
    }
  }
}

const currency = new Currency()
export default currency