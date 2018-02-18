import React, { Component } from 'react'
import {
  Menu,
  Dropdown,
  Button,
  Icon,
  Switch,
  Tooltip
} from 'antd'
import Dropzone from 'react-dropzone'


class Header extends Component {

  handleExportMenuClick = event => {
    if(event.key === 'scss') {
      this.props.onSCSSExport()
    }
    if(event.key === 'build') {
      this.props.onBootstrapBuildExport()
    }
    if(event.key === 'build.min') {
      this.props.onBootstrapBuildMinExport()
    }
  }
  
  handleImportMenuClick = async event => {
    if(event.key.indexOf('bootswatch') === 0) {
      const themeName = event.key.replace('bootswatch/', '')
      const theme = await (await fetch(`./bootswatch/${themeName}.scss`)).text()
      this.props.onFileImport(theme)
    }
  }
  
  handleFileDrop = files => {
    files.forEach(file => {
      var reader = new FileReader();
      reader.addEventListener("loadend", event => {
        this.props.onFileImport(event.target.result)
      })
      reader.readAsText(file);
    })
  }

  handleCompileStrategyChange = event => {
    this.props.onCompileStrategyChange(event.key)
  }

  render() {
    const exportMenu = (
      <Menu onClick={this.handleExportMenuClick}>
        <Menu.Item key="scss">_variables.scss</Menu.Item>
        <Menu.Item key="build">bootstrap.css</Menu.Item>
        <Menu.Item key="build.min">bootstrap.min.css</Menu.Item>
      </Menu>
    )
    const compileStrategyMenu = (
      <Menu onClick={this.handleCompileStrategyChange}>
        <Menu.Item key="client">Compile on client</Menu.Item>
        <Menu.Item key="server">Compile on server</Menu.Item>
      </Menu>
    )
    const importMenu = (
      <Menu onClick={this.handleImportMenuClick}>
        <Menu.Item key="import">
          <Dropzone
            style={{ height: 'auto', border: 'none' }}
            onDrop={this.handleFileDrop}
            multiple={false}
          >Import _variables.scss
          </Dropzone>
        </Menu.Item>
        <Menu.SubMenu title="Bootswatch themes">
          <Menu.Item key="bootswatch/cerulean">Cerulean</Menu.Item>
          <Menu.Item key="bootswatch/cosmo">Cosmo</Menu.Item>
          <Menu.Item key="bootswatch/cyborg">Cyborg</Menu.Item>
          <Menu.Item key="bootswatch/darkly">Darkly</Menu.Item>
          <Menu.Item key="bootswatch/flatly">Flatly</Menu.Item>
          <Menu.Item key="bootswatch/journal">Journal</Menu.Item>
          <Menu.Item key="bootswatch/litera">Litera</Menu.Item>
          <Menu.Item key="bootswatch/lumen">Lumen</Menu.Item>
          <Menu.Item key="bootswatch/lux">Lux</Menu.Item>
          <Menu.Item key="bootswatch/materia">Materia</Menu.Item>
          <Menu.Item key="bootswatch/minty">Minty</Menu.Item>
          <Menu.Item key="bootswatch/pulse">Pulse</Menu.Item>
          <Menu.Item key="bootswatch/sandstone">Sandstone</Menu.Item>
          <Menu.Item key="bootswatch/simplex">Simplex</Menu.Item>
          <Menu.Item key="bootswatch/sketchy">Sketchy</Menu.Item>
          <Menu.Item key="bootswatch/slate">Slate</Menu.Item>
          <Menu.Item key="bootswatch/solar">Solar</Menu.Item>
          <Menu.Item key="bootswatch/spacelab">Spacelab</Menu.Item>
          <Menu.Item key="bootswatch/superhero">Superhero</Menu.Item>
          <Menu.Item key="bootswatch/united">United</Menu.Item>
          <Menu.Item key="bootswatch/yeti">Yeti</Menu.Item>
        </Menu.SubMenu>
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
        <div className="header__import">
          <Dropdown overlay={importMenu} trigger={["click"]}>
            <Button>
              Import
            </Button>
          </Dropdown>
        </div>
      </header>
    )
  }
}

export default Header
