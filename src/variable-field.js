import React, { Component } from 'react'
import { Switch } from 'antd'
import ColorField from './color-field.js'
import BooleanField from './boolean-field.js'
import TextField from './text-field.js'
import SizeField from './size-field.js'

class VariableField extends Component {

  handleChange = value => {
    this.props.onChange({
      ...this.props,
      value
    }, this.props.index)
  }

  renderHardVariable = () => {
    if(this.props.type === 'color') {
      return <ColorField {...this.props} onChange={this.handleChange}/>
    } else if(this.props.type === 'boolean') {
      return <BooleanField {...this.props} onChange={this.handleChange}/>
    } else if(this.props.type === 'size') {
      return <SizeField {...this.props} onChange={this.handleChange} />
    } else {
      return <TextField {...this.props} onChange={this.handleChange}/>
    }
  }

  render() {
    return (
      <div className="sidebar2__field__variable__split">
        <div className="sidebar2__field__variable__split__left">
          {this.renderHardVariable()}
        </div>
        <div className="sidebar2__field__variable__split__right">
          <div>
            qwe
          </div>
        </div>
      </div>
    )
  }

}

export default VariableField
