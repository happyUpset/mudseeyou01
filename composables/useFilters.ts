export const useCurrency = () => {

  const currency = (value: string | number) => {
    if(typeof value === 'string' || typeof value === 'number'){
      const arr = value.toString().split('.')
      const re = /(\d{1,3})(?=(\d{3})+$)/g
      const currency = arr[0].replace(re, '$1,') + (arr.length == 2 ? '.' + arr[1] : '')
      return currency == 'null' ? '' : currency
    }
    return value
  }

  return {
    currency,
  }
}
