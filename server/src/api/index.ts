import {Router} from 'express'
import StocksController from '../controllers/stocks'
import MutualFundsController from '../controllers/mutualFund'
import CryptoController from '../controllers/crypto'
const router = Router()

router.post('/stocks', StocksController.getPrices)
router.post('/crypto', CryptoController.getPrices)
router.post('/mutualFunds', MutualFundsController.getPrices)

export default router