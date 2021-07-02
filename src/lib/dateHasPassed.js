
/**
 * Compares two dates against one another
 * @param {Date} date1 - initial date to compare against
 * @param {Date} date2 - second date, compared against date1
 * @returns true if date2 is greater than or equal to date1, false otherwise
 */
const dateHasPassed = (date1, date2) => {
  return date1 < date2
}

export default dateHasPassed
