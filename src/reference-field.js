import React, { Component } from 'react'
import { AutoComplete } from 'antd'

class ReferenceField extends Component {

  handleChange = value => {
    this.props.onChange(value)
  }

  render() {
    return (
      <AutoComplete
        dataSource={Object.keys(this.props.referenceVars || {})}
        style={{ width: '100%' }}
        placeholder="$variable"
        value={this.props.value}
        onChange={this.handleChange}
      />
    )
  }
}

export default ReferenceField
