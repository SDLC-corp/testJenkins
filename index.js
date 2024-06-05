const express = require('express')
const app = express()
require('dotenv').config()

console.log("env : ",process.env.PORT);

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World! 123123')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})