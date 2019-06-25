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

// 递归，从上往下
var numSquares = function(n) {
  var memo = []

  function dfs(n){
    if (n === 0) return 0
    if (memo[n]) return memo[n]

    var res = Number.MAX_SAFE_INTEGER
    for (var i = 1; n - i * i >= 0; i++) {
      res = Math.min(res, 1 + dfs(n - i * i))
    }

    return memo[n] = res
  }

  return dfs(n)
}

// 动态规划
var numSquares  = function(n) {
  var memo = Array(n + 1).fill(Number.MAX_SAFE_INTEGER)
  memo[0] = 0

  for (var i = 1; i <= n; i++) {
    for (var j = 1; i - j * j >= 0; j++) {
      memo[i] = Math.min(memo[i], 1 + memo[i - j * j])
    }
  }

  return memo[n]
}
