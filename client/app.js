import React, { Component } from 'react'

import Form from './form'

class App extends Component {
  initial = [{ symbol: '', currentBalance: 0, targetAllocation: 0 }]
  state = {
    investments: this.initial
  }

  render () {
    const { investments } = this.state

    const addInvestment = this.addInvestment.bind(this),
      resetInvestments = this.resetInvestments.bind(this),
      removeInvestment = this.removeInvestment.bind(this),
      updateInvestment = this.updateInvestment.bind(this)

    return (
      <div className='container'>
        <Form
          investments={investments}
          removeInvestment={removeInvestment}
          updateInvestment={updateInvestment}
        />
        <div>
          <button onClick={addInvestment}>Add Investment</button>
          <button id='resetInvestments' onClick={resetInvestments}>
            Reset Investments
          </button>
        </div>
      </div>
    )
  }

  addInvestment () {
    this.setState({
      investments: [
        ...this.state.investments,
        { symbol: '', currentBalance: 0, targetAllocation: 0 }
      ]
    })
  }
  resetInvestments () {
    this.setState({ investments: this.initial })
  }
  removeInvestment (index) {
    this.setState({
      investments: this.state.investments.filter((investment, i) => i !== index)
    })
  }
  updateInvestment (index, field, value) {
    let investments = this.state.investments
    investments[index][field] = value
    this.setState({ investments })
  }
}

export default App
