/**
 * Given a number return +1 if the value provided is equal or greater
 * than zero or returns -1 if the value provided is smaller than zero.
 * @param {number} value
 * @returns {1 | -1}
 */
export function getSign(value: number): 1 | -1 {
  return value >= 0 ? 1 : -1;
}
