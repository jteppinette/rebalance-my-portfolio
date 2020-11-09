import React, { Component } from 'react'

import Numeric from './numeric'

export default class Investment extends Component {
  render () {
    const {
      index,
      symbol,
      balance,
      target,
      rebalance,
      update,
      remove,
      isRemoveDisabled
    } = this.props

    return (
      <tr>
        <td>
          <input
            type='text'
            name={`symbol-${index}`}
            value={symbol}
            onChange={event => update('symbol', event.target.value)}
            className='form-control'
          />
        </td>
        <td>
          <Numeric
            type='text'
            name={`balance-${index}`}
            value={balance}
            onChange={(event, value) => update('balance', value)}
            predefined='dollar'
            className='form-control'
          />
        </td>
        <td>
          <Numeric
            type='text'
            name={`target-${index}`}
            value={target}
            onChange={(event, value) => update('target', value)}
            predefined='percentageUS2dec'
            minimumValue={0}
            maximumValue={100}
            className='form-control'
          />
        </td>
        <td>
          <Numeric
            type='text'
            name={`rebalance-${index}`}
            value={rebalance}
            predefined='dollar'
            readOnly={true}
            className='form-control'
          />
        </td>
        <td className='text-center align-middle'>
          <button
            type='button'
            onClick={remove}
            disabled={isRemoveDisabled}
            className='btn btn-danger'
          >
            <i className='fas fa-minus'></i>
          </button>
        </td>
      </tr>
    )
  }
}
