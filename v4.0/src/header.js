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

  handlePreviewMenuClick = event => {
    if(this.props.previewReady) {
      this.props.onPreviewButtonClick(event.key)
    }
  }

  handleImportMenuClick = async event => {
    const shouldImport = window.confirm('Are you sure you want to import a new theme? Your theme variables will be overwriten.')
    if(shouldImport) {
      if(event.key.indexOf('bootswatch') === 0) {
        const themeName = event.key.replace('bootswatch/', '')
        const theme = await (await fetch(`./bootswatch/${themeName}.scss`)).text()
        this.props.onFileImport(theme)
      }
    }
  }

  handleFileDrop = files => {
    const shouldImport = window.confirm('Are you sure you want to import a new theme? Your theme variables will be overwriten.')
    if(shouldImport) {
      files.forEach(file => {
        var reader = new FileReader();
        reader.addEventListener("loadend", event => {
          this.props.onFileImport(event.target.result)
        })
        reader.readAsText(file);
      })
    }
  }

  handleCompileStrategyChange = event => {
    this.props.onCompileStrategyChange(event.key)
  }

  handleTutorialClick = () => {
    window.open('/blog/tutorial.html')
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
    const previewMenu = (
      <Menu onClick={this.handlePreviewMenuClick}>
        <Menu.Item key="full-ui-kit">Full UI Kit</Menu.Item>
        <Menu.Item key="album">Album</Menu.Item>
        <Menu.Item key="blog">Blog</Menu.Item>
        <Menu.Item key="carousel">Carousel</Menu.Item>
        <Menu.Item key="checkout">Checkout</Menu.Item>
        <Menu.Item key="cover">Cover</Menu.Item>
        <Menu.Item key="dashboard">Dashboard</Menu.Item>
        <Menu.Item key="floating-labels">Floting labels</Menu.Item>
        <Menu.Item key="grid">Grid</Menu.Item>
        <Menu.Item key="jumbotron">Jumbotron</Menu.Item>
        <Menu.Item key="navbar-bottom">Navbar bottom</Menu.Item>
        <Menu.Item key="navbar-fixed">Navbar fixed</Menu.Item>
        <Menu.Item key="navbar-static">Navbar static</Menu.Item>
        <Menu.Item key="navbars">Navbar static</Menu.Item>
        <Menu.Item key="offcanvas">Offcanvas</Menu.Item>
        <Menu.Item key="pricing">Pricing</Menu.Item>
        <Menu.Item key="product">Product</Menu.Item>
        <Menu.Item key="sign-in">Sign in</Menu.Item>
        <Menu.Item key="starter-template">Starter template</Menu.Item>
        <Menu.Item key="sticky-footer">Sticky footer</Menu.Item>
        <Menu.Item key="sticky-footer-navbar">Sticky footer navbar</Menu.Item>
        <Menu.Item key="tooltip-viewport">Tooltip viewport</Menu.Item>
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
        <div className="header__preview">
          <Dropdown overlay={previewMenu} trigger={["click"]} style={{ marginRight: 15 }}>
            {this.props.previewReady ? <Button icon="search">Preview</Button> : <Button icon="loading">Preview loading...</Button>}
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
        <div className="header__ads">
          <a href="https://a.paddle.com/click?said=58&aaid=4499&link_id=684&chk=3c56e07c7ec2dbe46b8ff13caae08217&redir=aHR0cHM6Ly9oYWNrZXJ0aGVtZXMuY29tL2Jvb3RzdHJhcC10ZW1wbGF0ZXMvY2hhcm1pbmctcHJvLw==" target="_blank">
            <div className="top">🔥 Charming Pro</div>
            <div className="bottom">A Bootstrap 4 template made for builders</div>
          </a>
        </div>
        <div className="header__import">
          <Dropdown overlay={importMenu} trigger={["click"]}>
            <Button icon="upload">
              Import
            </Button>
          </Dropdown>
        </div>
        <div className="header__import">
          <Button icon="question-circle-o" onClick={this.handleTutorialClick}>Tutorial</Button>
        </div>
      </header>
    )
  }
}

export default Header
