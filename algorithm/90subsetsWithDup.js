/**
 * 90. Subsets II
 * Example:
 * Input: [1,2,2]
 * Output:
 * [
 *   [2],
 *   [1],
 *   [1,2,2],
 *   [2,2],
 *   [1,2],
 *   []
 * ]
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
  nums = nums.sort((a, b) => a - b)
  var res = []

  function helper(nums, start, arr){
    res.push(arr)

    var last = ''
    for (var i = start; i < nums.length; i++) {
      if (nums[i] === last) continue
      last = nums[i]
      helper(nums, i + 1, arr.concat([nums[i]]))
    }
  }

  helper(nums, 0, [])

  return res
};
