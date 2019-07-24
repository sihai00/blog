/**
 * 300. 最长上升子序列
 * 给定一个无序的整数数组，找到其中最长上升子序列的长度。
 *
 * 示例:
 * 输入: [10,9,2,5,3,7,101,18]
 * 输出: 4
 * 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 *
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  if (nums.length === 0) return 0
  var memo = Array(nums.length).fill(1)

  for (var i = 1; i < nums.length; i++) {
    for (var j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        memo[i] = Math.max(memo[i], 1 + memo[j])
      }
    }
  }

  var res = 1
  for (var k = 0; k < memo.length; k++) {
    res = Math.max(res, memo[k])
  }

  return res
};
