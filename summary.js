import React from 'react'
import Dinero from 'dinero.js'

import { Row, Col } from 'reactstrap'

import { dollarsToCents, centsToDollars } from './utils'

function Summary (props) {
  const currentBalance = props.investments.reduce(
    (sum, investment) =>
      sum.add(Dinero({ amount: dollarsToCents(investment.balance) })),
    Dinero()
  )

  const targetBalance = props.isDeposit
    ? currentBalance.add(
        Dinero({ amount: dollarsToCents(props.withdrawDeposit) })
      )
    : currentBalance.subtract(
        Dinero({ amount: dollarsToCents(props.withdrawDeposit) })
      )

  return (
    <Row className='text-center'>
      <Col xs='6' className='mb-3'>
        <strong>Current Balance</strong>
        <br />
        {currentBalance.toFormat()}
      </Col>
      <Col xs='6' className='mb-3'>
        <strong>Target Balance</strong>
        <br />
        {targetBalance.toFormat()}
      </Col>
    </Row>
  )
}

export default Summary
