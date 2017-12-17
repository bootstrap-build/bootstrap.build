import React, { Component } from 'react'
import { Switch, Menu, Dropdown, Icon } from 'antd'
import ColorField from './color-field.js'
import BooleanField from './boolean-field.js'
import TextField from './text-field.js'
import SizeField from './size-field.js'
import ReferenceField from './reference-field.js'
import getVariableType from './get-variable-type.js'

class VariableField extends Component {

  state = {}

  handleChange = value => {
    this.props.onChange({
      ...this.props,
      value
    }, this.props.index)
  }

  componentDidMount() {
    this.setState({
      type: this.props.type
    })
  }

  renderHardVariable = () => {
    const type = this.state.type || this.props.type
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

  handleTypeChange = event => {
    this.setState({
      type: event.key
    })
  }

  render() {
    let isReferenceVar = this.props.value.indexOf('$') === 0
    const typeMenu = (
      <Menu onClick={this.handleTypeChange}>
        <Menu.Item key="variable">variable</Menu.Item>
        <Menu.Item key="size">size</Menu.Item>
        <Menu.Item key="string">string</Menu.Item>
        <Menu.Item key="color">color</Menu.Item>
      </Menu>
    )
    return (
      <div className="sidebar2__field__variable__split">
        { isReferenceVar ?
          <ReferenceField {...this.props} onChange={this.handleChange} /> :
          this.renderHardVariable()
        }
        <div style={{textAlign: 'right', fontSize: 10}}>
          <Dropdown overlay={typeMenu}>
            <a className="">{this.state.type || this.props.type}</a>
          </Dropdown>
        </div>
      </div>
    )
  }

}

export default VariableField
