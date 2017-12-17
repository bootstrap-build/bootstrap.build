import React, { Component } from 'react'
import { AutoComplete } from 'antd'

class ReferenceField extends Component {

  handleChange = value => {
    this.props.onChange(value)
  }

  render() {
    const suggestData = []
    Object.keys(this.props.referenceVars || {}).forEach(key => {
      //if(this.props.referenceVars[key].type === this.props.type) {
        suggestData.push(key)
      //}
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
