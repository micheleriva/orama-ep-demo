export const CurrenciesFormatter: {
  [key:string]: Intl.NumberFormat
} = {
  USD: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }),
  GBP: new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  })
}