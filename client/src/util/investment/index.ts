import {asyncForEach} from '../custom'
import {database} from '../../config/firebase'
import {getCurrentPrice} from '../current'
import {InvestmentData} from '../../components/Investments'
import firebase from 'firebase/app'

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
}
export class Investment{
  async get(ids:Array<string>, investmentType:InvestmentType){
    try{
      let investmentData:any = []
      const callback = async (id:string) => {
        const d = await database.collection(investmentType).doc(id).get()
        const data = d.data()
        investmentData.push({...data})
      }
      await asyncForEach(ids,callback)
      // after getting data from firebase, call server for current data
      const symbols = investmentData.map((i:any) => i.symbol)
      const updatedData = await getCurrentPrice(symbols, investmentType)
      investmentData = investmentData.map((d:any, i:number) => ({...d, currentPrice : updatedData[i].currentPrice}))
      return investmentData
    }catch(e){
      console.log(e)
      throw e
    } 
  }
  async getAll(stocks:Array<string>, cryptoCurrencies:Array<string>, mutualFunds:Array<string>){
    try{
      const s = this.get(stocks, InvestmentType.STOCKS)
      const c = this.get(cryptoCurrencies, InvestmentType.CRYPTO)
      const m = this.get(mutualFunds, InvestmentType.MUTUALFUNDS)
      const d = await Promise.all([s,c,m])
      const x:InvestmentData = {
        stocks : d[0],
        cryptoCurrencies : d[1],
        mutualFunds : d[2]
      } 
      return x
    }catch(e){
      console.log(e)
      throw escape
    }
    
  }
  async delete(){
    console.log("delete an investment")
  }
  async create(details:InvestmentDetails, investmentType:InvestmentType, portfolioId:string){
    const document = await database.collection(investmentType).add(details)
    console.log(document)
    // document.id
  
    const portfolioUpdate = await database.collection('portfolios').doc(portfolioId).update({
      [investmentType] : firebase.firestore.FieldValue.arrayUnion(document)
    })
    console.log(portfolioUpdate)
  }
  async update(){
    console.log("update an investment")
  }
}
