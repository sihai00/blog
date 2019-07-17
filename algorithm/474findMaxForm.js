/**
 * 474. Ones and Zeroes
 * Example 1:
 * Input: Array = {"10", "0001", "111001", "1", "0"}, m = 5, n = 3
 * Output: 4
 * Explanation: This are totally 4 strings can be formed by the using of 5 0s and 3 1s, which are “10,”0001”,”1”,”0”
 *
 * Example 2:
 * Input: Array = {"10", "0", "1"}, m = 1, n = 1
 * Output: 2
 * Explanation: You could form "10", but then you'd have nothing left. Better form "0" and "1".
 *
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
  var dp = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0))

  for (var i = 0; i < strs.length; i++) {
    var zero = 0
    var one = 0

    // 当前项有多少个0和1
    for (var j = 0; j < strs[i].length; j++) {
      if (strs[i][j] === '0') {
        zero += 1
      } else {
        one += 1
      }
    }

    // 比较所有情况
    for (let j = n; j >= one; j--) {
      for (let k = m; k >= zero; k--) {
        // 取当前项或者不取当前项哪个更大
        dp[j][k] = Math.max(dp[j - one][k-zero]+ 1, dp[j][k])
      }
    }
  }

  return dp[n][m]
};
