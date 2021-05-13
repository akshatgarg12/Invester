import {database} from '../../config/firebase'
import firebase from 'firebase/app'
import { InvestmentType } from '../investment'
import { asyncForEach } from '../custom'

export class Portfolio{
  id:string | undefined = undefined
  constructor(id : string | undefined = undefined){
    this.id = id
  } 
  async get(){
    try{
      if(!this.id){
        throw new Error("Provide the id of portfolio")
      }
      const db = await database.collection('portfolios').doc(this.id).get()
      const portfolio = db.data()
      if(!portfolio){
        // throw error
        throw new Error("Portfolio not found")
      }
      // console.log(portfolio.stocks[0].id)
      const stocks: Array<string> = portfolio.stocks.map((s:any) => s.id)
      const cryptoCurrencies: Array<string> = portfolio.cryptoCurrencies.map((s:any) => s.id)
      const mutualFunds: Array<string> = portfolio.mutualFunds.map((s:any) => s.id)
    
      console.log(portfolio)
      const {name, createdAt, totalValue} = portfolio
      return {
        name,
        createdAt, 
        totalValue,
        stocks,
        cryptoCurrencies,
        mutualFunds
      }
    }
    catch(e){
      console.log(e)
      throw e
    }
  }
  async create(uid:string, name:string){
    try{
      const portfolio:any = {
        name,
        stocks : [],
        cryptoCurrencies : [],
        mutualFunds : [],
        createdAt : new Date()
      }
      const document = await database.collection("portfolios").add(portfolio)
      // document.id
      const user = await database.collection('users').doc(uid).get()
      user.ref.update({
        "portfolios" : firebase.firestore.FieldValue.arrayUnion(document)
      })
      console.log(document.id);
      return document.id
    }catch(e){
      console.log(e)
      throw e
    }
  }
  async delete(uid : string){
    try{
      if(!this.id){
        console.log("provide an id")
        return;
      }
      // get the doc
      const document = database.collection("portfolios").doc(this.id)
      const docData = await this.get()
      // delete the doc
      await document.delete()
      // update the user data
      const user = await database.collection('users').doc(uid).get()
      user.ref.update({
        "portfolios" :  firebase.firestore.FieldValue.arrayRemove(document)
      })
      // delete the portfolio subcollection data
      const callback =  (investmentType : InvestmentType) => {
        const cb = async (id:string) => {
          try{
            await database.collection(investmentType).doc(id).delete()
          }catch(e){
            console.log(e)
          }
        }
        return cb
      }
      const s = asyncForEach(docData.stocks, callback(InvestmentType.STOCKS))
      const c = asyncForEach(docData.cryptoCurrencies, callback(InvestmentType.CRYPTO))
      const m = asyncForEach(docData.mutualFunds, callback(InvestmentType.MUTUALFUNDS))
      await Promise.all([s, c, m])
      // return the id
      return document.id
    }catch(e){
      console.log(e)
      throw e
    }
  }
}
