/**
 * 200. Number of Islands
 *
 * Example 1:
 * Input:
 * 11110
 * 11010
 * 11000
 * 00000
 * Output: 1
 *
 * Example 2:
 * Input:
 * 11000
 * 11000
 * 00100
 * 00011
 * Output: 3
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  var d = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  var m, n
  var visited = Array(grid.length).fill(1).map(v => [])
  var res = 0

  function inArea(x, y) {
    return x >= 0 && x < m && y >= 0 && y < n
  }

  function dfs(grid, x, y) {
    visited[x][y] = true

    for (var i = 0; i < d.length; i++) {
      var newx = x + d[i][0]
      var newy = y + d[i][1]

      if (inArea(newx, newy) && !visited[newx][newy] && grid[newx][newy] === '1') {
        dfs(grid, newx, newy)
      }
    }
  }

  m = grid.length
  n = grid[0].length
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1 && !visited[i][j])
      res += 1
      dfs(grid, i, j)
    }
  }

  return res
};
