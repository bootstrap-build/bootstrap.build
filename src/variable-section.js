import React, { Component } from 'react'
import VariableField from './variable-field.js'

class VariableSection extends Component {

  handleChange = (field, index) => {
    const fields = this.props.fields
    fields[index] = field
    this.props.onChange(fields)
  }

  render() {
    return (
      <div>
        {this.props.fields.map((field, index) => {
          return (
            <div key={index} className="sidebar2__field">
              <div className="sidebar2__field__variable">{field.variable}</div>
              <VariableField
                {...field}
                index={index}
                onChange={this.handleChange}
              />
              <div className="sidebar2__field__description" dangerouslySetInnerHTML={{ __html: field.description }} />
            </div>
          )
        })}
      </div>
    )
  }
  
}

export default VariableSection
