import React, { Component } from 'react'
import { AutoComplete } from 'antd'
import fonts from './google-fonts.json'

const fontNames = fonts.map(font => font.family)

class FontField extends Component {

  handleChange = value => {
    this.props.onChange(value)
  }

  render() {
    return (
      <AutoComplete
        dataSource={fontNames}
        style={{ width: '100%' }}
        placeholder="Font Family"
        value={this.props.value}
        onChange={this.handleChange}
        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    )
  }
}

export default FontField
