import React, { useState } from 'react'
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Badge,
  Collapse
} from 'reactstrap'

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
        <p>
          The algorithm works in two ways based on how the calculator is being
          used:
        </p>
        <ul>
          <li>
            <i>Deposit or Withdrawal</i>
            <p>
              <br />
              The algorithm will attempt to meet the target allocation by
              distributing the deposit or withdrawal amount across assets.
            </p>
            <p>
              The algorithm will not allow any transactions of the opposite
              type. e.g. You won't have to sell any assets if a deposit is
              occuring and you won't have to buy any assets if a withdrawal is
              occurring. This limits the number of transactions that need to
              occur and prevents any unecessary taxable events.
            </p>
            <p>
              However, this can prevent you from reaching a perfect target asset
              allocation if the deposit/withdrawal amount is not high enough. If
              this is the case, assets will be prioritized based on their order
              in the table. i.e. Assets at the top of the table will have their
              target asset allocation met before assets at the bottom.
            </p>
          </li>
          <li>
            <i>Exchange</i>
            <p>
              <br />
              The algorithm will only use assets that exist in the portfolio to
              reach a perfect target asset allocation. This will result in some
              assets being sold and some being purchased.
            </p>
          </li>
        </ul>
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
    <Row>
      <Col lg='6'>
        <Card className='mb-3'>
          <CardBody>
            <CardTitle tag='h5'>Rebalance Portfolio</CardTitle>
            <CardText>
              I want to rebalance my portfolio without making a deposit or
              withdrawal.
            </CardText>
          </CardBody>
          <ListGroup flush>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <Badge color='primary' pill>
                Step One
              </Badge>
              Add Current Investments
            </ListGroupItem>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <Badge color='primary' pill>
                Step Two
              </Badge>
              Update Portfolio
            </ListGroupItem>
          </ListGroup>
          <CardBody>
            Each investment's rebalance cell will represent the change in
            balance required to bring it back to the proper allocation. We have
            left the <i>Deposit</i> field empty to indiciate that we will only
            be using existing money to bring the portfolio back to an
            appropriate asset allocation. This will result in some investment's
            having a negative <i>Rebalance</i> value.
          </CardBody>
        </Card>
      </Col>

      <Col lg='6'>
        <Card className='mb-3'>
          <CardBody>
            <CardTitle tag='h5'>Add New Money</CardTitle>
            <CardText>
              I want to add new money into my portfolio. The new money should be
              appropriately allocated as to bring my portfolio as close to the
              target allocation as possible without selling any investments.
            </CardText>
          </CardBody>
          <ListGroup flush>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <Badge color='primary' pill>
                Step One
              </Badge>
              Set Deposit Amount
            </ListGroupItem>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <Badge color='primary' pill>
                Step Two
              </Badge>
              Add Current Investments
            </ListGroupItem>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <Badge color='primary' pill>
                Step Three
              </Badge>
              Update Portfolio
            </ListGroupItem>
          </ListGroup>
          <CardBody>
            Each investment's rebalance cell will represent the amount which
            should be purchased.
          </CardBody>
        </Card>
      </Col>

      <Col lg='6'>
        <Card className='mb-3'>
          <CardBody>
            <CardTitle tag='h5'>Pull Out Money</CardTitle>
            <CardText>
              I want to pull out money from my portfolio. The money should be
              appropriately withdrawn from each investment as to bring my
              portfolio as close to the target allocation as possible without
              purchasing any assets.
            </CardText>
          </CardBody>
          <ListGroup flush>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <Badge color='primary' pill>
                Step One
              </Badge>
              Switch to Withdraw Mode
            </ListGroupItem>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <Badge color='primary' pill>
                Step Two
              </Badge>
              Set Withdraw Amount
            </ListGroupItem>
            <ListGroupItem className='list-group-item d-flex justify-content-between align-items-center'>
              <Badge color='primary' pill>
                Step Three
              </Badge>
              Add Current Investments
            </ListGroupItem>
            <ListGroupItem className='d-flex justify-content-between align-items-center'>
              <Badge color='primary' pill>
                Step Four
              </Badge>
              Update Portfolio
            </ListGroupItem>
          </ListGroup>
          <CardBody>
            Each investment's rebalance cell will represent the amount which
            should be sold.
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

function Content () {
  const [sections, setSections] = useState([
    { display: 'About', component: About, isOpen: false },
    { display: 'Guides', component: Guides, isOpen: false }
  ])

  function toggleSection (index) {
    const tmp = [...sections]
    tmp[index].isOpen = !tmp[index].isOpen
    setSections(tmp)
  }

  return (
    <div className='accordion mb-3'>
      {sections.map((section, index) => {
        return (
          <Card color='light' key={index}>
            <CardHeader tag='h2' className='mb-0'>
              <Button color='link' block onClick={() => toggleSection(index)}>
                {section.display}
              </Button>
            </CardHeader>

            <Collapse isOpen={section.isOpen}>
              <CardBody>
                <section.component />
              </CardBody>
            </Collapse>
          </Card>
        )
      })}
    </div>
  )
}

export default Content
