const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:true}))

app.get('/' , (req, res) => {
  res.send("hello")
})

app.listen(PORT, () => {
  console.log(`server running at port:${PORT}`)
})

