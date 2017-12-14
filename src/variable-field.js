import React, { Component } from 'react'
import { Input } from 'antd'
import ColorField from './color-field.js'

class VariableField extends Component {

  handleChange = value => {
    this.props.onChange({
      ...this.props,
      value
    }, this.props.index)
  }

  render() {
    if(this.props.type === 'color') {
      return <ColorField value={this.props.value} onChange={this.handleChange}/>
    } else {
      return <Input />
    }
  }

}

export default VariableField
