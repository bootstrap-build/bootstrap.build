import React, { Component } from 'react'
import './styles.css'
import 'antd/dist/antd.min.css';
import Sass from 'sass.js/dist/sass.js'

import debounce from 'debounce'
import { BounceLoader } from 'react-spinners'

import SidebarElements from './sidebar-elements.js'
import elements from './elements.js'
import VariableSection from './variable-section.js'
import PreviewMenu from './preview-menu.js'
import Header from './header.js'
import variables from './variables.js'

Sass.setWorkerUrl('/sass.worker.js');
const sass = new Sass()

const cache = {}

class App extends Component {

  state = {
    loading: false,
    activeSection: 'Core settings',
    code: '',
    color: '#fff',
    open: false,
    variables: variables['Core settings']
  }

  handleButtonClick = () => {
    this.compileSass()
  }

  compileSass = async () => {
    this.setState({
      loading: true
    })
    const code = this.state.variables.map(variable => `${variable.variable}: ${variable.value};`).join('\n')
    const bootstrap = await (await fetch('/bootstrap_scss/bootstrap.scss')).text()
    sass.compile(code + ' ' + bootstrap, result => {
      this.iframe.contentWindow.postMessage({
        css: result.text
      }, '*')
      this.setState({
        loading: false
      })
    });
    sass.importer(async function(request, done) {
      const pathArr = request.current.split('/')
      const path = pathArr.reduce((prev, current, index) => {
        if(current.length === 1) {
          return `_${current}.scss`
        } else {
          if(index === pathArr.length - 1) {
            return `${prev}/_${current}.scss`
          } else {
            return `${prev}/${current}`
          }
        }
      }, '')
      if(cache[path]) {
        return done({
          content: cache[path]
        })
      }
      const partial = await (await (fetch(`/bootstrap_scss/${path}`))).text()
      cache[path] = partial
      return done({
        content: partial
      })
    })
  }

  async componentDidMount() {
    this.compileSass()
    this.debouncedCompileSass = debounce(this.compileSass, 500)
  }

  handleSectionChange = section => {
    this.setState({
      activeSection: section,
      variables: variables[section]
    })
  }

  handleVariableChange = variables => {
    this.setState({
      variables
    })
    this.debouncedCompileSass()
  }

  render() {

    const _elements = elements.map(element => {
      return {
        ...element,
        active: element.text === this.state.activeSection
      }
    })


    const element = elements.find(element => element.text === this.state.activeSection)

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
          <PreviewMenu />
          <div className="preview__content preview__loader" style={{ display: this.state.loading ? 'block' : 'none'}}>
            <div style={{ width: 60, textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <BounceLoader size={60} color={`#9EDCFF`} />
              Compiling...
            </div>
          </div>
          <div className={this.state.loading ? "preview__content blur" : "preview__content"}>
            {element && <iframe src={element.template} ref={ref => this.iframe = ref} />}
          </div>
        </div>
      </div>
    );
  }
}

export default App
