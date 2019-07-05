/**
 * 309. Best Time to Buy and Sell Stock with Cooldown
 * Input: [1,2,3,0,2]
 * Output: 3
 * Explanation: transactions = [buy, sell, cooldown, buy, sell]
 *
 * @param {number[]} prices
 * @return {number}
 */
const BUY = 1, SELL = 2, REST = 3
var maxProfit = function(prices) {
  const memo = {[BUY]: {}, [SELL]: {}, [REST]: {}}
  const calc = (i, ACTION) => {
    if(i in memo[ACTION]) return memo[ACTION][i]
    if( i >= prices.length) return 0
    switch(ACTION) {
      case REST:
        memo[ACTION][i] = calc(i + 1, BUY)
        break
      case SELL:
        memo[ACTION][i] = Math.max(prices[i] + calc(i + 1, REST), calc(i + 1, SELL))
        break
      case BUY:
        memo[ACTION][i] = Math.max(-prices[i] + calc(i + 1, SELL), calc(i + 1, BUY))
        break
    }
    return memo[ACTION][i]
  }
  return calc(0, BUY)
};
