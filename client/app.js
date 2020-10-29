import React, { Component } from 'react'
import Numeric from './numeric'

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
          onChange={event => update('symbol', event.target.value)}
        />
      </td>
      <td>
        <Numeric
          type='text'
          name={`balance-${index}`}
          value={balance}
          onChange={(event, value) => update('balance', value)}
          predefined='dollar'
        />
      </td>
      <td>
        <Numeric
          type='text'
          name={`target-${index}`}
          value={target}
          onChange={(event, value) => update('target', value)}
          predefined='percentageUS2dec'
          minimumValue={0}
          maximumValue={100}
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
    investments: this.initial,
    deposit: 0
  }

  render () {
    const { investments, deposit } = this.state

    const addInvestment = this.addInvestment.bind(this),
      cancelSubmit = this.cancelSubmit.bind(this)

    return (
      <div className='container'>
        <form onSubmit={cancelSubmit}>
          <label htmlFor='deposit'>Deposit</label>
          <Numeric
            type='text'
            name='deposit'
            value={deposit}
            onChange={(event, value) => this.setState({ deposit: value })}
            predefined='dollar'
          />
        </form>
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
  updateInvestment (index, field, value) {
    this.state.investments[index][field] = value
    this.setState({ investments: this.state.investments })
  }
  cancelSubmit (event) {
    event.preventDefault()
    event.stopPropagation()
  }
}

export default App
