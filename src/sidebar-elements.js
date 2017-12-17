import React, { Component } from 'react'

class SidebarElements extends Component {

  handleItemClick = event => {
    this.props.onChange(event.target.innerHTML)
  }

  render() {
    return (
      <div className="sidebar1 scroll-style">
        {this.props.items.map((item, index) => {
          return (
            <div
              key={index}
              className={item.active ? 'sidebar1__section--active' : 'sidebar1__section'}
              onClick={this.handleItemClick}
            >
              {item.text}
            </div>
          )
        })}
      </div>
    )
  }
}

export default SidebarElements
