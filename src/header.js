import React, { Component } from 'react'
import { Menu, Dropdown, Button, Icon, message } from 'antd';

class Header extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1">Login Screens</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );
    return (
      <header>
        <div className="header__left">
          <img src="logo.svg" height="40" />
        </div>
        <div className="header__right">
          <Dropdown overlay={menu}>
            <Button style={{ marginRight: 15 }}>
              Preview <Icon type="down" />
            </Button>
          </Dropdown>
          <Button type="primary" icon="download">Download .SCSS</Button>
        </div>
      </header>
    )
  }
}

export default Header
