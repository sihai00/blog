/**
 * 1.Two Sum
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var l = 0
  var r = nums.length - 1
  var helper = [...nums].sort((a, b) => a - b)
  var res = []

  while(l < r) {
    if (helper[l] + helper[r] === target) {
      break
    } else if(helper[l] + helper[r] < target) {
      l += 1
    } else {
      r -= 1
    }
  }

  for(var i = 0; i < nums.length; i++) {
    if (helper[l] === nums[i] || helper[r] === nums[i]) {
      res.push(i)
    }
  }

  return res
};

/**
 * 15.3Sum
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
        while(l < r && nums[r] === nums[r - 1]) {r--}
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
/**
 * 18.4Sum
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