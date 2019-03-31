/**
 * 217. Contains Duplicate
 *
 * Example 1:
 * Input: [1,2,3,1]
 * Output: true
 *
 * Example 2:
 * Input: [1,2,3,4]
 * Output: false
 *
 * Example 3:
 * Input: [1,1,1,3,3,4,3,2,4,2]
 * Output: true
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  var set = new Set()

  for (var i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) return true

    set.add(nums[i])
  }

  return false
};
