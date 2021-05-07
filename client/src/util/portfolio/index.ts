import {database} from '../../config/firebase'
import {asyncForEach} from '../custom'
import {getCurrentPrice} from '../current'

export const getPortfolioData = async (id:string) => {
  try{
    const db = await database.collection('portfolios').doc(id).get()
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
  // extract stocks , cryptos , mutualFunds by creating three different functions which can be called, later 
}

export enum InvestmentType{
  STOCKS = "stocks",
  CRYPTO = "cryptoCurrencies",
  MUTUALFUNDS = "mutualFunds"
}
export const getInvestmentData = async (ids:Array<string>, investmentType:InvestmentType ) => {
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
}