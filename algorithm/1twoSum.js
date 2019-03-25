/**
 * 1. Two Sum
 * Example:
 * Given nums = [2, 7, 11, 15], target = 9,
 * Because nums[0] + nums[1] = 2 + 7 = 9,
 * return [0, 1].
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var hash = {}

  for (var i = 0; i < nums.length; i++) {
    var complement = target - nums[i]

    if (complement in hash) {
      return [i, hash[complement]]
    }

    hash[nums[i]] = i
  }
};
