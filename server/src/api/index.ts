import {Router} from 'express'
import StocksController from '../controllers/stocks'
import MutualFundsController from '../controllers/mutualFund'
import CryptoController from '../controllers/crypto'
import CurrencyController from '../controllers/currency'
const router = Router()

router.post('/stocks', StocksController.getPrices)
router.post('/crypto', CryptoController.getPrices)
router.get('/crypto/search', CryptoController.find)
router.post('/mutualFunds', MutualFundsController.getPrices)
router.get('/mutualFunds/search', MutualFundsController.find)
router.get('/currency', CurrencyController.getRates)

export default router