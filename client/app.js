import React, { Component } from 'react'

function Investment ({
  index,
  symbol,
  balance,
  target,
  update,
  remove,
  isRemoveDisabled
}) {
  return (
    <tr>
      <td>
        <input
          type='text'
          name={`symbol-${index}`}
          value={symbol}
          onChange={update}
        />
      </td>
      <td>
        <input
          type='number'
          name={`balance-${index}`}
          value={balance}
          onChange={update}
        />
      </td>
      <td>
        <input
          type='number'
          name={`target-${index}`}
          value={target}
          onChange={update}
        />
      </td>
      <td></td>
      <td className='text-center'>
        <button type='button' onClick={remove} disabled={isRemoveDisabled}>
          -
        </button>
      </td>
    </tr>
  )
}

class App extends Component {
  initial = [{ symbol: '', balance: 0, target: 0 }]
  state = {
    investments: this.initial
  }

  render () {
    const { investments } = this.state

    const addInvestment = this.addInvestment.bind(this),
      cancelSubmit = this.cancelSubmit.bind(this)

    return (
      <div className='container'>
        <form onSubmit={cancelSubmit}>
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
                  <Investment
                    key={index}
                    index={index}
                    symbol={investment.symbol}
                    balance={investment.balance}
                    target={investment.target}
                    update={this.updateInvestment.bind(this, index)}
                    remove={this.removeInvestment.bind(this, index)}
                    isRemoveDisabled={investments.length <= 1}
                  />
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
        { symbol: '', balance: 0, target: 0 }
      ]
    })
  }
  removeInvestment (index) {
    this.setState({
      investments: this.state.investments.filter((investment, i) => i !== index)
    })
  }
  updateInvestment (index, element) {
    const { name, value } = event.target
    const [field] = name.split('-')

    this.state.investments[index][field] = value

    this.setState({ investments: this.state.investments })
  }
  cancelSubmit (event) {
    event.preventDefault()
    event.stopPropagation()
  }
}

export default App
