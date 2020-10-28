import React, { Component } from 'react'

class App extends Component {
  initial = [{ symbol: '', currentBalance: 0, targetAllocation: 0 }]
  state = {
    investments: this.initial
  }

  render () {
    const { investments } = this.state

    const addInvestment = this.addInvestment.bind(this),
      removeInvestment = this.removeInvestment.bind(this),
      updateInvestment = this.updateInvestment.bind(this),
      handleSubmit = this.handleSubmit.bind(this),
      handleChange = this.handleChange.bind(this)

    return (
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <table className='striped-table'>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Current Balance</th>
                <th>Target Allocation</th>
                <th>Rebalance</th>
                <th className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type='text'
                        name={`symbol-${index}`}
                        value={investment.symbol}
                        id={`symbol-${index}`}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type='number'
                        name={`currentBalance-${index}`}
                        value={investment.currentBalance}
                        id={`currentBalance-${index}`}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type='number'
                        name={`targetAllocation-${index}`}
                        value={investment.targetAllocation}
                        id={`targetAllocation-${index}`}
                        onChange={handleChange}
                      />
                    </td>
                    <td></td>
                    <td className='text-center'>
                      <button
                        type='button'
                        onClick={() => removeInvestment(index)}
                        disabled={investments.length <= 1}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </form>
        <div>
          <button onClick={addInvestment}>Add Investment</button>
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
  handleChange (event) {
    const { name, value } = event.target
    const [field, index] = name.split('-')
    this.updateInvestment(index, field, value)
  }
  handleSubmit (event) {
    event.preventDefault()
    event.stopPropagation()
  }
}

export default App
