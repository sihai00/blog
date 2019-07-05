/**
 * 0-1背包问题
 * 有一个背包，它的容量为C。现在有n种不同的物品，编号为0...n-1，其中每一件物品的重量为w(i)，价值为v(i)。
 * 问可以向这个背包中盛放哪些物品，使得在不超过背包容量的基础上，物品的总价值最大
 *
 * F(n, C) 考虑将n个物品放进容量为C的背包，使得价值最大
 * F(i, c) = max(F(i - 1), v(i) + F(i - 1, c - w(i)))
 * @param {Array} w：重量
 * @param {Array} v：价值
 * @param {number} C：背包容量
 * @return {number}
 */
var knapsack01 = function(w, v, C) {
  var n = w.length
  var memo = Array(n).fill(Array(C + 1).fill(-1))

  function bestValue(w, v, index, c) {
    // 没有物品可以放 或者 背包没有容量
    if (index <= 0 || c <= 0) return 0

    if (memo[index][c]) return memo[index][c]

    // 不考虑当前物品的时候
    var res = bestValue(w, v, index - 1, c)

    // 考虑当前物品的时候
    if (c >= w[index]) {
      res = Math.max(res, v[index] + bestValue(w, v, index - 1, c - w[index]))
    }

    return memo[index][c] = res
  }

  return bestValue(w, v, n - 1, C)
};

// 动态规划
var knapsack01 = function (w, v, C) {
  var n = w.length
  if (n === 0) return 0

  var memo = Array(n).fill(Array(C + 1).fill(-1))

  // 初始化第一个物品的情况
  for (var j = 0; j <= C; j++) {
    memo[0][j] = j >= w[0] ? v[0] : 0
  }
  // i：物品
  for (var i = 1; i < n; i++) {
    // j：重量
    for (var j = 0; j <= C; j++) {
      // 不考虑当前物品的情况
      memo[i][j] = memo[i - 1][j]

      // 考虑当前物品的情况（背包要大于物品的重量才能放入背包）
      if (j >= w[i]) {
        memo[i][j] = Math.max(memo[i - 1][j], v[i] + memo[i - 1][j - w[i]])
      }
    }
  }

  return memo[n - 1][C]
}
