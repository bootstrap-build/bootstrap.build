import React, { Component } from 'react'
import { Button, Tooltip } from 'antd'
import AceEditor from 'react-ace'

import 'brace/mode/html'
import 'brace/theme/textmate'

class CodeEditor extends Component {

  handleChange = value => {
    this.props.onCodeChange(value)
  }

  handleLoad = instance => {
    instance.getSession().setScrollTop(0)
  }

  render() {
    return (
      <div className="code-editor">
        <AceEditor
          mode="html"
          style={{
            width: '100%'
          }}
          theme="textmate"
          onChange={this.handleChange}
          onLoad={this.handleLoad}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.props.code}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}/>
        <Tooltip placement="bottom" title={`Revert to default code for this template`}>
          <Button
            type="primary"
            onClick={this.props.onResetCode}
            shape="circle"
            icon="close"
            style={{
              position: 'absolute',
              top: 10,
              right: 10
            }}
          />
        </Tooltip>
      </div>
    )
  }
}

export default CodeEditor
