import {Request, Response} from 'express'
import Stocks from '../helpers/stocks'

class StocksController{
  async getPrices(req:Request, res:Response){
    try{
      const {symbols} = req.body
      const prices = await Stocks.getCurrentPrices(symbols)
      res.send(prices)
    }catch(e){
      console.log(e)
      res.status(500).json({error:e})
    }
  }
}

const mutualFundController = new StocksController()
export default mutualFundController