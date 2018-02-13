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

app.get('/', (req, res) => {
  res.json({
    endPoints: '/compile'
  })
})

app.post('/compile', (req, res) => {
  sass.render({
    data:
      `
      @import "functions";
      ${(req.body.vars || []).reduce((prev, cur) => {
        return `${prev}\n${cur[0]}: ${cur[1]};`
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
    if(err) {
      return res.json({
        error: true,
        error_description: err.formatted
      })
    }
    return res.json({
      css: result.css.toString()
    })
  })
})

app.listen(8080, () => {
  console.log('server is up')
})
