import React, { Component } from 'react'
import './styles.css'
import 'antd/dist/antd.min.css';
import { message } from 'antd'
import debounce from 'debounce'
import SidebarElements from './sidebar-elements'
import elements from './elements'
import VariableSection from './variable-section'
import Header from './header'
import variables from './curated-variables'
import Loader from './loader'
import compiler from './compiler'
import GoogleFonts from './google-fonts.json'

const googleFontNames = GoogleFonts.map(font => font.family)

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

const download = (filename, data) => {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/text;charset=utf-8,' + encodeURI(data))
  element.setAttribute('download', filename)
  element.click()
}

class App extends Component {

  state = {
    loading: false,
    lock: false,
    active: 'Core',
    open: false,
    fontsUsed: [],
    // all bootstrap vars
    variables: JSON.parse(JSON.stringify(variables)),
    // only $variables, that are possible to reference in other variables
    // needed to generate a menu of all available vars
    referenceVars: defaultReferenceVars,
    compileStrategy: 'client',
    overwrites: {},
    htmlCode: {},
    htmlCodeOriginal: {},
    codeEditorOpen: true
  }

  async componentDidMount() {
    this.variableSection.setActive(this.state.active)
    this.compileSass()
    this.debouncedCompileSass = debounce(this.compileSass, 1000)
    this.debouncedCodeChange = debounce(this.handleCodeChange, 1000)
    window.loading_screen.finish()
    window.addEventListener('message', message => {
      if(message.data.html) {
        const newHtmlCode = this.state.htmlCode
        newHtmlCode[this.state.active] = message.data.html
        const newHtmlCodeOriginal = this.state.htmlCodeOriginal
        if(!newHtmlCodeOriginal[this.state.active]) {
          newHtmlCodeOriginal[this.state.active] = message.data.html
        }
        this.setState({
          htmlCode: newHtmlCode,
          htmlCodeOriginal: newHtmlCodeOriginal
        })
      }
    })
    window.addEventListener('beforeunload', event => {
      if(JSON.stringify(variables) !== JSON.stringify(this.state.variables)) {
        event.returnValue = 'Are you sure you want to exit? All unsaved progress will be lost.'
        return event.returnValue
      }
    })
  }

  resolveVariables = (vars, prevLength) => {
    if(prevLength === Object.keys(vars).length) {
      return vars
    }
    const out = {}
    Object.keys(vars).forEach(key => {
      const matches = vars[key].match(/\$[0a-zA-Z1-9\-_]*/)
      if(matches) {
        matches.forEach(match => {
          if(vars[match]) {
            out[match] = vars[match]
          } else if(flatten_variables[match]) {
            out[match] = flatten_variables[match]
          }
        })
      }
      out[key] = vars[key]
    })
    return this.resolveVariables(out, Object.keys(vars).length)
  }

  prepare = () => {
    const varObject = {}
    const referenceVars = {}
    Object.keys(this.state.overwrites).forEach(key => {
      varObject[key] = this.state.overwrites[key]
      if(this.state.overwrites[key].indexOf('$') !== -1) {
        referenceVars[key] = this.state.overwrites[key]
      }
    })
    const resolvedVars = this.resolveVariables(varObject)
    return {
      varObject,
      referenceVars,
      resolvedVars
    }
  }

  compileSass = async () => {
    const { resolvedVars, referenceVars } = this.prepare()
    this.setState({
      loading: true,
      referenceVars: {
        ...defaultReferenceVars,
        ...referenceVars
      }
    })
    const vars = []
    let fontsUsed = []
    const fontWeights = [300,400,700]
    Object.keys(resolvedVars).forEach(key => {
      vars.push([key, resolvedVars[key]])
      if(key.indexOf('font-family') !== -1 && resolvedVars[key].indexOf('$') === -1) {
        const fonts = resolvedVars[key].split(',').map(_ => _.trim())
        fontsUsed.push(...fonts.filter(font => googleFontNames.indexOf(font) !== -1))
      }
      if(key.indexOf('font-weight') !== -1 && Number(resolvedVars[key])) {
        if(fontWeights.indexOf(Number(resolvedVars[key])) === -1) {
          fontWeights.push(Number(resolvedVars[key]))
        }
      }
    })
    fontsUsed = fontsUsed.map(font => `${font}:${fontWeights.join(',')}`)
    let css = ''
    if(this.state.compileStrategy === 'client') {
      css = await compiler(Object.keys(resolvedVars).reduce((prev, cur) => {
        return `${prev}\n${cur}: ${resolvedVars[cur]};`
      }, ''))
      // TODO:
      // add error handling for client compile
    } else {
      const compileResponse = await (await fetch(`/app/api/compile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vars })
      })).json()
      css = compileResponse.css || ''
      if(compileResponse.error) {
        message.error(compileResponse.error_description)
      }
    }
    this.iframe.contentWindow.postMessage({
      css,
      fonts: fontsUsed,
      showCodeEditor: this.state.codeEditorOpen
    }, '*')
    this.setState({
      currentCSS: css,
      loading: false,
      fontsUsed
    })
  }

  handleSectionChange = section => {
    this.setState({
      active: section
    })
    this.variableSection.setActive(section)
  }

  handleVariableChange = (variable, active, index) => {
    const newVariables = Object.assign({}, this.state.variables)
    newVariables[active][index] = variable
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

  handleSetDefault = (varName, active, index) => {
    const newVariables = Object.assign({}, this.state.variables)
    newVariables[active][index] = variables[active][index]
    const newOverwrites = Object.assign({}, this.state.overwrites)
    delete newOverwrites[varName]
    this.setState({
      variables: newVariables,
      overwrites: newOverwrites
    })
    this.debouncedCompileSass()
  }

  handleLockChange = lock => {
    this.setState({
      lock,
      lockedTemplate: lock ? elements.find(e => e.text === this.state.active).template : ''
    })
  }

  handleFrameLoaded = () => {
    this.iframe.contentWindow.postMessage({
      css: this.state.currentCSS,
      fonts: this.state.fontsUsed,
      html: this.state.htmlCode[this.state.active],
      showCodeEditor: this.state.codeEditorOpen
    }, '*')
  }

  handleSCSSExport = () => {
    const { resolvedVars } = this.prepare()
    download('theme.scss', Object.keys(resolvedVars).reduce((prev, cur) => {
      return `${prev}\n${cur}: ${resolvedVars[cur]};`
    }, ''))
  }

  handleBootstrapBuildExport = () => {
    download('bootstrap.css', this.state.currentCSS)
  }

  handleCompileStrategyChange = strategy => {
    this.setState({
      compileStrategy: strategy
    })
  }

  handleCodeChange = code => {
    const _htmlCode = this.state.htmlCode
    _htmlCode[this.state.active] = code
    this.setState({
      htmlCode: _htmlCode
    })
    this.iframe.contentWindow.postMessage({
      html: code
    }, '*')
  }

  handleResetCode = () => {
    if(this.state.htmlCodeOriginal[this.state.active]) {
      this.iframe.contentWindow.postMessage({
        html: this.state.htmlCodeOriginal[this.state.active]
      }, '*')
      const newHtmlCode = this.state.htmlCode
      newHtmlCode[this.state.active] = this.state.htmlCodeOriginal[this.state.active]
      this.setState({
        htmlCode: newHtmlCode
      })
    }
  }

  handleCodeEditorToggle = checked => {
    this.setState({
      codeEditorOpen: checked
    })
    this.iframe.contentWindow.postMessage({
      showCodeEditor: checked
    }, '*')
  }

  handleGoogleFontSelect = font => {
    console.log('Google Font selected', font)
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
        title="iframe content"
        className="scroll-style"
        src={this.state.lockedTemplate}
        ref={ref => this.iframe = ref}
        onLoad={this.handleFrameLoaded}
      />
    } else {
      if(element) {
        iframe = <iframe
          title="iframe content"
          className="scroll-style"
          src={element.template}
          ref={ref => this.iframe = ref}
          onLoad={this.handleFrameLoaded}
        />
      }
    }
    return (
      <div className="App">
        <Header
          onTemplateLock={this.handleLockChange}
          templateLock={this.state.lock}
          onSCSSExport={this.handleSCSSExport}
          onBootstrapBuildExport={this.handleBootstrapBuildExport}
          compileStrategy={this.state.compileStrategy}
          onCompileStrategyChange={this.handleCompileStrategyChange}
          onCodeEditorToggle={this.handleCodeEditorToggle}
          codeEditorOpen={this.state.codeEditorOpen}
        />
        <SidebarElements items={_elements} onChange={this.handleSectionChange}/>
        <div className="sidebar2 scroll-style">
          <VariableSection
            ref={ref => this.variableSection = ref}
            fields={this.state.variables}
            active={this.state.active}
            referenceVars={this.state.referenceVars}
            onChange={this.handleVariableChange}
            onSetDefault={this.handleSetDefault}
            onGoogleFontSelected={this.handleGoogleFontSelect}
          />
        </div>
        <div className="preview">
          {this.state.loading && <Loader />}
          <div className="preview__content" style={{ display: this.state.loading ? 'none' : 'block' }}>
            {iframe}
          </div>
        </div>
      </div>
    );
  }
}

export default App
