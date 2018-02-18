const sass = require('node-sass')
const express = require('express')

const app = express()

app.use(express.static('build'))

app.get('*', (req, res, next) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(fullUrl)
})

app.listen(3001, () => {
  console.log('👍 Production Front End server is up')
})
