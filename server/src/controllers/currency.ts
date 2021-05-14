import {Request, Response} from 'express'
import Currency from '../helpers/currency'

class CurrencyController{
  async getRates(req:Request, res:Response){
    try{
      const {
        to, from
      } : any = req.query
      const rate= await Currency.rate(from, to)
      res.status(200).send({rate})
    }catch(e){
      console.log(e)
      res.status(500).json({error:e})
    }
  }
}

const cryptoController = new CurrencyController()
export default cryptoController