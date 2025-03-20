export const formatPrice = (value: number): string => {
  return `$${value
    .toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/,/g, ' ')}`
}
