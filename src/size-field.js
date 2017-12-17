import React, { Component } from 'react'
import { InputNumber, Menu, Dropdown, Icon } from 'antd'
import parseUnit from 'parse-unit'

class SizeField extends Component {

  state = {
    unit: 'px'
  }

  handleMenuClick = ({ key }) => {
    this.setState({
      unit: key
    })
  }

  handleChange = value => {
    this.props.onChange(`${value}${this.state.unit}`)
  }

  formatter = value => {
    return `${value}${this.state.unit}`
  }

  parser = value => {
    return Number(parseUnit(this.props.value)[0])
  }

  componentDidMount = () => {
    this.setState({
      unit: parseUnit(this.props.value)[1]
    })
  }

  render() {
    const unitMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="%">
          %
        </Menu.Item>
        <Menu.Item key="px">
          px
        </Menu.Item>
        <Menu.Item key="pt">
          pt
        </Menu.Item>
        <Menu.Item key="rem">
          rem
        </Menu.Item>
        <Menu.Item key="em">
          em
        </Menu.Item>
      </Menu>
    )
    return (
      <div>
        <InputNumber
          value={parseUnit(this.props.value)[0]}
          onChange={this.handleChange}
          formatter={this.formatter}
          parser={this.parser}
          step={0.25}
          style={{
            width: '100%',
            fontSize: 12
          }}
        />
      {this.props.dynamicUnit ?
        <Dropdown overlay={unitMenu}>
          <a>{this.state.unit}</a>
        </Dropdown>: ''}
      </div>
    )
  }

}

export default SizeField
