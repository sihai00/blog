/**
 * 64. Minimum Path Sum
 * Input:
 * [
 *   [1,3,1],
 *   [1,5,1],
 *   [4,2,1]
 * ]
 * Output: 7
 * Explanation: Because the path 1→3→1→1→1 minimizes the sum.
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  if (!grid || !grid.length) return 0;
  let temp = [[grid[0][0]]];
  let m = grid.length, n = grid[0].length;
  for (let j = 1; j < n; j++) {
    temp[0][j] = temp[0][j-1] + grid[0][j];
  }
  for (let i = 1; i < m; i++) {
    temp[i] = [];
    temp[i][0] = temp[i-1][0] + grid[i][0];
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      temp[i][j] = Math.min(temp[i][j-1], temp[i-1][j]) + grid[i][j];
    }
  }
  return temp[m-1][n-1];
};

var minPathSum = function(grid) {
  var maxInt = Number.MAX_SAFE_INTEGER

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      var right, bottom
      if (i === 0 && j === 0) continue

      if (i === 0) {
        bottom = maxInt
      } else {
        bottom = grid[i - 1][j]
      }

      if (j === 0 ) {
        right = maxInt
      } else {
        right = grid[i][j - 1]
      }

      grid[i][j] = grid[i][j] + Math.min(right, bottom)
    }
  }

  return grid[grid.length - 1][grid[0].length - 1]
};
