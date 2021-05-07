const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 8080
const Stocks = require('./controllers/stocks')
const Crypto = require('./controllers/cryptoCurrency')
const MutualFunds = require('./controllers/mutualFund')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:true}))

app.get('/stocks' , async (req, res) => {
  const {symbols} = req.body
  const d = await Stocks.getCurrentPrices(symbols)
  res.send(d)
})

app.get('/crypto' , async (req, res) => {
  const {symbols} = req.body
  const d = await Crypto.getCurrentPrices(symbols)
  res.send(d)
})

app.get('/mutualFunds' , async (req, res) => {
  const {symbols} = req.body
  const d = await MutualFunds.getCurrentPrices(symbols)
  res.send(d)
})

app.get('/search/mutualFund/:mf' , async (req, res) => {
  const {mf} = req.params
  const d = await MutualFunds.findMutualFund(mf)
  res.send(d)
})

app.listen(PORT, () => {
  console.log(`server running at port:${PORT}`)
})

