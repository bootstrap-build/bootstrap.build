import React, { Component } from 'react'
import { AutoComplete } from 'antd'

class ReferenceField extends Component {

  handleChange = value => {
    if(this.props.referenceVars[value]) {
      this.props.onChange(value)
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
        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    )
  }
}

export default ReferenceField
