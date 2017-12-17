import React, { Component } from 'react'
import { Input, Menu, Dropdown, Icon, Button } from 'antd'
import parseUnit from 'parse-unit'

class SizeField extends Component {

  state = {}

  handleChange = event => {
    const parsed = parseUnit(event.target.value)
    const unit = parsed[1]
    if(unit === 'px' || unit === 'em' || unit === 'rem' || unit === '%') {
      this.props.onChange(event.target.value)
    } else {
      this.setState({
        value: event.target.value
      })
    }
  }

  handleMinusClick = () => {
    const parsed = parseUnit(this.props.value)
    const unit = parsed[1]
    const value = Number(parsed[0])
    const newValue = value - 0.5
    this.props.onChange(`${newValue}${unit}`)
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    })
  }

  componentWillReceiveProps(props) {
    if(props.value !== this.state.value) {
      this.setState({
        value: props.value
      })
    }
  }

  handlePlusClick = () => {
    const parsed = parseUnit(this.props.value)
    const unit = parsed[1]
    const value = Number(parsed[0])
    const newValue = value + 0.5
    this.props.onChange(`${newValue}${unit}`)
  }

  render() {
    return (
      <div>
        <Input
          value={this.state.value}
          onChange={this.handleChange}
          style={{
            width: '60%',
            fontSize: 12,
            float: 'left',
            borderRight: 'none',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          }}
        />
      <div style={{width: '40%', float: 'left'}}>
        <Button.Group>
          <Button
            type="primary"
            icon="minus"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            }}
            onClick={this.handleMinusClick}
          />
          <Button
            type="primary"
            icon="plus"
            onClick={this.handlePlusClick}
          />
        </Button.Group>
      </div>
    </div>
    )
  }

}

export default SizeField
