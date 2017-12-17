import React, { Component } from 'react'
import { Menu, Dropdown, Button, Icon, message } from 'antd';

class Header extends Component {
  render() {
    const exportMenu = (
      <Menu>
        <Menu.Item key="1">SCSS Variables</Menu.Item>
        <Menu.Item key="2">Bootstrap Build</Menu.Item>
      </Menu>
    );
    return (
      <header>
        <div className="header__left">
          <img src="logo.svg" height="40" />
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
