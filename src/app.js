import React, { Component } from 'react'
import './styles.css'
import 'antd/dist/antd.min.css';

import debounce from 'debounce'

import SidebarElements from './sidebar-elements'
import elements from './elements'
import VariableSection from './variable-section'
import PreviewMenu from './preview-menu'
import Header from './header'
import variables from './curated-variables'
import Loader from './loader'
import compiler from './compiler'


class App extends Component {

  state = {
    loading: false,
    lock: false,
    active: 'Buttons',
    code: '',
    color: '#fff',
    open: false,
    variables: variables['Buttons'],
    overwrites: {}
  }

  handleButtonClick = () => {
    this.compileSass()
  }

  compileSass = async () => {
    this.setState({ loading: true })
    let varObject = {}
    Object.keys(this.state.overwrites).forEach(key => {
      varObject[key] = this.state.overwrites[key]
    })
    const css = await (await fetch(`http://127.0.0.1:8080/bootstrap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(varObject)
    })).text()
    this.iframe.contentWindow.postMessage({ css }, '*')
    this.setState({
      currentCSS: css,
      loading: false
    })
  }

  async componentDidMount() {
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
            onChange={this.handleVariableChange}
          />
        </div>
        <div className="preview">
          <PreviewMenu
            lock={this.state.lock}
            onLockChange={this.handleLockChange}
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
