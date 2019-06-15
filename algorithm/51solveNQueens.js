/**
 * 51. N-Queens
 *
 * Example:
 * Input: 4
 * Output: [
 * [".Q..",  // Solution 1
 * "...Q",
 * "Q...",
 * "..Q."],
 *
 * ["..Q.",  // Solution 2
 * "Q...",
 * "...Q",
 * ".Q.."]
 * ]
 *
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  var res = []
  var col = []
  var dia1 = []
  var dia2 = []

  function generateBoard(n, row) {
    var board = Array(n).fill(1).map(v => Array(n).fill('.'))
    for (var i = 0; i < n; i++) {
      board[i][row[i]] = 'Q'
    }
    return board.map(v => v.join(''))
  }
  function pushQueen(n, index, row) {
    if (index === n) {
      res.push(generateBoard(n, row))
      return
    }

    for (var i = 0; i < n; i++) {
      if (!col[i] && !dia1[index + i] && !dia2[index - i + n - 1]) {
        col[i] = true
        dia1[index + i] = true
        dia2[index - i + n - 1] = true
        pushQueen(n, index + 1, row.concat([i]))
        col[i] = false
        dia1[index + i] = false
        dia2[index - i + n - 1] = false
      }
    }
  }

  pushQueen(n, 0, [])
  return res
};
