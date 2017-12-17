const variables = require('./bootstrap-variables.json')
const fs = require('fs')

const jsVariableMap = {}

const getVariableType = variable => {
  if(variable.mapValue) {
    // change this to it's own type in future
    return 'string'
  }
  if(variable.indexOf('rgb') !== -1 || variable.indexOf('#') === 0) {
    return 'color'
  }
  if(variable.indexOf('$') !== -1) {
    return 'string'
  }
  if(variable.indexOf('px') !== -1 || variable.indexOf('em') !== -1) {
    return 'size'
  }
  if(variable.indexOf('true') !== -1 || variable.indexOf('false') !== -1) {
    return 'boolean'
  }
  return 'string'
}

const out = []
variables.forEach(variable => {
  jsVariableMap[variable.name] = variable.value
  out.push({
    variable: variable.name,
    value: variable.value,
    type: getVariableType(variable.value),
    description: ''
  })
})

fs.writeFile("./formated-variable.json", JSON.stringify(out, ' ', 2), err => {
  if(err) {
    return console.log('👎')
  }
  console.log('👍')
});
