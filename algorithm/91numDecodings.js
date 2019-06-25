/**
 * 91. Decode Ways
 * Example 1:
 * Input: "12"
 * Output: 2
 * Explanation: It could be decoded as "AB" (1 2) or "L" (12).
 *
 * Example 2:
 * Input: "226"
 * Output: 3
 * Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
 *
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  var memo = []

  if (s.length === 0) return 0

  function dfs(s) {
    if (s === '') return 1
    if (memo[s]) return memo[s]
    var res = 0

    for (var i = 1; i <= 2; i++) {
      if (!s[i - 1]) break

      var num = Number(s.slice(0, i))

      if (num === 0 || num > 26) break
      res += dfs(s.slice(i))
    }

    return memo[s] = res
  }

  return dfs(s)
};
