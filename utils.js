export function dollarsToCents (dollars) {
  return parseInt((dollars * 100).toFixed(0))
}

export function centsToDollars (cents) {
  return parseFloat((cents / 100).toFixed(2))
}
