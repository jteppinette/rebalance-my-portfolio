import React from 'react'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'

function InvalidTargetAllocationAlert () {
  return (
    <Card className='text-center mb-3'>
      <CardBody>
        <CardTitle tag='h5' className='text-warning'>
          Fully Allocate Portfolio
        </CardTitle>
        <CardText className='text-muted'>
          The sum of each investment's target allocation must equal 100% before
          the portfolio can be properly rebalanced.
        </CardText>
      </CardBody>
    </Card>
  )
}

function InsufficientFundsAlert () {
  return (
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
  )
}

export { InvalidTargetAllocationAlert, InsufficientFundsAlert }
