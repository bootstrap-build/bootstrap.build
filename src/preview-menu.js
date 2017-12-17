import React, { Component } from 'react'
import { Checkbox } from 'antd'

class PreviewMenu extends Component {

  handleLockChange = event => {
    this.props.onLockChange(event.target.checked)
  }

  handleShowDocsToggle = () => {
    this.props.onShowDocsToggle()
  }

  render() {
    return (
      <div className="preview__menu">
        <div style={{ float: 'left' }}>
          <Checkbox
            checked={this.props.lock}
            onChange={this.handleLockChange}
          >Stay on this page</Checkbox>
        </div>
      </div>
    )
  }
}

export default PreviewMenu
