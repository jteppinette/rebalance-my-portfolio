import React, { useState, useEffect, useRef } from 'react'
import Dinero from 'dinero.js'
import NumberFormat from 'react-number-format'

import Content from './content'
import Investment from './investment'
import Summary from './summary'
import {
  InvalidTargetAllocationAlert,
  InsufficientFundsAlert
} from './alerts.js'
import {
  getEmptyRebalances,
  getPerfectRebalances,
  getLazyRebalances
} from './algorithms.js'

import { dollarsToCents } from './utils'

import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Navbar,
  NavbarBrand,
  Table,
  UncontrolledTooltip
} from 'reactstrap'

function App () {
  const initialInvestments = [
    { symbol: 'VBTLX', balance: 1603, target: 20 },
    { symbol: 'VTSAX', balance: 8320, target: 80 }
  ]

  const [investments, setInvestments] = useState(initialInvestments)
  const [withdrawDeposit, setWithdrawDeposit] = useState(500)
  const [isDeposit, setIsDeposit] = useState(true)

  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setWithdrawDeposit(0)
    }
  }, [isDeposit])

  const currentBalance = investments.reduce(
    (sum, investment) =>
      sum.add(Dinero({ amount: dollarsToCents(investment.balance || 0) })),
    Dinero()
  )
  const transfer = Dinero({
    amount: dollarsToCents(withdrawDeposit || 0) * (isDeposit ? 1 : -1)
  })
  const targetBalance = currentBalance.add(transfer)
  const hasInsufficientFunds = targetBalance.isNegative()
  const hasInvalidTargetAllocation =
    investments.reduce(
      (sum, investment) => sum + (investment.target || 0),
      0
    ) !== 100
  const rebalances = (() => {
    if (hasInvalidTargetAllocation || hasInsufficientFunds) {
      return getEmptyRebalances(investments)
    } else if (transfer.isZero()) {
      return getPerfectRebalances(targetBalance, investments)
    } else {
      return getLazyRebalances(
        isDeposit,
        Dinero({ amount: dollarsToCents(withdrawDeposit || 0) }),
        targetBalance,
        investments
      )
    }
  })()
  const allocations = (() => {
    if (hasInvalidTargetAllocation || hasInsufficientFunds) {
      return rebalancesmap(() => 0)
    }
    return rebalances
      .map(v => Dinero({ amount: dollarsToCents(v) }))
      .map((rebalance, index) => {
        const balance = Dinero({
          amount: dollarsToCents(investments[index].balance || 0)
        })
        return balance.add(rebalance)
      })
      .map(rebalanced => rebalanced.getAmount() / targetBalance.getAmount())
  })()
  const missesTargetAllocation = (() => {
    if (hasInvalidTargetAllocation || hasInsufficientFunds) {
      return false
    }
    return targetBalance
      .allocate(investments.map(investment => investment.target || 0))
      .some((allocation, index) => {
        const rebalance = Dinero({
          amount: dollarsToCents(rebalances[index])
        })
        const balance = Dinero({
          amount: dollarsToCents(investments[index].balance || 0)
        })
        const rebalanced = balance.add(rebalance)

        return rebalanced.lessThan(allocation)
      })
  })()

  function addInvestment () {
    setInvestments([...investments, { symbol: '', balance: 0, target: 0 }])
  }
  function removeInvestment (index) {
    setInvestments(investments.filter((investment, i) => i !== index))
  }
  function updateInvestment (index, field, value) {
    const tmp = [...investments]
    tmp[index][field] = value
    setInvestments(tmp)
  }

  return (
    <div>
      <Navbar dark className='bg-dark'>
        <NavbarBrand className='mx-auto'>Rebalance My Portfolio</NavbarBrand>
      </Navbar>
      <Container>
        <Form>
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
                    onClick={() => setIsDeposit(!isDeposit)}
                  >
                    <i className='fas fa-exchange-alt'></i>
                  </Button>
                  <InputGroupText>
                    {isDeposit ? 'Deposit' : 'Withdraw'}
                  </InputGroupText>
                </InputGroupAddon>
                <NumberFormat
                  name='withdrawDeposit'
                  type='tel'
                  value={withdrawDeposit}
                  onValueChange={({ floatValue }) =>
                    setWithdrawDeposit(floatValue)
                  }
                  decimalScale={2}
                  thousandSeparator={true}
                  prefix={'$'}
                  allowNegative={false}
                  className={`form-control ${missesTargetAllocation &&
                    'is-invalid-warning'}`}
                />
              </InputGroup>
              {missesTargetAllocation && (
                <small className='form-text text-warning'>
                  The transfer amount is not high enough to reach the target
                  allocation.
                </small>
              )}
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
        <Table responsive striped bordered className='table-sm-sm'>
          <thead className='thead-dark'>
            <tr>
              <th>Symbol</th>
              <th>
                <span className='d-md-block d-none'>Current Balance</span>
                <span className='d-md-none d-block'>Balance</span>
              </th>
              <th>
                <span className='d-md-block d-none'>Target Allocation</span>
                <span className='d-md-none d-block'>Target</span>
              </th>
              <th>Rebalance</th>
              <th className='d-none d-md-table-cell'>Rebalanced Allocation</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment, index) => {
              return (
                <Investment
                  key={index}
                  index={index}
                  {...investment}
                  rebalance={rebalances[index]}
                  allocation={allocations[index]}
                  update={updateInvestment.bind(this, index)}
                  remove={removeInvestment.bind(this, index)}
                  isRemoveDisabled={investments.length <= 1}
                />
              )
            })}
          </tbody>
        </Table>
        {hasInvalidTargetAllocation && <InvalidTargetAllocationAlert />}
        {hasInsufficientFunds && <InsufficientFundsAlert />}
        <Button onClick={addInvestment} color='dark' block>
          <i className='fas fa-plus'></i> Add Investment
        </Button>
        <hr />
        <Summary
          currentBalance={currentBalance}
          targetBalance={targetBalance}
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
