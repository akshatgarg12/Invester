import express from 'express'
import cors from 'cors'
import { resolve } from "path"
import { config } from "dotenv"
config({ path: resolve(__dirname, "../../.env.example") })
import API from './api'
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
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

app.use('/', API)

import currency from '../src/helpers/currency'
currency.rate("INR", "USD")

app.listen(PORT, () => {
  console.log(`server running at port:${PORT}`)
})

