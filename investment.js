import React from 'react'
import NumberFormat from 'react-number-format'
import { Input, Button } from 'reactstrap'

import { decimalToPercent, percentToDecimal } from './utils.js'

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
        <NumberFormat
          name={`balance-${props.index}`}
          value={props.balance}
          onValueChange={({ floatValue }) =>
            props.update('balance', floatValue)
          }
          decimalScale={2}
          thousandSeparator={true}
          prefix='$'
          allowNegative={false}
          className='form-control'
        />
      </td>
      <td>
        <NumberFormat
          name={`target-${props.index}`}
          type='tel'
          value={props.target ? decimalToPercent(props.target) : props.target}
          onValueChange={({ floatValue }) =>
            props.update(
              'target',
              floatValue ? percentToDecimal(floatValue) : floatValue
            )
          }
          decimalScale={0}
          suffix='%'
          allowNegative={false}
          isAllowed={({ floatValue }) =>
            floatValue ? floatValue <= 100 : true
          }
          className='form-control'
        />
      </td>
      <td>
        <NumberFormat
          name={`rebalance-${props.index}`}
          value={props.rebalance}
          decimalScale={2}
          fixedDecimalScale={true}
          thousandSeparator={true}
          prefix={'$'}
          displayType={'text'}
          readOnly={true}
          className='form-control'
        />
      </td>
      <td>
        <NumberFormat
          name={`allocation-${props.index}`}
          value={props.allocation}
          decimalScale={0}
          suffix='%'
          displayType={'text'}
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
