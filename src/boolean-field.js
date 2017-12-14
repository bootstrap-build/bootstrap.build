import React, { Component } from 'react'
import { Switch } from 'antd'

class BooleanField extends Component {

  handleChange = checked => {
    this.props.onChange(checked)
  }

  render() {
    return (
      <Switch checked={this.props.value} onChange={this.handleChange} />
    )
  }
}

export default BooleanField
