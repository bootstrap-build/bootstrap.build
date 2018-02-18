const sass = require('node-sass')
const express = require('express')

const app = express()

app.use(express.static('build'))

app.listen(3001, () => {
  console.log('👍 Production Front End server is up')
})
