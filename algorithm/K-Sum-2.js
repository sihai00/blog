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
 * 167.Two Sum II - Input array is sorted
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  var l = 0
  var r = numbers.length - 1
  var helper = [...numbers].sort((a, b) => a - b)
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

  for(var i = 0; i < numbers.length; i++) {
    if (helper[l] === numbers[i] || helper[r] === numbers[i]) {
      res.push(i + 1)
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
  
};

/**
 * 18.4Sum
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  
};