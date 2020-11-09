import React, { Component } from 'react'
import Dinero from 'dinero.js'

import Numeric from './numeric'
import Investment from './investment'
import Content from './content'

class App extends Component {
  initial = [{ symbol: '', balance: 0, target: 1, rebalance: 0 }]
  state = {
    investments: this.initial,
    deposit: 0
  }

  render () {
    const { investments, deposit } = this.state

    const addInvestment = this.addInvestment.bind(this),
      cancelSubmit = this.cancelSubmit.bind(this)

    const hasInvalidTargetAllocation =
      investments.reduce((sum, investment) => sum + investment.target, 0) !== 1

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
                    onChange={(event, value) => this.updateDeposit(value)}
                    predefined='dollar'
                    minimumValue={0}
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
              <table className='table table-striped table-bordered table-sm-sm'>
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
                        rebalance={investment.rebalance}
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
          {hasInvalidTargetAllocation && (
            <div className='card text-center mb-3'>
              <div className='card-body'>
                <h5 className='card-title text-warning'>
                  Fully Allocate Portfolio
                </h5>
                <p className='card-text text-muted'>
                  The sum of each investment's target allocation must equal 100%
                  before the portfolio can be properly rebalanced.
                </p>
              </div>
            </div>
          )}
          <button onClick={addInvestment} className='btn btn-dark btn-block'>
            <i className='fas fa-plus'></i> Add Investment
          </button>
          <hr />
          <Content />
          <hr />
          <div className='text-center'>
            <small className='text-muted'>
              If you have any questions or feedback, please reach out at{' '}
              <a href='mailto:jteppinette@jteppinette.com'>
                jteppinette@jteppinette.com
              </a>
              . All code is open sourced and available for audit or modification
              at{' '}
              <a href='https://github.com/jteppinette/rebalance-my-portfolio'>
                GitHub
              </a>
              .
            </small>
          </div>
        </div>
      </div>
    )
  }

  addInvestment () {
    this.setState({
      investments: [
        ...this.state.investments,
        { symbol: '', balance: 0, target: 0, rebalance: 0 }
      ]
    })
  }
  removeInvestment (index) {
    this.setState({
      investments: this.state.investments.filter((investment, i) => i !== index)
    })
  }
  calculateRebalances (investments, deposit) {
    const totalBalance = investments
      .reduce(
        (sum, investment) =>
          sum.add(Dinero({ amount: investment.balance * 100 })),
        Dinero()
      )
      .add(Dinero({ amount: deposit * 100 }))

    if (totalBalance.isZero()) {
      return investments.map(() => 0)
    }

    const hasInvalidTargetAllocation =
      investments.reduce((sum, investment) => sum + investment.target, 0) !== 1

    if (hasInvalidTargetAllocation) {
      return investments.map(() => undefined)
    }

    return totalBalance
      .allocate(investments.map(investment => investment.target))
      .map((allocation, index) => {
        return (
          allocation
            .subtract(Dinero({ amount: investments[index].balance * 100 }))
            .getAmount() / 100
        )
      })
  }
  updateDeposit (deposit) {
    const rebalances = this.calculateRebalances(this.state.investments, deposit)

    Object.entries(rebalances).forEach(([index, rebalance]) => {
      this.state.investments[index].rebalance = rebalance
    })

    this.setState({ investments: this.state.investments, deposit: deposit })
  }
  updateInvestment (index, field, value) {
    this.state.investments[index][field] = value

    const rebalances = this.calculateRebalances(
      this.state.investments,
      this.state.deposit
    )

    Object.entries(rebalances).forEach(([index, rebalance]) => {
      this.state.investments[index].rebalance = rebalance
    })

    this.setState({ investments: this.state.investments })
  }
  cancelSubmit (event) {
    event.preventDefault()
    event.stopPropagation()
  }
}

export default App
