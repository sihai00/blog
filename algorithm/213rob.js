/**
 * 213. House Robber II
 * Example 1:
 * Input: [2,3,2]
 * Output: 3
 * Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2),
 * because they are adjacent houses.
 *
 * Example 2:
 * Input: [1,2,3,1]
 * Output: 4
 * Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 * Total amount you can rob = 1 + 3 = 4.
 *
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  var n = nums.length

  if (n === 0) return 0
  if (n === 1) return nums[0]
  if (n === 2) return Math.max(nums[0], nums[1])

  function tryRob(nums, start, end){
    var dp = [0, 0, 0]

    for (var i = start + 2; i <= end + 2; i++) {
      dp[i] = Math.max(nums[i - 2] + dp[i - 2], dp[i - 1])
    }

    return dp[end + 2]
  }

  return Math.max(tryRob(nums, 0, n - 2), tryRob(nums, 1, n - 1))
};
