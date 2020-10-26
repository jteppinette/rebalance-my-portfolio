import React, { Component } from 'react'

class Form extends Component {
  render () {
    const { investments, removeInvestment } = this.props

    const handleChange = this.handleChange.bind(this)
    const handleSubmit = this.handleSubmit.bind(this)

    return (
      <form onSubmit={handleSubmit}>
        <table className='striped-table'>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Current Balance</th>
              <th>Target Allocation</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      type='text'
                      name={`symbol-${index}`}
                      value={investment.symbol}
                      id={`symbol-${index}`}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      name={`currentBalance-${index}`}
                      value={investment.currentBalance}
                      id={`currentBalance-${index}`}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      name={`targetAllocation-${index}`}
                      value={investment.targetAllocation}
                      id={`targetAllocation-${index}`}
                      onChange={handleChange}
                    />
                  </td>
                  <td className='text-center'>
                    <button
                      type='button'
                      onClick={() => removeInvestment(index)}
                      disabled={investments.length <= 1}
                    >
                      -
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </form>
    )
  }

  handleChange (event) {
    const { name, value } = event.target
    const [field, index] = name.split('-')
    this.props.updateInvestment(index, field, value)
  }

  handleSubmit (event) {
    console.log(event)
    event.preventDefault()
    event.stopPropagation()
  }
}

export default Form
