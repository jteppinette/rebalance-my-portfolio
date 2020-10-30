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
          className='form-control'
        />
      </td>
      <td>
        <Numeric
          type='text'
          name={`balance-${index}`}
          value={balance}
          onChange={(event, value) => update('balance', value)}
          predefined='dollar'
          className='form-control'
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
          className='form-control'
        />
      </td>
      <td></td>
      <td className='text-center align-middle'>
        <button
          type='button'
          onClick={remove}
          disabled={isRemoveDisabled}
          className='btn btn-danger'
        >
          <i className='fas fa-minus'></i>
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
      <div>
        <nav className='navbar navbar-dark bg-dark'>
          <div className='navbar-brand mx-auto'>Rebalance My Portfolio</div>
        </nav>
        <div className='container'>
          <form onSubmit={cancelSubmit}>
            <div className='form-row justify-content-between'>
              <div className='col-sm-12 col-md-auto'>
                <label className='sr-only' htmlFor='deposit'>
                  Deposit
                </label>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <div className='input-group-text'>Deposit</div>
                  </div>
                  <Numeric
                    type='text'
                    name='deposit'
                    value={deposit}
                    onChange={(event, value) =>
                      this.setState({ deposit: value })
                    }
                    predefined='dollar'
                    className='form-control'
                  />
                </div>
                <small className='form-text text-muted'>
                  Provide a deposit amount to be rebalanced into your portfolio.
                  <br />
                  This is not required.
                </small>
              </div>
            </div>
          </form>
          <form onSubmit={cancelSubmit}>
            <div className='table-responsive'>
              <table className='table table-striped table-bordered'>
                <thead className='thead-dark'>
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
            </div>
          </form>
          <button onClick={addInvestment} className='btn btn-dark btn-block'>
            <i className='fas fa-plus'></i> Add Investment
          </button>
          <hr />
          <p className='text-muted'>
            Enter your portfolio's investments. Your required rebalance will be
            automatically calculated for each investment.
          </p>
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
