import {Request, Response} from 'express'
import MutualFunds from '../helpers/mutualFunds'

class MutualFundController{
  async getPrices(req:Request, res:Response){
    try{
      const {symbols} = req.body
      const prices = await MutualFunds.getCurrentPrices(symbols)
      res.send(prices)
    }catch(e){
      console.log(e)
      res.status(500).json({error:e})
    }
  }
  async find(req:Request, res:Response){
    try{
      const {prefix} = req.body
      const result = await MutualFunds.find(prefix)
      res.send(result)
    }catch(e){
      console.log(e)
      res.status(500).json({error:e})
    }
  }
}

const mutualFundController = new MutualFundController()
export default mutualFundController