import React, { Component } from 'react'
import { BounceLoader } from 'react-spinners'

class Loader extends Component {
  render() {
    return (
      <div className="preview__content preview__loader">
        <div style={{ width: 60, textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <BounceLoader size={60} color={`#9EDCFF`} />
          Compiling...
        </div>
      </div>
    )
  }
}

export default Loader
