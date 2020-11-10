import React, { Component } from 'react'
import Dinero from 'dinero.js'

import Numeric from './numeric'
import Investment from './investment'
import Content from './content'

class App extends Component {
  initial = [{ symbol: '', balance: 0, target: 1, rebalance: 0 }]
  state = {
    investments: this.initial,
    withdrawDeposit: 0,
    isDeposit: true
  }

  render () {
    const { investments, withdrawDeposit, isDeposit } = this.state

    const addInvestment = this.addInvestment.bind(this),
      cancelSubmit = this.cancelSubmit.bind(this)

    const hasInvalidTargetAllocation =
      investments.reduce((sum, investment) => sum + investment.target, 0) !== 1

    const existingBalance = investments.reduce(
      (sum, investment) =>
        sum.add(Dinero({ amount: investment.balance * 100 })),
      Dinero()
    )

    const targetBalance = isDeposit
      ? existingBalance.add(Dinero({ amount: withdrawDeposit * 100 }))
      : existingBalance.subtract(Dinero({ amount: withdrawDeposit * 100 }))

    const hasInsufficientFunds = targetBalance.isNegative()

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
                    <button
                      className='btn btn-secondary'
                      type='button'
                      onClick={() => this.updateWithdrawDeposit(0, !isDeposit)}
                    >
                      <i className='fas fa-exchange-alt'></i>
                    </button>
                    <div className='input-group-text'>
                      {isDeposit ? 'Deposit' : 'Withdraw'}
                    </div>
                  </div>
                  <Numeric
                    key={isDeposit}
                    type='text'
                    name='deposit'
                    value={withdrawDeposit}
                    onChange={(event, value) =>
                      this.updateWithdrawDeposit(value, isDeposit)
                    }
                    predefined='dollar'
                    minimumValue={0}
                    className='form-control'
                  />
                </div>
                <small className='form-text text-muted'>
                  {isDeposit
                    ? 'Provide a deposit amount to be rebalanced into your portfolio.'
                    : 'Provide a withdraw amount which will be rebalanced out of your portfolio.'}
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
          {hasInsufficientFunds && (
            <div className='card text-center mb-3'>
              <div className='card-body'>
                <h5 className='card-title text-warning'>Insufficient Funds</h5>
                <p className='card-text text-muted'>
                  Your {existingBalance.toFormat()} portfolio balance is less
                  than the withdraw amount.
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
          <div className='text-center mb-3'>
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
  calculateRebalances (investments, withdrawDeposit, isDeposit) {
    const existingBalance = investments.reduce(
      (sum, investment) =>
        sum.add(Dinero({ amount: investment.balance * 100 })),
      Dinero()
    )

    const targetBalance = isDeposit
      ? existingBalance.add(Dinero({ amount: withdrawDeposit * 100 }))
      : existingBalance.subtract(Dinero({ amount: withdrawDeposit * 100 }))

    const hasInvalidTargetAllocation =
      investments.reduce((sum, investment) => sum + investment.target, 0) !== 1

    if (hasInvalidTargetAllocation || targetBalance.isNegative()) {
      return investments.map(() => 0)
    }

    return targetBalance
      .allocate(investments.map(investment => investment.target))
      .map((allocation, index) => {
        return (
          allocation
            .subtract(Dinero({ amount: investments[index].balance * 100 }))
            .getAmount() / 100
        )
      })
  }
  updateWithdrawDeposit (value, isDeposit) {
    const rebalances = this.calculateRebalances(
      this.state.investments,
      value,
      isDeposit
    )

    Object.entries(rebalances).forEach(([index, rebalance]) => {
      this.state.investments[index].rebalance = rebalance
    })

    this.setState({
      investments: this.state.investments,
      withdrawDeposit: value,
      isDeposit
    })
  }
  updateInvestment (index, field, value) {
    this.state.investments[index][field] = value

    const rebalances = this.calculateRebalances(
      this.state.investments,
      this.state.withdrawDeposit,
      this.state.isDeposit
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
