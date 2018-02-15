import React, { Component } from 'react'
import Field from './field.js'
import { Menu, Dropdown, Button, Icon } from 'antd'

class VariableSection extends Component {

  state = {}

  handleChange = (field, index) => {
    this.props.onChange({
      type: field.type,
      value: field.value,
      variable: field.variable,
      description: field.description
    }, this.state.active, index)
  }

  handleSetDefault = (varName, index) => {
    this.props.onSetDefault(varName, this.state.active, index)
  }

  handleVariableSectionMenuClick = event => {
    this.setState({
      active: event.key
    })
  }

  setActive = active => {
    this.setState({ active })
  }

  render() {
    const variableSectionDropdown = (
      <Menu onClick={this.handleVariableSectionMenuClick}>
        {Object.keys(this.props.fields).map(key => {
          return <Menu.Item style={{fontSize: 11, padding: 2}} key={key}>{key}</Menu.Item>
        })}
      </Menu>
    )
    return (
      <div>
        <div style={{ fontSize: 15, textAlign: 'center'}}>
          <Dropdown overlay={variableSectionDropdown} trigger={["click"]}>
            <Button style={{ width: '100%', marginBottom: 15 }}>
              {this.state.active} <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
        {(this.props.fields[this.state.active] || []).map((field, index) => {
          return (
            <div key={`${index}${field.variable}`} className="sidebar2__field">
              <div className="sidebar2__field__variable">{field.variable}</div>
              <Field
                referenceVars={this.props.referenceVars}
                {...field}
                index={index}
                onChange={this.handleChange}
                onSetDefault={this.handleSetDefault}
                onGoogleFontSelected={this.props.onGoogleFontSelected}
              />
              <div className="sidebar2__field__description" dangerouslySetInnerHTML={{ __html: field.description }} />
            </div>
          )
        })}
      </div>
    )
  }

}

export default VariableSection
