import React, { Component } from 'react'
import Dinero from 'dinero.js'

import { Row, Col } from 'reactstrap'

export default class Summary extends Component {
  render () {
    const { investments, withdrawDeposit, isDeposit } = this.props

    const currentBalance = investments.reduce(
      (sum, investment) =>
        sum.add(Dinero({ amount: investment.balance * 100 })),
      Dinero()
    )

    const targetBalance = isDeposit
      ? currentBalance.add(Dinero({ amount: withdrawDeposit * 100 }))
      : currentBalance.subtract(Dinero({ amount: withdrawDeposit * 100 }))

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
