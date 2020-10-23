import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <h1>Hello!</h1>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
