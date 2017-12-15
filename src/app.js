import React, { Component } from 'react'
import './styles.css'
import 'antd/dist/antd.min.css';

import debounce from 'debounce'

import SidebarElements from './sidebar-elements'
import elements from './elements'
import VariableSection from './variable-section'
import PreviewMenu from './preview-menu'
import Header from './header'
import variables from './variables'
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
    variables: variables['Buttons']
  }

  handleButtonClick = () => {
    this.compileSass()
  }

  compileSass = async () => {
    this.setState({ loading: true })
    const code = this.state.variables.map(variable => `${variable.variable}: ${variable.value};`).join('\n')
    const css = await compiler(code, '/bootstrap_scss')
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
      variables: variables[section]
    })
  }

  handleVariableChange = variables => {
    this.setState({
      variables
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
