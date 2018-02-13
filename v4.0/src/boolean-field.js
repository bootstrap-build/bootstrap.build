import React, { Component } from 'react'
import { Switch } from 'antd'

class BooleanField extends Component {

  strToBool = str => {
    if(str === 'true') {
      return true
    } else {
      return false
    }
  }

  handleChange = checked => {
    this.props.onChange(String(checked))
  }

  render() {
    return (
      <Switch checked={this.strToBool(this.props.value)} onChange={this.handleChange} />
    )
  }
}

export default BooleanField
