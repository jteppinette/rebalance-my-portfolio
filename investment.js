import React from 'react'

import Numeric from './numeric'
import { Input, Button } from 'reactstrap'

function Investment (props) {
  return (
    <tr>
      <td>
        <Input
          name={`symbol-${props.index}`}
          value={props.symbol}
          onChange={event => props.update('symbol', event.target.value)}
        />
      </td>
      <td>
        <Numeric
          type='text'
          name={`balance-${props.index}`}
          value={props.balance}
          onChange={(event, value) => props.update('balance', value)}
          predefined='dollar'
          className='form-control'
        />
      </td>
      <td>
        <Numeric
          type='text'
          name={`target-${props.index}`}
          value={props.target}
          onChange={(event, value) => props.update('target', value)}
          predefined='percentageUS2dec'
          minimumValue={0}
          maximumValue={100}
          className='form-control'
        />
      </td>
      <td>
        <Numeric
          type='text'
          name={`rebalance-${props.index}`}
          value={props.rebalance}
          predefined='dollar'
          readOnly={true}
          className='form-control'
        />
      </td>
      <td className='text-center align-middle'>
        <Button
          onClick={props.remove}
          disabled={props.isRemoveDisabled}
          color='danger'
        >
          <i className='fas fa-minus'></i>
        </Button>
      </td>
    </tr>
  )
}

export default Investment
