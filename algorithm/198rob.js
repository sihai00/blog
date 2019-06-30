/**
 * 198. House Robber
 * Example 1:
 * Input: [1,2,3,1]
 * Output: 4
 * Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 * Total amount you can rob = 1 + 3 = 4.
 *
 * Example 2:
 * Input: [2,7,9,3,1]
 * Output: 12
 * Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
 * Total amount you can rob = 2 + 9 + 1 = 12.
 *
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  var memo = Array(nums.length).fill(-1)

  function tryRob(nums, index){
    if (index >= nums.length) return 0
    if (memo[index] !== -1) return memo[index]

    var res = 0
    for (var i = index; i < nums.length; i++) {
      res = Math.max(res, nums[i] + tryRob(nums, i + 2))
    }
    memo[index] = res
    return res
  }

  return tryRob(nums, 0)
};

var rob = function(nums) {
  var n = nums.length
  if (n === 0) return 0

  var memo = Array(n).fill(-1)
  memo[n -1] = nums[n - 1]

  for (var i = n - 2; i >= 0; i--) {
    for (var j = i; j < n; j++) {
      memo[i] = Math.max(memo[i], nums[j] + (j + 2 < n ? memo[j + 2] : 0))
    }
  }

  return memo[0]
};

var rob = function(nums) {
  var n = nums.length
  if (n === 0) return 0

  var memo = Array(n).fill(-1)
  memo[0] = nums[0]

  for (var i = 1; i < n; i++) {
    for (var j = i; j >= 0; j--) {
      memo[i] = Math.max(memo[i], nums[j] + (j - 2 >= 0 ? memo[j - 2] : 0))
    }
  }

  return memo[n - 1]
};
