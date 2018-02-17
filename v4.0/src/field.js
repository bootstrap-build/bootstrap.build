import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd'
import ColorField from './color-field.js'
import BooleanField from './boolean-field.js'
import TextField from './text-field.js'
import SizeField from './size-field.js'
import ReferenceField from './reference-field.js'
import FontField from './font-field.js'

class Field extends Component {

  state = {}

  componentDidMount() {
    if(this.props.referenceVars[this.props.variable] !== this.props.value) {
      this.setState({
        changed: true
      })
    }
  }

  handleChange = value => {
    this.setState({
      changed: true
    })
    this.props.onChange({
      ...this.props,
      type: this.state.type || this.props.type,
      value
    }, this.props.index)
  }

  handleSetDefault = event => {
    this.setState({
      changed: false
    })
    this.props.onSetDefault(this.props.variable, this.props.index)
  }

  renderVariable = () => {
    const type = this.state.type || this.props.type
    if(type === 'variable') {
      return <ReferenceField {...this.props} onChange={this.handleChange} />
    } else if (this.props.type === 'font') {
      return <FontField {...this.props} onChange={this.handleChange} onGoogleFontSelected={this.props.onGoogleFontSelected} />
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
        <Menu.Item key="boolean">boolean</Menu.Item>
        <Menu.Item key="size">size</Menu.Item>
        <Menu.Item key="string">string</Menu.Item>
        <Menu.Item key="color">color</Menu.Item>
        <Menu.Item key="font">font</Menu.Item>
      </Menu>
    )
    return (
      <div className="sidebar2__field__variable__split">
        <div style={{ overflow: 'hidden' }}>
          { this.renderVariable() }
        </div>
        <div style={{textAlign: 'right', fontSize: 10, overflow: 'hidden'}}>
          <div style={{ float: 'left' }}>
            {this.state.changed ?
              <a onClick={this.handleSetDefault}><i className="fa fa-times"></i> set default</a>
            : ''}
          </div>
          <div style={{ float: 'right' }}>
            <Dropdown overlay={typeMenu} trigger={["click"]}>
              <a><i className="fa fa-gear"></i> {this.state.type || this.props.type}</a>
            </Dropdown>
          </div>
        </div>
      </div>
    )
  }

}

export default Field
