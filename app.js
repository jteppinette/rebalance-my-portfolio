import React, { Component } from 'react'
import Dinero from 'dinero.js'

import Numeric from './numeric'
import Investment from './investment'
import Content from './content'
import Summary from './summary'

import {
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Table,
  Button,
  Navbar,
  NavbarBrand,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'

class App extends Component {
  initial = [{ symbol: '', balance: 0, target: 1, rebalance: 0 }]
  state = {
    investments: this.initial,
    withdrawDeposit: 0,
    isDeposit: true,
    hasInvalidTargetAllocation: false,
    hasInsufficientFunds: false
  }

  render () {
    const {
      investments,
      withdrawDeposit,
      isDeposit,
      hasInvalidTargetAllocation,
      hasInsufficientFunds
    } = this.state

    const addInvestment = this.addInvestment.bind(this),
      cancelSubmit = this.cancelSubmit.bind(this)

    return (
      <div>
        <Navbar dark className='bg-dark'>
          <NavbarBrand className='mx-auto'>Rebalance My Portfolio</NavbarBrand>
        </Navbar>
        <Container>
          <Form onSubmit={cancelSubmit}>
            <FormGroup row className='justify-content-between'>
              <Col sm='12' md='auto'>
                <Label className='sr-only' htmlFor='deposit'>
                  Deposit
                </Label>
                <InputGroup>
                  <InputGroupAddon addonType='prepend'>
                    <Button
                      color='secondary'
                      type='button'
                      onClick={() => this.updateWithdrawDeposit(0, !isDeposit)}
                    >
                      <i className='fas fa-exchange-alt'></i>
                    </Button>
                    <InputGroupText>
                      {isDeposit ? 'Deposit' : 'Withdraw'}
                    </InputGroupText>
                  </InputGroupAddon>
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
                </InputGroup>
                <small className='form-text text-muted'>
                  {isDeposit
                    ? 'Provide a deposit amount to be rebalanced into your portfolio.'
                    : 'Provide a withdraw amount which will be rebalanced out of your portfolio.'}
                  <br />
                  This is not required.
                </small>
              </Col>
            </FormGroup>
          </Form>
          <Form onSubmit={cancelSubmit}>
            <Table responsive striped bordered className='table-sm-sm'>
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
            </Table>
          </Form>
          {hasInvalidTargetAllocation && (
            <Card className='text-center mb-3'>
              <CardBody>
                <CardTitle tag='h5' className='text-warning'>
                  Fully Allocate Portfolio
                </CardTitle>
                <CardText className='text-muted'>
                  The sum of each investment's target allocation must equal 100%
                  before the portfolio can be properly rebalanced.
                </CardText>
              </CardBody>
            </Card>
          )}
          {hasInsufficientFunds && (
            <Card className='text-center mb-3'>
              <CardBody className='card-body'>
                <CardTitle tag='h5' className='text-warning'>
                  Insufficient Funds
                </CardTitle>
                <CardText className='text-muted'>
                  Your portfolio balance is less than the withdraw amount.
                </CardText>
              </CardBody>
            </Card>
          )}
          <Button onClick={addInvestment} color='dark' block>
            <i className='fas fa-plus'></i> Add Investment
          </Button>
          <hr />
          <Summary
            investments={investments}
            withdrawDeposit={withdrawDeposit}
            isDeposit={isDeposit}
          />
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
        </Container>
      </div>
    )
  }
  validate () {
    const { investments, withdrawDeposit, isDeposit } = this.state

    const hasInvalidTargetAllocation =
      investments.reduce((sum, investment) => sum + investment.target, 0) !== 1

    const currentBalance = investments.reduce(
      (sum, investment) =>
        sum.add(Dinero({ amount: investment.balance * 100 })),
      Dinero()
    )

    const targetBalance = isDeposit
      ? currentBalance.add(Dinero({ amount: withdrawDeposit * 100 }))
      : currentBalance.subtract(Dinero({ amount: withdrawDeposit * 100 }))

    const hasInsufficientFunds = targetBalance.isNegative()

    this.setState({ hasInvalidTargetAllocation, hasInsufficientFunds })
  }
  addInvestment () {
    const { investments } = this.state

    this.setState({
      investments: [
        ...investments,
        { symbol: '', balance: 0, target: 0, rebalance: 0 }
      ]
    })
  }
  removeInvestment (index) {
    this.setState(
      {
        investments: this.state.investments.filter(
          (investment, i) => i !== index
        )
      },
      this.validate
    )
  }
  calculateRebalances (investments, withdrawDeposit, isDeposit) {
    const currentBalance = investments.reduce(
      (sum, investment) =>
        sum.add(Dinero({ amount: investment.balance * 100 })),
      Dinero()
    )

    const targetBalance = isDeposit
      ? currentBalance.add(Dinero({ amount: withdrawDeposit * 100 }))
      : currentBalance.subtract(Dinero({ amount: withdrawDeposit * 100 }))

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
    const { investments } = this.state

    const rebalances = this.calculateRebalances(
      this.state.investments,
      value,
      isDeposit
    )

    Object.entries(rebalances).forEach(([index, rebalance]) => {
      investments[index].rebalance = rebalance
    })

    this.setState(
      {
        investments: investments,
        withdrawDeposit: value,
        isDeposit
      },
      this.validate
    )
  }
  updateInvestment (index, field, value) {
    const { investments, withdrawDeposit, isDeposit } = this.state

    investments[index][field] = value

    const rebalances = this.calculateRebalances(
      investments,
      withdrawDeposit,
      isDeposit
    )

    Object.entries(rebalances).forEach(([index, rebalance]) => {
      investments[index].rebalance = rebalance
    })

    this.setState({ investments: investments }, this.validate)
  }
  cancelSubmit (event) {
    event.preventDefault()
    event.stopPropagation()
  }
}

export default App
