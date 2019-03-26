/**
 * 18.4Sum
 * Example:
 * Given array nums = [1, 0, -1, 0, -2, 2], and target = 0.
 * [
 *   [-1,  0, 0, 1],
 *   [-2, -1, 1, 2],
 *   [-2,  0, 0, 2]
 * ]
 * A solution set is:
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  nums.sort((a, b) => a - b)
  var res = []

  for(var i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue

    for(var j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue

      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break
      if (nums[i] + nums[j] + nums[nums.length-2] + nums[nums.length-1] < target) continue

      var l = j + 1
      var r = nums.length - 1
      while(l < r) {
        if (nums[i] + nums[j] + nums[l] + nums[r] === target){
          res.push([nums[i], nums[j], nums[l], nums[r]])

          while(l < r && nums[l] === nums[l + 1]) {l++}
          while(l < r && nums[r] === nums[r - 1]) {r--}
          l++
          r--
        }else if(nums[i] + nums[j] + nums[l] + nums[r] < target) {
          l++
        }else {
          r--
        }
      }
    }
  }

  return res
};
