/**
 * 494. Target Sum
 * Example 1:
 * Input: nums is [1, 1, 1, 1, 1], S is 3.
 * Output: 5
 * Explanation:
 * -1+1+1+1+1 = 3
 * +1-1+1+1+1 = 3
 * +1+1-1+1+1 = 3
 * +1+1+1-1+1 = 3
 * +1+1+1+1-1 = 3
 * There are 5 ways to assign symbols to make the sum of nums be target 3.
 *
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
  var res = 0
  function dp(nums, S, temp, number) {
    if (number === nums.length) {
      res = temp === S ? ++res : res
      return
    }

    dp(nums, S, temp + nums[number], number + 1)
    dp(nums, S, temp - nums[number], number + 1)
  }
  return res
};

var findTargetSumWays = function(nums, S) {
  var memo = Array(nums.length).fill(Array(2001))

  function calculate(nums, i, sum, S) {
    if (i === nums.length) {
      if (sum === S) {
        return 1
      } else {
        return 0
      }
    } else {
      if (memo[i][sum + 1000]) return memo[i][sum + 1000]
      
      var add = calculate(nums, i + 1, sum + nums[i], S)
      var subtract = calculate(nums, i + 1, sum - nums[i], S)
      return memo[i][sum + 1000] = add + subtract
    }
  }

  return calculate(nums, 0, 0, S)
};
