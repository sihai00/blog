/**
 * 343. Integer Break
 * Example 1:
 * Input: 2
 * Output: 1
 * Explanation: 2 = 1 + 1, 1 × 1 = 1.
 *
 * Example 2:
 * Input: 10
 * Output: 36
 * Explanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.
 *
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
  var memo = []

  function breakInteger(n) {
    if (n === 1) return 1
    if (memo[n]) return memo[n]
    var res = -1

    for (var i = 1; i <= n - 1; i++) {
      res = Math.max.apply(null, [res, i * (n - i), i * breakInteger(n - i)])
    }

    memo[n] = res
    return res
  }

  return breakInteger(n)
};

var integerBreak = function(n) {
  var memo = Array(n + 1).fill(-1)
  memo[1] = 1

  for (var i = 2; i <= n; i++) {
    for (var j = 1; j <= i - 1; j++) {
      memo[i] = Math.max.apply(null, [memo[i], j * (i - j), j * memo[i - j]])
    }
  }

  return memo[n]
};
