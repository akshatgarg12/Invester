import {database} from '../../config/firebase'

export const getPortfolioData = async (id:string) => {
  const db = await database.collection('portfolios').doc(id).get()
  const portfolio = db.data()
  if(!portfolio){
    // throw error
    throw new Error("Portfolio not found")
  }
  console.log(portfolio)
  // extract stocks , cryptos , mutualFunds by creating three different functions which can be called, later 
}