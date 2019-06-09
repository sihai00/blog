/**
 * 79. Word Search
 * Example:
 * board =
 * [
 *   ['A','B','C','E'],
 *   ['S','F','C','S'],
 *   ['A','D','E','E']
 * ]
 * Given word = "ABCCED", return true.
 * Given word = "SEE", return true.
 * Given word = "ABCB", return false.
 *
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  var d = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  var m, n
  var visited = Array(board.length).fill(1).map(v => [])

  function inArea(x, y) {
    return x >= 0 && x < m && y >= 0 && y < n
  }

  function searchWord(board, word, index, startx, starty){
    // 最后一个字母
    if (word.length - 1 === index) {
      return board[startx][starty] === word[index]
    }

    // 四个方向寻找
    if (board[startx][starty] === word[index]) {
      visited[startx][starty] = true

      for (var i = 0; i < 4; i++) {
        var newx = startx + d[i][0]
        var newy = starty + d[i][1]

        if (inArea(newx, newy) && !visited[newx][newy] && searchWord(board, word, index + 1, newx, newy)) {
          return true
        }
      }

      visited[startx][starty] = false
    }

    return false
  }

  m = board.length
  n = board[0].length
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (searchWord(board, word, 0, i, j)) return true
    }
  }

  return false
};
