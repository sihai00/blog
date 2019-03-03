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