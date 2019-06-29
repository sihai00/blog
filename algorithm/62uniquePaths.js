/**
 * 62. Unique Paths
 * Input: m = 3, n = 2
 * Output: 3
 * Explanation:
 * From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
 * 1. Right -> Right -> Down
 * 2. Right -> Down -> Right
 * 3. Down -> Right -> Right
 *
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  var res = Array(n).fill([])

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      if (i === 0 && j === 0) {
        res[i][j] = 1
        continue
      }

       if (i === 0) {
         res[i][j] = res[i][j - 1]
         continue
       }

       if (j === 0) {
         res[i][j] = res[i - 1][j]
         continue
       }

       res[i][j] = res[i - 1][j] + res[i][j - 1]
    }
  }

  return res[n - 1][m - 1]
};

var uniquePaths = function(m, n) {
  var res = Array(n).fill(Array(m).fill(1))

  for (var i = 1; i < n; i++) {
    for (var j = 1; j < m; j++) {
      res[i][j] = res[i - 1][j] + res[i][j - 1]
    }
  }

  return res[n - 1][m - 1]
}
