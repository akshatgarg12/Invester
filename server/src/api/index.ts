import {Request,Response,Router} from 'express'
import StocksController from '../controllers/stocks'
import MutualFundsController from '../controllers/mutualFund'
import CryptoController from '../controllers/crypto'
import CurrencyController from '../controllers/currency'
const router = Router()

// Stocks routes
router.post('/stocks', StocksController.getPrices)

// Crypto routes
router.post('/crypto', CryptoController.getPrices)
router.get('/crypto/search', CryptoController.find)

// Mutual fund routes
router.post('/mutualFunds', MutualFundsController.getPrices)
router.get('/mutualFunds/search', MutualFundsController.find)

router.get('/currency', CurrencyController.getRates)

// General routes
router.get('/', (_:Request, res:Response) => {
  res.send("Welcome to Invester API")
})
router.get('/ping', (_:Request, res:Response) => {
  res.status(200).json({
    status : "healthy",
    code : 200,
    message : "20 years of investment makes you 20X richer."
  })
})

export default router