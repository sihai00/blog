/**
 * 15. 3Sum
 * Example:
 * Given array nums = [-1, 0, 1, 2, -1, -4],
 *
 * A solution set is:
 * [
 *   [-1, 0, 1],
 *   [-1, -1, 2]
 * ]
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  nums.sort((a, b) => a - b)
  var res = []

  for(var i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) { continue }
    var l = i + 1
    var r = nums.length - 1

    while(l < r) {
      if (nums[i] + nums[l] + nums[r] === 0) {
        res.push([nums[i], nums[l], nums[r]])

        while(l < r && nums[l] === nums[l + 1]) {l++}
        while(l < r && nums[r] === nums[r + 1]) {r--}
        l++
        r--
      } else if(nums[i] + nums[l] + nums[r] < 0) {
        l++
      } else {
        r--
      }
    }
  }

  return res
};
