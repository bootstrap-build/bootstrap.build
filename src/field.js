import React, { Component } from 'react'
import { Switch, Menu, Dropdown, Icon } from 'antd'
import ColorField from './color-field.js'
import BooleanField from './boolean-field.js'
import TextField from './text-field.js'
import SizeField from './size-field.js'
import ReferenceField from './reference-field.js'
import FontField from './font-field.js'

class Field extends Component {

  state = {}

  handleChange = value => {
    this.props.onChange({
      ...this.props,
      type: this.state.type || this.props.type,
      value
    }, this.props.index)
  }

  renderVariable = () => {
    const type = this.state.type || this.props.type
    if(type === 'variable') {
      return <ReferenceField {...this.props} onChange={this.handleChange} />
    } else if (this.props.type === 'font') {
      return <FontField {...this.props} onChange={this.handleChange} />
    } else if(type === 'color') {
      return <ColorField {...this.props} onChange={this.handleChange}/>
    } else if(type === 'boolean') {
      return <BooleanField {...this.props} onChange={this.handleChange}/>
    } else if(type === 'size') {
      return <SizeField {...this.props} onChange={this.handleChange} />
    } else {
      return <TextField {...this.props} onChange={this.handleChange} />
    }
  }

  handleTypeChange = event => {
    this.setState({
      type: event.key
    })
  }

  render() {
    const typeMenu = (
      <Menu onClick={this.handleTypeChange}>
        <Menu.Item key="variable">variable</Menu.Item>
        <Menu.Item key="size">size</Menu.Item>
        <Menu.Item key="string">string</Menu.Item>
        <Menu.Item key="color">color</Menu.Item>
        <Menu.Item key="font">font</Menu.Item>
      </Menu>
    )
    return (
      <div className="sidebar2__field__variable__split">
        { this.renderVariable() }
        <div style={{textAlign: 'right', fontSize: 10}}>
          <Dropdown overlay={typeMenu}>
            <a className=""><i className="fa fa-gear"></i> {this.state.type || this.props.type}</a>
          </Dropdown>
        </div>
      </div>
    )
  }

}

export default Field
