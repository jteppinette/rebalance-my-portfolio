import Dinero from 'dinero.js'

import { dollarsToCents, centsToDollars } from './utils'

function getAbsoluteDinero (d) {
  return Dinero({ amount: Math.abs(d.getAmount()) })
}

function getEmptyRebalances (investments) {
  return investments.map(() => 0)
}

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

function getLazyRebalances (
  isDeposit,
  withdrawDeposit,
  targetBalance,
  investments
) {
  let remaining = withdrawDeposit

  return targetBalance
    .allocate(investments.map(investment => investment.target || 0))
    .map((allocation, index) => {
      // Do not rebalance if there are no remaining funds.
      if (remaining.isZero()) {
        return Dinero()
      }

      const balance = Dinero({
        amount: dollarsToCents(investments[index].balance || 0)
      })

      // Do not rebalance investment if it will force a reverse transfer.
      if (
        isDeposit
          ? balance.greaterThan(allocation)
          : balance.lessThan(allocation)
      ) {
        return Dinero()
      }

      const rebalance = Dinero.minimum([
        remaining,
        getAbsoluteDinero(allocation.subtract(balance))
      ])

      remaining = remaining.subtract(rebalance)

      return rebalance
    })
    .map(d => d.getAmount())
    .map(v => v * (isDeposit ? 1 : -1))
    .map(centsToDollars)
}

export { getEmptyRebalances, getPerfectRebalances, getLazyRebalances }
