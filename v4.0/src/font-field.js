import React, { Component } from 'react'
import { AutoComplete } from 'antd'
import GoogleFonts from './google-fonts.json'

const googleFontNames = GoogleFonts.map(font => font.family)

class FontField extends Component {

  handleChange = value => {
    this.props.onChange(value)
    if(googleFontNames.indexOf(value) !== -1) {
      this.props.onGoogleFontSelected(value)
    }
  }

  render() {
    return (
      <AutoComplete
        dataSource={googleFontNames}
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
