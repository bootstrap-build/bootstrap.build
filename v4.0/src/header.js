import React, { Component } from 'react'
import {
  Menu,
  Dropdown,
  Button,
  Icon,
  Switch,
  Tooltip
} from 'antd'

class Header extends Component {

  handleExportMenuClick = (event) => {
    if(event.key === 'scss') {
      this.props.onSCSSExport()
    }
    if(event.key === 'build') {
      this.props.onBootstrapBuildExport()
    }
  }

  handleCompileStrategyChange = event => {
    this.props.onCompileStrategyChange(event.key)
  }

  render() {
    const exportMenu = (
      <Menu onClick={this.handleExportMenuClick}>
        <Menu.Item key="scss">SCSS Variables</Menu.Item>
        <Menu.Item key="build">Bootstrap Build</Menu.Item>
      </Menu>
    )
    const compileStrategyMenu = (
      <Menu onClick={this.handleCompileStrategyChange}>
        <Menu.Item key="client">Compile on client</Menu.Item>
        <Menu.Item key="server">Compile on server</Menu.Item>
      </Menu>
    )
    let codeTooltipText = this.props.codeEditorOpen ? 'Hide code snippets' : 'Show code snippets'
    return (
      <header>
        <div className="header__logo">
          <img src="./logo.png" height="30" alt="Bootstrap.build logo" />
        </div>
        <div className="header__right">
          <Dropdown overlay={exportMenu} trigger={["click"]}>
            <Button type="primary" icon="download">Export</Button>
          </Dropdown>
        </div>
        <div className="header__compile__strategy">
          <Dropdown overlay={compileStrategyMenu} trigger={["click"]}>
            <Button>
              Compile on {this.props.compileStrategy} <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
        <div className="header__code-editor">
          <Tooltip placement="bottom" title={codeTooltipText}>
            <Switch
              onChange={this.props.onCodeEditorToggle}
              checked={this.props.codeEditorOpen}
              checkedChildren={<i className="fa fa-code" />}
              unCheckedChildren={<i className="fa fa-code" />}
            />
        </Tooltip>
        </div>
      </header>
    )
  }
}

export default Header
