import {database} from '../../config/firebase'
import firebase from 'firebase/app'
import {asyncForEach} from '../custom'

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


export const getStocks = async (stockIds : Array<string>) => {
  const stocks:any = []
  const callback = async (id:string) => {
    const d = await database.collection('stocks').doc(id).get()
    const data = d.data()
    stocks.push(data)
  }
  await asyncForEach(stockIds,callback)
  return stocks
}


export const getMutualFunds = async (mutualFundIds : Array<string>) => {
  const mutualFunds:any = []
  const callback = async (id:string) => {
    const d = await database.collection('mutualFunds').doc(id).get()
    const data = d.data()
    mutualFunds.push(data)
  }
  await asyncForEach(mutualFundIds,callback)
  return mutualFunds
}


export const getCryptoCurrencies = async (cryptoCurrenciesIds : Array<string>) => {
  // const refs = cryptoCurrenciesIds.map((id) => `stocks/${id}`)
  const cryptoCurrencies:any = []
  const callback = async (id:string) => {
    const d = await database.collection('cryptoCurrencies').doc(id).get()
    const data = d.data()
    cryptoCurrencies.push(data)
  }
  await asyncForEach(cryptoCurrenciesIds,callback)
  return cryptoCurrencies
}