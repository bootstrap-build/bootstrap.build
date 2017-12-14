import React, { Component } from 'react'
import { Checkbox } from 'antd'

class PreviewMenu extends Component {

  handleLockChange = event => {
    this.props.onLockChange(event.target.checked)
  }

  render() {
    return (
      <div className="preview__menu">
        <div style={{ float: 'left' }}>
          <Checkbox
            checked={this.props.lock}
            onChange={this.handleLockChange}
          >Stay on this page
        </Checkbox>
        </div>
        <div style={{ float: 'right' }}>
          <a href="#">Edit HTML</a>
          <span> | </span>
          <a href="#">Background color</a>
        </div>
      </div>
    )
  }
}

export default PreviewMenu
