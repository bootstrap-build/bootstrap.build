import React, { Component } from 'react'
import { Input, Button } from 'antd'
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

  decrement = () => {
    const parsed = parseUnit(this.props.value)
    const unit = parsed[1] || ''
    const value = Number(parsed[0])
    let newValue
    let decrement = 1
    if(!unit || unit === 'rem' || unit === 'em') {
      decrement = 0.1
    }
    if(typeof value !== 'undefined') {
      newValue = Math.round((value - decrement) * 10) / 10
      this.props.onChange(`${newValue}${unit}`)
    }
  }

  handleMinusMouseDown = () => {
    this.setState({
      mouseDown: true
    })
    const func = () => {
      if(this.state.mouseDown) {
        this.decrement()
        setTimeout(func, 50)
      }
    }
    setTimeout(func, 500)
  }

  handlePlusMouseDown = () => {
    this.setState({
      mouseDown: true
    })
    const func = () => {
      if(this.state.mouseDown) {
        this.increment()
        setTimeout(func, 50)
      }
    }
    setTimeout(func, 500)
  }

  handleMouseUp = () => {
    this.setState({
      mouseDown: false
    })
  }

  handleMinusClick = () => {
    this.decrement()
  }

  increment = () => {
    const parsed = parseUnit(this.props.value)
    const unit = parsed[1] || ''
    const value = Number(parsed[0])
    let newValue
    let decrement = 1
    if(!unit || unit === 'rem' || unit === 'em') {
      decrement = 0.1
    }
    if(typeof value !== 'undefined') {
      newValue = Math.round((value + decrement) * 10) / 10
      this.props.onChange(`${newValue}${unit}`)
    }
  }

  handlePlusClick = () => {
    this.increment()
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
            onMouseDown={this.handleMinusMouseDown}
            onMouseUp={this.handleMouseUp}
            onClick={this.handleMinusClick}
          />
          <Button
            type="primary"
            icon="plus"
            onClick={this.handlePlusClick}
            onMouseUp={this.handleMouseUp}
            onMouseDown={this.handlePlusMouseDown}
          />
        </Button.Group>
      </div>
    </div>
    )
  }

}

export default SizeField
