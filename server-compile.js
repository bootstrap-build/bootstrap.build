const sass = require('node-sass')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.post('/bootstrap', (req, res) => {
  sass.render({
    data:
      `
      @import "functions";
      ${Object.keys(req.body).reduce((prev, cur) => {
        console.log(req.body[cur])
        return `${prev}\n${cur}: ${req.body[cur]};`
      }, '')}
      @import "variables";
      @import "mixins";
      @import "root";
      @import "print";
      @import "reboot";
      @import "type";
      @import "images";
      @import "code";
      @import "grid";
      @import "tables";
      @import "forms";
      @import "buttons";
      @import "transitions";
      @import "dropdown";
      @import "button-group";
      @import "input-group";
      @import "custom-forms";
      @import "nav";
      @import "navbar";
      @import "card";
      @import "breadcrumb";
      @import "pagination";
      @import "badge";
      @import "jumbotron";
      @import "alert";
      @import "progress";
      @import "media";
      @import "list-group";
      @import "close";
      @import "modal";
      @import "tooltip";
      @import "popover";
      @import "carousel";
      @import "utilities";
      `,
    includePaths: ['./public/bootstrap_scss/']
  }, (err, result) => {
    res.header('Content-type', 'text/plain')
    res.header('Access-Control-Allow-Origin', '*')
    res.send(result.css)
  })
})

app.listen(8080, () => {
  console.log('server is up')
})
