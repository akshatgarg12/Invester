import {Request, Response} from 'express'
import Crypto from '../helpers/crypto'

class CryptoController{
  async getPrices(req:Request, res:Response){
    try{
      const {symbols} = req.body
      const prices = await Crypto.getCurrentPrices(symbols)
      res.send(prices)
    }catch(e){
      console.log(e)
      res.status(500).json({error:e})
    }
  }
  async find(req:Request, res:Response){
    try{
      const {q}:any = req.query
      const suggestions = await Crypto.find(q)
      res.send(suggestions)
    }catch(e){
      console.log(e)
      res.status(500).json({error:e})
    }
  }
}

const cryptoController = new CryptoController()
export default cryptoController