export default function formatMoney(amount, format = false) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }

  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0
  const formatter = new Intl.NumberFormat('en-US', options)

  if (format) {
    const parts = formatter.formatToParts(amount / 100)
    console.log('parts:', parts)

    const normalizedMoney = {
      currency: parts[0].value,
      dollars: parts[1].value,
      cents: parts[3].value,
    }
    return normalizedMoney
  }

  const money = formatter.format(amount / 100)
  return money
}
