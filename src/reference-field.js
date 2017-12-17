import React, { Component } from 'react'
import { AutoComplete } from 'antd'
import getVariableType from './get-variable-type.js'

class ReferenceField extends Component {

  handleChange = value => {
    if(this.props.referenceVars[value]) {
      this.props.onChange(value)
    } else {
      if(getVariableType(value) !== 'string') {
        this.props.onChange(value)
      }
    }
  }

  render() {
    const suggestData = []
    Object.keys(this.props.referenceVars || {}).forEach(key => {
      suggestData.push(key)
    })
    return (
      <AutoComplete
        dataSource={suggestData}
        style={{ width: '100%' }}
        placeholder="$variable"
        value={this.props.value}
        onChange={this.handleChange}
      />
    )
  }
}

export default ReferenceField
