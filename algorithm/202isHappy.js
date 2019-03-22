/**
 * 202. Happy Number
 * Input: 19
 * Output: true
 * Explanation:
 * 1e2 + 9e2 = 82
 * 8e2 + 2e2 = 68
 * 6e2 + 8e2 = 100
 * 1e2 + 0e2 + 0e2 = 1
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
  var hash = {}
  var res

  while(true) {
    res = 0

    while(n) {
      res += Math.pow(n % 10, 2)
      n = Math.floor(n / 10)
    }

    if (!hash[res]) {
      hash[res] = 1
    } else {
      return false
    }

    if (res === 1) return true
    n = res
  }
};
