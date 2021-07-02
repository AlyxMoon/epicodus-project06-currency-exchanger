import convertCurrency from '@/lib/convertCurrency'

describe('function convertCurrency()', () => {
  it('should return 0 if amount is 0 or not provided', () => {
    expect(convertCurrency()).toEqual(0)
    expect(convertCurrency({ amount: 0 })).toEqual(0)
  })
})
