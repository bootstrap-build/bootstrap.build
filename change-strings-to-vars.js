const vars = require('./src/curated-variables')
const fs = require('fs')

let counter = 0

Object.keys(vars).forEach(section => {
  vars[section].forEach(_var => {
    if(_var.value.indexOf('$') === 0 && _var.value.indexOf(' ') === -1) {
      _var.type = 'variable'
      counter++
      console.log(`${counter} 👍`)
    }
  })
})

fs.writeFile("./formated-variable-1.json", JSON.stringify(vars, ' ', 2), err => {
  if(err) {
    return console.log('👎')
  }
  console.log('👍👍👍👍👍saved')
});
