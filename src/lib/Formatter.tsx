export const FormatCurrency = (number: number) => {
    const FORMAT_CURRENCY = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    })

    return FORMAT_CURRENCY.format(number)
}