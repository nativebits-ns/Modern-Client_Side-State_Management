const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export const formatPrice = (value: number) => usd.format(value)
