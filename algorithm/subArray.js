/**
 * 53.Maximum Subarray
 * Input: [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: [4,-1,2,1] has the largest sum = 6.
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  var pre = 0
  var max = -Number.MAX_VALUE

  for(var i = 0; i < nums.length; i++) {
    pre = Math.max(pre + nums[i], nums[i])
    max = Math.max(pre, max)
  }

  return sum
};

/**
 * 209.Minimum Size Subarray Sum
 * Input: s = 7, nums = [2,3,1,2,4,3]
 * Output: 2
 * Explanation: the subarray [4,3] has the minimal length under the problem constraint.
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
  var res = Number.MAX_VALUE
  var l = 0
  var sum = 0

  for(var i = 0; i < nums.length; i++) {
    sum += nums[i]
    while(l <= i && sum >= s) {
      res = Math.min(res, i - l + 1)
      sum -= nums[l++]
    }
  }

  return res === Number.MAX_VALUE ? 0 : res
};