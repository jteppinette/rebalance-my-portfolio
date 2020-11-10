import React, { Component } from 'react'

function About () {
  return (
    <div>
      <p>
        <strong>Why</strong>
      </p>
      <p>
        This tool was created to simplify the act of making modifications to a
        user's investment portfolio while maintaining the desired asset
        allocation.
      </p>
      <p>
        Maintaining your desired asset allocation through rebalancing is a
        proven method to decrease portfolio risk while boosting performance.
        Refer to the following resources for additional information on
        rebalancing and asset allocation:
      </p>
      <ul>
        <li>
          <a href='https://www.bogleheads.org/wiki/Rebalancing'>
            <i>Rebalancing</i> - Bogleheads
          </a>
        </li>
        <li>
          <a href='https://www.amazon.com/All-About-Asset-Allocation-Second/dp/0071700781'>
            <i>All About Asset Allocation</i> - Richard Ferri
          </a>
        </li>
      </ul>

      <p>
        <strong>When</strong>
      </p>
      <p>
        If you find yourself needing to add funds to your portfolio, withdraw
        funds from your portfolio, or perform a regular rebalancing operation,
        then this tool will save you time while offering accurate results.
      </p>

      <p>
        <strong>How</strong>
      </p>
      <p>
        By taking a user's current investments, an optional deposit amount, and
        a target portfolio allocation, a per-investment rebalance amount can be
        calculated. The per-investment rebalance amount is calculated using a
        proven{' '}
        <a href='https://dinerojs.com/index.html'>
          monetary value processing library
        </a>{' '}
        that allocates funds to various investments properly without a loss in
        precision.{' '}
      </p>

      <p>
        <strong>Privacy</strong>
      </p>
      <p>
        No financial information is transferred off of the client device. There
        is no server side component where user provided information is saved,
        tracked, or monetized.
      </p>
      <p>
        However, Google Analytics is used to monitor how many people are taking
        advantage of this tool.
      </p>
    </div>
  )
}

function Guides () {
  return (
    <div className='row'>
      <div className='col-lg-6'>
        <div className='card mb-3'>
          <div className='card-body'>
            <h5 className='card-title'>Rebalance Portfolio</h5>
            <p className='card-text'>
              I want to rebalance my portfolio without making a deposit or
              withdrawal.
            </p>
          </div>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span className='badge badge-primary badge-pill'>Step One</span>
              Add Current Investments
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span className='badge badge-primary badge-pill'>Step Two</span>
              Update Portfolio
            </li>
          </ul>
          <div className='card-body'>
            <p>
              Each investment's rebalance cell will represent the change in
              balance required to bring it back to the proper allocation. We
              have left the <i>Deposit</i> field empty to indiciate that we will
              only be using existing money to bring the portfolio back to an
              appropriate asset allocation. This will result in some
              investment's having a negative <i>Rebalance</i> value.
            </p>
          </div>
        </div>
      </div>

      <div className='col-lg-6'>
        <div className='card mb-3'>
          <div className='card-body'>
            <h5 className='card-title'>Add New Money</h5>
            <p className='card-text'>
              I want to add new money into my portfolio. The new money should be
              appropriately allocated as to bring my portfolio back to my
              desired asset allocation.
            </p>
          </div>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span className='badge badge-primary badge-pill'>Step One</span>
              Set Deposit Amount
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span className='badge badge-primary badge-pill'>Step Two</span>
              Add Current Investments
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span className='badge badge-primary badge-pill'>Step Three</span>
              Update Portfolio
            </li>
          </ul>
          <div className='card-body'>
            <p>
              Each investment's rebalance cell will represent the change in
              balance required to bring it back to the proper allocation. This
              will include a proper distribution of the newly deposited money.
            </p>
          </div>
        </div>
      </div>

      <div className='col-lg-6'>
        <div className='card mb-3'>
          <div className='card-body'>
            <h5 className='card-title'>Pull Out Money</h5>
            <p className='card-text'>
              I want to pull out money from my portfolio. The money should be
              appropriately withdrawn from each investment as to bring my
              portfolio back to the desired asset allocation.
            </p>
          </div>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span className='badge badge-primary badge-pill'>Step One</span>
              Switch to Withdraw Mode
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span className='badge badge-primary badge-pill'>Step Two</span>
              Set Withdraw Amount
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span className='badge badge-primary badge-pill'>Step Three</span>
              Add Current Investments
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              <span className='badge badge-primary badge-pill'>Step Four</span>
              Update Portfolio
            </li>
          </ul>
          <div className='card-body'>
            <p>
              Each investment's rebalance cell will represent the change in
              balance required to bring it back to the proper allocation. The
              total rebalance should equal the withdraw amount.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default class Content extends Component {
  render () {
    const sections = [
      { id: 'about', display: 'About', component: About },
      { id: 'guides', display: 'Guides', component: Guides }
    ]

    return (
      <div className='accordion mb-3' id='content-accordion'>
        {sections.map((section, index) => {
          return (
            <div className='card' key={index}>
              <div className='card-header'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link btn-block text-left'
                    type='button'
                    data-toggle='collapse'
                    data-target={`#${section.id}`}
                  >
                    {section.display}
                  </button>
                </h2>
              </div>

              <div
                id={section.id}
                className='collapse'
                data-parent='#content-accordion'
              >
                <div className='card-body'>
                  <section.component />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
