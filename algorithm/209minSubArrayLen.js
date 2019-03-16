/**
 * 209. Minimum Size Subarray Sum
 * Input: s = 7, nums = [2,3,1,2,4,3]
 * Output: 2
 * Explanation: the subarray [4,3] has the minimal length under the problem constraint.
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
  var l = 0, r = -1 // nums[l, r] 为滑动窗口
  // 滑动窗口的和
  var sum = 0
  // 当前循环连续子数组的最小长度：值为数组的不可能取得的最大值
  var res = nums.length + 1

  // 左指针小于数组的值，那么右指针肯定能取值
  while(l < nums.length){
    if (sum < s && r + 1 <  nums.length){
      sum += nums[++r]
    } else {
      sum -= nums[l++]
    }

    if (sum >= s) {
      res = Math.min(res, r - l + 1)
    }
  }

  return res === nums.length + 1 ? 0 : res
};
