import React from 'react'

import { Row, Col } from 'reactstrap'

function Summary (props) {
  return (
    <Row className='text-center'>
      <Col xs='6' className='mb-3'>
        <strong>Current Balance</strong>
        <br />
        {props.currentBalance.toFormat()}
      </Col>
      <Col xs='6' className='mb-3'>
        <strong>Target Balance</strong>
        <br />
        {props.targetBalance.toFormat()}
      </Col>
    </Row>
  )
}

export default Summary
