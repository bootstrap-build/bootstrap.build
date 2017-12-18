import React, { Component } from 'react'
import {
  Menu,
  Dropdown,
  Button,
  Icon,
  message,
  Checkbox,
  Switch,
  Tooltip
} from 'antd'

class Header extends Component {
  render() {
    const exportMenu = (
      <Menu>
        <Menu.Item key="1">SCSS Variables</Menu.Item>
        <Menu.Item key="2">Bootstrap Build</Menu.Item>
      </Menu>
    )
    let tooltipText = this.props.templateLock ? 'Only variables section will update when you change sections.' : 'Template and variables section will update when you change sections.'
    return (
      <header>
        <div className="header__controls">
          <Tooltip placement="bottom" title={tooltipText}>
            <Switch
              onChange={this.props.onTemplateLock}
              checked={this.props.templateLock}
              checkedChildren={<Icon type="lock" />}
              unCheckedChildren={<Icon type="unlock" />}
            />
          </Tooltip>
        </div>
        <div className="header__docs">
          <span>Show docs </span>
          <Switch
            onChange={this.props.onShowDocsToggle}
            checked={this.props.showDocs}
          />
        </div>
        <div className="header__right">
          <Dropdown overlay={exportMenu}>
            <Button type="primary" icon="download">Export</Button>
          </Dropdown>
        </div>
      </header>
    )
  }
}

export default Header
