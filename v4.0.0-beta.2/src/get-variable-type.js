const getVariableType = variable => {
  if(variable.indexOf('rgb') === 0 || variable.indexOf('#') === 0) {
    return 'color'
  }
  if(variable.indexOf('$') !== -1) {
    return 'string'
  }
  if(variable.indexOf('px') !== -1 || variable.indexOf('em') !== -1) {
    return 'size'
  }
  if(variable.indexOf('true') === 0 || variable.indexOf('false') === 0) {
    return 'boolean'
  }
  return 'string'
}

export default getVariableType
