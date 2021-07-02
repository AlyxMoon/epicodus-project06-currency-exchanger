import dateHasPassed from '@/lib/dateHasPassed'

describe('function dateHasPassed', () => {
  it('should return true if date2 is later than date1', () => {
    const date1 = new Date(2021, 1, 1, 1, 10, 10, 10)
    const date2 = new Date(2021, 1, 1, 1, 10, 10, 20)

    expect(dateHasPassed(date1, date2)).toEqual(true)
  })

  it('should return true if date2 is equal to date1', () => {
    const date1 = new Date(2021, 1, 1, 1, 10, 10, 10)
    const date2 = new Date(2021, 1, 1, 1, 10, 10, 10)

    expect(dateHasPassed(date1, date2)).toEqual(true)
  })

  it('should return false if date2 is less than date1', () => {
    const date1 = new Date(2021, 1, 1, 1, 10, 10, 10)
    const date2 = new Date(2021, 1, 1, 1, 10, 10, 5)

    expect(dateHasPassed(date1, date2)).toEqual(false)
  })
})
