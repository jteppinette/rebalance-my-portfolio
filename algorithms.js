import Dinero from 'dinero.js'

import { dollarsToCents, centsToDollars } from './utils'

function getPerfectRebalances (targetBalance, investments) {
  return targetBalance
    .allocate(investments.map(investment => investment.target || 0))
    .map((allocation, index) => {
      return centsToDollars(
        allocation
          .subtract(
            Dinero({
              amount: dollarsToCents(investments[index].balance || 0)
            })
          )
          .getAmount()
      )
    })
}

export { getPerfectRebalances }
