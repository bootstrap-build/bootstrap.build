import React, { Component } from 'react'
import { Input } from 'antd'

class FontField extends Component {
  
  handleChange = event => {
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <Input value={this.props.value} onChange={this.handleChange} />
    )
  }
}

export default FontField
