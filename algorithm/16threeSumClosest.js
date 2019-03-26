/**
 * 16. 3Sum Closest
 * Example:
 * Given array nums = [-1, 2, 1, -4], and target = 1.
 * The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  if (nums.length === 0) return []

  nums.sort((a, b) => a - b)
  var result = nums[0] + nums[1] + nums[2]

  for(var i = 0; i < nums.length - 2; i++) {
    var l = i + 1
    var r = nums.length - 1

    while(l < r) {
      var sum = nums[i] + nums[l] + nums[r]

      if (sum === target) {
        return target
      } else if (sum < target) {
        l += 1
      } else {
        r += 1
      }

      if (Math.abs(target - sum) < Math.abs(target - result)) {
        result = sum
      }
    }
  }
  
  return result
};
