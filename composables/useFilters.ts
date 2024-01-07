export const useCurrency = () => {

  const currency = (amount: string | number) => {
    const amountData = typeof amount === 'string' ? parseFloat(amount) : amount;
    return Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0 }).format(amountData);
  }

  const currencyOld = (value: string | number) => {
    const valueData = typeof value === 'string' ? parseFloat(value) : value;
    const arr = valueData.toString().split('.')
    const re = /(\d{1,3})(?=(\d{3})+$)/g
    const currency = arr[0].replace(re, '$1,') + (arr.length == 2 ? '.' + arr[1] : '')
    return currency === null ? '' : currency
  }

  return {
    currency,
    currencyOld
  }
}
