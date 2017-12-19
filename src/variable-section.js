import React, { Component } from 'react'
import Field from './field.js'

class VariableSection extends Component {

  handleChange = (field, index) => {
    this.props.onChange({
      type: field.type,
      value: field.value,
      variable: field.variable,
      description: field.description
    }, index)
  }

  handleSetDefault = (varName, index) => {
    this.props.onSetDefault(varName, index)
  }

  render() {
    return (
      <div>
        {this.props.fields.map((field, index) => {
          return (
            <div key={`${index}${field.variable}`} className="sidebar2__field">
              <div className="sidebar2__field__variable">{field.variable}</div>
              <Field
                referenceVars={this.props.referenceVars}
                {...field}
                index={index}
                onChange={this.handleChange}
                onSetDefault={this.handleSetDefault}
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
