/**
 * 70. Climbing Stairs
 * Example 1:
 * Input: 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 * 1. 1 step + 1 step
 * 2. 2 steps
 *
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  var memo = []

  function calcWays(n){
    if (n === 0 || n === 1) return 1

    if (!memo[n]) memo[n] = calcWays(n - 1) + calcWays(n - 2)

    return memo[n]
  }

  return calcWays(n)
};

// 动态规划
var climbStairs = function(n) {
  var memo = []

  function calcWays(n){
    memo[0] = 1
    memo[1] = 1

    for (var i = 2; i <= n; i++) {
      memo[i] = memo[i - 1] + memo[i - 2]
    }

    return memo[n]
  }

  return calcWays(n)
};
