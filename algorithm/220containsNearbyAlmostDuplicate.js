/**
 * 220. Contains Duplicate III
 * Example 1:
 * Input: nums = [1,2,3,1], k = 3, t = 0
 * Output: true
 *
 * Example 2:
 * Input: nums = [1,0,1,1], k = 1, t = 2
 * Output: true
 *
 * Example 3:
 * Input: nums = [1,5,9,1,5,9], k = 2, t = 3
 * Output: false
 *
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {
  var set = []

  for (var i = 0; i < nums.length; i++){
    if (set.find(num => Math.abs(num - nums[i]) <= t) !== undefined) {
      return true
    }

    set.push(nums[i])

    if (set.length >= k + 1) {
      set.shift()
    }
  }

  return false
};
