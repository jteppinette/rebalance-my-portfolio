import React, { useState, useEffect } from 'react'
import Dinero from 'dinero.js'

import Numeric from './numeric'
import Investment from './investment'
import Content from './content'
import Summary from './summary'

import { dollarsToCents, centsToDollars } from './utils'

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

function App () {
  const [investments, setInvestments] = useState([
    { symbol: '', balance: 0, target: 1, rebalance: 0 }
  ])
  const [withdrawDeposit, setWithdrawDeposit] = useState(0)
  const [isDeposit, setIsDeposit] = useState(true)
  const [hasInvalidTargetAllocation, setHasInvalidTargetAllocation] = useState(
    false
  )
  const [hasInsufficientFunds, setHasInsufficientFunds] = useState(false)

  useEffect(() => {
    const currentBalance = investments.reduce(
      (sum, investment) =>
        sum.add(Dinero({ amount: dollarsToCents(investment.balance) })),
      Dinero()
    )

    const targetBalance = isDeposit
      ? currentBalance.add(Dinero({ amount: dollarsToCents(withdrawDeposit) }))
      : currentBalance.subtract(
          Dinero({ amount: dollarsToCents(withdrawDeposit) })
        )

    setHasInsufficientFunds(targetBalance.isNegative())
    setHasInvalidTargetAllocation(
      investments.reduce((sum, investment) => sum + investment.target, 0) !== 1
    )
  }, [investments, withdrawDeposit, isDeposit])

  function addInvestment () {
    setInvestments([
      ...investments,
      { symbol: '', balance: 0, target: 0, rebalance: 0 }
    ])
  }

  function removeInvestment (index) {
    setInvestments(investments.filter((investment, i) => i !== index))
  }

  function calculateRebalances (investments, withdrawDeposit, isDeposit) {
    const currentBalance = investments.reduce(
      (sum, investment) =>
        sum.add(Dinero({ amount: dollarsToCents(investment.balance) })),
      Dinero()
    )

    const targetBalance = isDeposit
      ? currentBalance.add(Dinero({ amount: dollarsToCents(withdrawDeposit) }))
      : currentBalance.subtract(
          Dinero({ amount: dollarsToCents(withdrawDeposit) })
        )

    const hasInvalidTargetAllocation =
      investments.reduce((sum, investment) => sum + investment.target, 0) !== 1

    if (hasInvalidTargetAllocation || targetBalance.isNegative()) {
      return investments.map(() => 0)
    }

    return targetBalance
      .allocate(investments.map(investment => investment.target))
      .map((allocation, index) => {
        return centsToDollars(
          allocation
            .subtract(
              Dinero({ amount: dollarsToCents(investments[index].balance) })
            )
            .getAmount()
        )
      })
  }

  function updateWithdrawDeposit (value, isDeposit) {
    const rebalances = calculateRebalances(investments, value, isDeposit)

    const rebalancedInvestments = rebalances.map((rebalance, index) => {
      return { ...investments[index], rebalance }
    })

    setInvestments(rebalancedInvestments)
    setIsDeposit(isDeposit)
    setWithdrawDeposit(value)
  }

  function updateInvestment (index, field, value) {
    const tmp = [...investments]

    tmp[index][field] = value

    const rebalances = calculateRebalances(tmp, withdrawDeposit, isDeposit)

    const rebalancedInvestments = rebalances.map((rebalance, index) => {
      return { ...tmp[index], rebalance }
    })

    setInvestments(rebalancedInvestments)
  }

  function cancelSubmit (event) {
    event.preventDefault()
    event.stopPropagation()
  }

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
                    onClick={() => updateWithdrawDeposit(0, !isDeposit)}
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
                    updateWithdrawDeposit(value, isDeposit)
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
                    update={updateInvestment.bind(this, index)}
                    remove={removeInvestment.bind(this, index)}
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

export default App
