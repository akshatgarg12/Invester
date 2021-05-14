import {asyncForEach} from '../custom'
import {database} from '../../config/firebase'
import {getCurrentPrice} from '../current'
import {InvestmentData} from '../../components/Investments'
import firebase from 'firebase/app'
import { Currency } from '../currency'


export enum InvestmentType{
  STOCKS = "stocks",
  CRYPTO = "cryptoCurrencies",
  MUTUALFUNDS = "mutualFunds"
}

export interface InvestmentDetails{
  name : string
  symbol : string
  averageBuyPrice : number
  units : number
  market ?: string 
  shop ?: string
  currency ?: Currency
}
export class Investment{
  
  async get(ids:Array<string>, investmentType:InvestmentType){
    try{
      if(ids.length === 0) return []
      let investmentData:any = []
      const callback = async (id:string) => {
        const d = await database.collection(investmentType).doc(id).get()
        const data = d.data()
        investmentData.push({...data})
      }
      await asyncForEach(ids,callback)
      // after getting data from firebase, call server for current data
      let symbols : Array<any> = []
      if(investmentType === InvestmentType.STOCKS){
        symbols = investmentData.map((i:any) => {
          const {symbol, market} = i;
          return  {
            symbol, market
          }
        })
      }else{
        symbols = investmentData.map((i:any) => i.symbol)
      }
        const updatedData = await getCurrentPrice(symbols, investmentType)
        investmentData = investmentData.map((d:any, i:number) => {
          let currentPrice = updatedData[i].currentPrice
          return ({...d, currentPrice, id:ids[i]})
        })
        // console.log(investmentData)
        return investmentData
      
    }catch(e){
      console.log(e)
      throw e
    } 
  }
  async getAll(stocks:Array<string>, cryptoCurrencies:Array<string>, mutualFunds:Array<string>){
    try{
      const s = this.get(stocks, InvestmentType.STOCKS,)
      const c = this.get(cryptoCurrencies, InvestmentType.CRYPTO)
      const m = this.get(mutualFunds, InvestmentType.MUTUALFUNDS)
      const d = await Promise.all([s,c,m])

      const x:InvestmentData = {
        stocks : d[0].reverse(),
        cryptoCurrencies : d[1].reverse(),
        mutualFunds : d[2].reverse()
      } 
      return x
    }catch(e){
      console.log(e)
      throw e
    }
    
  }
  async delete(id : string, portfolioId : string, investmentType:InvestmentType){
    try{
      const document = database.collection(investmentType).doc(id)
      await document.delete()
      console.log(document)
      const portfolioUpdate = await database.collection('portfolios').doc(portfolioId).update({
        [investmentType] : firebase.firestore.FieldValue.arrayRemove(document)
      })
      console.log(portfolioUpdate)
      return document.id
    }catch(e){
      console.log(e)
    }
  }
  async create(details:InvestmentDetails, investmentType:InvestmentType, portfolioId:string){
    try{
      const document = await database.collection(investmentType).add(details)
      console.log(document)
      // document.id
      const portfolioUpdate = await database.collection('portfolios').doc(portfolioId).update({
        [investmentType] : firebase.firestore.FieldValue.arrayUnion(document)
      })
      console.log(portfolioUpdate)
      return document.id
    }catch(e){
      console.log(e)
    }
  }
  async update(){
    console.log("update an investment")
  }
}
