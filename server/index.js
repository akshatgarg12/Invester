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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
// to make cookies work
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.set("trust proxy", 1);


app.post('/stocks' , async (req, res) => {
  const {symbols} = req.body
  const d = await Stocks.getCurrentPrices(symbols)
  res.send(d)
})

app.post('/crypto' , async (req, res) => {
  const {symbols} = req.body
  const d = await Crypto.getCurrentPrices(symbols)
  res.send(d)
})

app.post('/mutualFunds' , async (req, res) => {
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

