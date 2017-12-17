import React, { Component } from 'react'
import { Switch, Menu, Dropdown, Icon } from 'antd'
import ColorField from './color-field.js'
import BooleanField from './boolean-field.js'
import TextField from './text-field.js'
import SizeField from './size-field.js'
import ReferenceField from './reference-field.js'
import getVariableType from './get-variable-type.js'

class VariableField extends Component {

  handleChange = value => {
    this.props.onChange({
      ...this.props,
      value
    }, this.props.index)
  }

  renderHardVariable = () => {
    const type = getVariableType(this.props.value)
    if(type === 'color') {
      return <ColorField {...this.props} onChange={this.handleChange}/>
    } else if(type === 'boolean') {
      return <BooleanField {...this.props} onChange={this.handleChange}/>
    } else if(type === 'size') {
      return <SizeField {...this.props} onChange={this.handleChange} />
    } else {
      return <TextField {...this.props} onChange={this.handleChange}/>
    }
  }

  render() {
    let isReferenceVar = this.props.value.indexOf('$') === 0
    return (
      <div className="sidebar2__field__variable__split">
        { isReferenceVar ?
          <ReferenceField {...this.props} onChange={this.handleChange} /> :
          this.renderHardVariable()
        }
      </div>
    )
  }

}

export default VariableField
