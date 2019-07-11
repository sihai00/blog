/**
 * 322. Coin Change
 * Example 1:
 * Input: coins = [1, 2, 5], amount = 11
 * Output: 3
 * Explanation: 11 = 5 + 5 + 1
 *
 * Example 2:
 * Input: coins = [2], amount = 3
 * Output: -1
 *
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  var max = amount + 1
  var memo = Array(amount + 1).fill(-1)

  function search(coins, amount){
    if (amount === 0) return 0
    if (memo[amount] !== -1) return memo[amount]

    var res = max
    for (var i = 0; i < coins.length; i++) {
      if (amount - coins[i] >= 0) res = Math.min(res, 1 + search(coins, amount - coins[i]))
    }

    return memo[amount] = res
  }

  var res = search(coins, amount)
  return res === max ? -1 : res
};
