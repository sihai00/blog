/**
 * 63. Unique Paths II
 * Input:
 * [
 *   [0,0,0],
 *   [0,1,0],
 *   [0,0,0]
 * ]
 * Output: 2
 * Explanation:
 * There is one obstacle in the middle of the 3x3 grid above.
 * There are two ways to reach the bottom-right corner:
 * 1. Right -> Right -> Down -> Down
 * 2. Down -> Down -> Right -> Right
 *
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  var m = obstacleGrid.length
  var n = obstacleGrid[0].length
  var res = Array(m).fill([])

  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        res[i][j] = 0
        continue
      }
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

  return res[m - 1][n - 1]
};
