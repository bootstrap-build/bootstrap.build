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
    let newValue
    if(value) {
      this.props.onChange(`${value - 0.5}${unit}`)
    } else {
      this.props.onChange(`1rem`)
    }
  }

  handlePlusClick = () => {
    const parsed = parseUnit(this.props.value)
    const unit = parsed[1]
    const value = Number(parsed[0])
    let newValue
    if(value) {
      this.props.onChange(`${value + 0.5}${unit}`)
    } else {
      this.props.onChange(`1rem`)
    }
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

  render() {
    return (
      <div>
        <Input
          value={this.state.value}
          onChange={this.handleChange}
          className="sidebar2__size-variable__input"
        />
      <div className="sidebar2__size-variable__buttons">
        <Button.Group>
          <Button
            type="primary"
            icon="minus"
            className="sidebar2__size-variable__buttons__left"
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
