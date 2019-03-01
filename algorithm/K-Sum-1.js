/**
 * 1.Two Sum
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var obj = {}

  for(var i = 0; i < nums.length; i++) {
    if ((target - nums[i]) in obj) {
      return [obj[target - nums[i]], i]
    }
    obj[nums[i]] = i
  }

  return null
};

/**
 * 15.3Sum
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  var obj = {}
  
  for (var i = 0; i < nums.length - 1; i++) {
    for (var j = i + 1; j < nums.length; j++) {
      var sum = nums[i] + nums[j]
      obj[sum] = obj[sum] || []
      obj[sum].push([i, j])
    }
  }
  
  var set = new Set()
  for (var k = 0; k < nums.length; k++) {
    if (-nums[k] in obj) {
      obj[-nums[k]]
          .filter(ij => ij.indexOf(k) === -1)
          .map(ij => set.add([nums[ij[0]], nums[ij[1]], nums[k]].sort().join(',')))
    }
  }
  
  return [...set].map(t => t.split(',').map(a => parseInt(a)))
};

/**
 * 18.4Sum
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  var obj = {}
  
  for (var i = 0; i < nums.length - 1; i++) {
    for (var j = i + 1; j < nums.length; j++) {
      for (var k = j + 1; k < nums.length; k++) {
        var sum = nums[i] + nums[j] + nums[k]
        obj[sum] = obj[sum] || []
        obj[sum].push([i, j, k])
      }
    }
  }
  
  var set = new Set()
  for (var l = 0; l < nums.length; l++) {
    if ((target - nums[l]) in obj) {
      obj[target - nums[l]]
          .filter(ij => ij.indexOf(l) === -1)
          .map(ij => set.add([nums[ij[0]], nums[ij[1]], nums[ij[2]], nums[l]].sort().join(',')))
    }
  }
  
  return [...set].map(t => t.split(',').map(a => parseInt(a)))
};