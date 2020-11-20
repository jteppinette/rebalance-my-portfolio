import React, { Component } from 'react'
import Dinero from 'dinero.js'

import { Row, Col } from 'reactstrap'

import { dollarsToCents, centsToDollars } from './utils'

export default class Summary extends Component {
  render () {
    const { investments, withdrawDeposit, isDeposit } = this.props

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
}
