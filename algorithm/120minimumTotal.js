/**
 * 120. Triangle
 * [
 *   [2],
 *   [3,4],
 *   [6,5,7],
 *   [4,1,8,3]
 * ]
 *
 * The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11)
 *
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  var len = triangle.length

  for (var i = 1; i < len; i++) {
    // 第一个
    triangle[i][0] += triangle[i - 1][0]
    // 最后一个
    triangle[i][i] += triangle[i - 1][i - 1]

    for (var j = 1; j < i; j++) {
      triangle[i][j] += Math.min(triangle[i - 1][j - 1], triangle[i - 1][j])
    }
  }

  return Math.min.apply(null, triangle[len - 1])
};

// 自下往上
var minimumTotal = function(triangle) {
  var len = triangle.length
  var res = Array(len).fill(1).map(v => [])

  function go(triangle, i, j) {
    if (res[i][j]) return res[i][j]
    if (i === 0) return res[i][j] = triangle[i][j]
    // 第一个
    if (j === 0) return res[i][j] = triangle[i][j] + go(triangle, i - 1, 0)
    // 最后一个
    if (i === j) return res[i][j] = triangle[i][j] + go(triangle, i - 1, i - 1)
    return res[i][j] = triangle[i][j] + Math.min(go(triangle, i - 1, j), go(triangle, i - 1, j - 1))
  }

  for (var i = 0; i < len; i ++) {
    go(triangle, len - 1, i)
  }

  return Math.min.apply(null, res[len - 1])
};
