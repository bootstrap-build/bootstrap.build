import React, { Component } from 'react'
import { Input } from 'antd'
import ColorField from './color-field.js'
import BooleanField from './boolean-field.js'

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
    } else if(this.props.type === 'boolean') {
      return <BooleanField value={this.props.value} onChange={this.handleChange}/>
    } else {
      return <Input />
    }
  }

}

export default VariableField
