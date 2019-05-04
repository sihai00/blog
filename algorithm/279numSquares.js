/**
 * 279. Perfect Squares
 * Example 1:
 * Input: n = 12
 * Output: 3
 * Explanation: 12 = 4 + 4 + 4.
 *
 * Example 2:
 * Input: n = 13
 * Output: 2
 * Explanation: 13 = 4 + 9.
 *
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  if (!n) return 0

  var queue = [{num: n, step: 0}]
  var visited = {[n + 1] : true}

  while(queue.length) {
    var head = queue.shift()
    var num = head.num
    var step = head.step

    for (var i = 0; ; i++) {
      var v = num - i * i

      if (v < 0) break
      if (v === 0) return step + 1

      if (!visited[v]) {
        queue.push({num: v, step: step + 1})
        visited[v] = true
      }
    }
  }
};
