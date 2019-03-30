/**
 * 219.Contains Duplicate II
 *
 * Example 1:
 * Input: nums = [1,2,3,1], k = 3
 * Output: true
 *
 * Example 2:
 * Input: nums = [1,0,1,1], k = 1
 * Output: true
 *
 * Example 3:
 * Input: nums = [1,2,3,1,2,3], k = 2
 * Output: false
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
  var set = new Set()

  for (var i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return true
    }

    set.add(nums[i])

    if (set.size === k + 1) {
      set.delete(nums[i - k])
    }
  }

  return false
};
