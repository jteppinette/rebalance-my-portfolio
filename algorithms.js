import Dinero from 'dinero.js'

import { dollarsToCents } from './utils'

function getAbsoluteDinero (d) {
  return Dinero({ amount: Math.abs(d.getAmount()) })
}

function getPerfectRebalances (targetBalance, investments) {
  return targetBalance
    .allocate(investments.map(investment => investment.target || 0))
    .map((allocation, index) => {
      return allocation.subtract(
        Dinero({
          amount: dollarsToCents(investments[index].balance || 0)
        })
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
    .map(d => d.multiply(isDeposit ? 1 : -1))
}

export { getPerfectRebalances, getLazyRebalances }
