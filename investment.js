import React from 'react'
import NumberFormat from 'react-number-format'
import { Input, Button } from 'reactstrap'

import Icon from './icons'

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
          type='tel'
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
          value={props.target}
          onValueChange={({ floatValue }) => props.update('target', floatValue)}
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
          value={props.rebalance.toUnit()}
          decimalScale={2}
          fixedDecimalScale={true}
          thousandSeparator={true}
          prefix={'$'}
          displayType={'text'}
          readOnly={true}
          className='form-control'
        />
      </td>
      <td className='d-none d-md-table-cell'>
        <NumberFormat
          name={`allocation-${props.index}`}
          value={props.allocation * 100}
          decimalScale={2}
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
          <Icon icon='minus' />
        </Button>
      </td>
    </tr>
  )
}

export default Investment
