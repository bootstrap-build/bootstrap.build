import React, { Component } from 'react'
import './styles.css'
import 'antd/dist/antd.min.css';
import { message } from 'antd'

import debounce from 'debounce'

import SidebarElements from './sidebar-elements'
import elements from './elements'
import VariableSection from './variable-section'
import PreviewMenu from './preview-menu'
import Header from './header'
import variables from './curated-variables'
import Loader from './loader'
import compiler from './compiler'



const flatten_variables = {}
Object.keys(variables).forEach(key => {
  variables[key].forEach(_var => {
    flatten_variables[_var.variable] = _var.value
  })
})

const defaultReferenceVars = {}
Object.keys(variables).forEach(key => {
  variables[key].forEach(variable => {
    defaultReferenceVars[variable.variable] = variable.value
  })
})

class App extends Component {

  state = {
    loading: false,
    lock: false,
    active: 'Buttons',
    code: '',
    color: '#fff',
    open: false,
    showDocs: false,
    // all bootstrap vars
    variables: variables['Buttons'],
    // only $variables, that are possible to reference in other variables
    // needed to generate a menu of all available vars
    referenceVars: defaultReferenceVars,
    overwrites: {}
  }

  handleButtonClick = () => {
    this.compileSass()
  }

  resolveVariables = (vars, prevLength) => {
    if(prevLength === Object.keys(vars).length) {
      return vars
    }
    const out = {}
    Object.keys(vars).forEach(key => {
      if(vars[vars[key]]) {
        out[vars[key]] = vars[vars[key]]
      } else if(flatten_variables[vars[key]]) {
        out[vars[key]] = flatten_variables[vars[key]]
      }
      out[key] = vars[key]
    })
    return this.resolveVariables(out, Object.keys(vars).length)
  }

  compileSass = async () => {
    this.setState({ loading: true })
    const varObject = {}
    const referenceVars = {}
    Object.keys(this.state.overwrites).forEach(key => {
      varObject[key] = this.state.overwrites[key]
      if(this.state.overwrites[key].indexOf('$') === 0) {
        referenceVars[key] = this.state.overwrites[key]
      }
    })
    this.setState({
      referenceVars: {
        ...defaultReferenceVars,
        ...referenceVars
      }
    })
    let resolvedVars = this.resolveVariables(varObject)
    const vars = Object.keys(resolvedVars).map(key => [key, resolvedVars[key]])
    const css = await (await fetch(`http://127.0.0.1:8080/bootstrap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vars
      })
    })).json()
    if(css.css) {
      this.iframe.contentWindow.postMessage({ css: css.css }, '*')
      this.setState({
        currentCSS: css.css,
        loading: false
      })
    }
    if(css.error) {
      message.error(css.error_description)
    }
  }

  async componentDidMount() {
    // register all variables
    this.compileSass()
    this.debouncedCompileSass = debounce(this.compileSass, 500)
  }

  handleSectionChange = section => {
    this.setState({
      active: section,
      variables: variables[section] || []
    })
  }

  handleVariableChange = (variable, index) => {
    const newVariables = [...this.state.variables]
    newVariables[index] = variable
    const overwriteObj = {}
    overwriteObj[variable.variable] = variable.value
    this.setState({
      variables: newVariables,
      overwrites: {
        ...this.state.overwrites,
        ...overwriteObj
      }
    })
    this.debouncedCompileSass()
  }

  handleLockChange = lock => {
    this.setState({
      lock,
      lockedTemplate: lock ? elements.find(e => e.text === this.state.active).template : null
    })
  }

  handleFrameLoaded = () => {
    this.iframe.contentWindow.postMessage({ css: this.state.currentCSS }, '*')
  }

  handleShowDocsToggle = () => {
    this.iframe.contentWindow.postMessage({ toggleCode: true }, '*')
    this.setState({
      showDocs: !this.state.showDocs
    })
  }

  render() {
    const _elements = elements.map(element => {
      return {
        ...element,
        active: element.text === this.state.active
      }
    })
    const element = elements.find(element => element.text === this.state.active)
    let iframe = ''
    if(this.state.lock) {
      iframe = <iframe
        src={this.state.lockedTemplate}
        ref={ref => this.iframe = ref}
        onLoad={this.handleFrameLoaded}
      />
    } else {
      if(element) {
        iframe = <iframe
          src={element.template}
          ref={ref => this.iframe = ref}
          onLoad={this.handleFrameLoaded}
        />
      }
    }
    return (
      <div className="App">
        <Header />
        <SidebarElements items={_elements} onChange={this.handleSectionChange}/>
        <div className="sidebar2">
          <VariableSection
            fields={this.state.variables}
            referenceVars={this.state.referenceVars}
            onChange={this.handleVariableChange}
          />
        </div>
        <div className="preview">
          <PreviewMenu
            lock={this.state.lock}
            onLockChange={this.handleLockChange}
            onShowDocsToggle={this.handleShowDocsToggle}
            showDocs={this.showDocs}
          />
          {this.state.loading && <Loader />}
          <div className={this.state.loading ? "preview__content blur" : "preview__content"}>
            {iframe}
          </div>
        </div>
      </div>
    );
  }
}

export default App
