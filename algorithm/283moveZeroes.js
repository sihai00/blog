/**
 * 283. 移动零
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  var nonezero = []

  for (var i = 0; i < nums.length; i++) {
    if (nums[i]) nonezero.push(nums[i])
  }

  for (var j = 0; j < nonezero.length; j++) {
    nums[j] = nonezero[j]
  }

  for (var k = nonezero.length; k < nums.length; k++) {
    nums[k] = 0
  }
};

var moveZeroes = function(nums) {
  var k = 0

  for (var i = 0; i < nums.length; i++) {
    if (nums[i]) {
      nums[k++] = nums[i]
    }
  }

  for (var j = k; j < nums.length; j++) {
    nums[j] = 0
  }
};

var moveZeroes = function(nums) {
  var k = 0

  function swap(arr, start, end) {
    var temp = arr[start]
    arr[start] = arr[end]
    arr[end] = temp
  }

  for (var i = 0; i < nums.length; i++) {
     if (nums[i]) {
       if (i !== k) {
         swap(nums, k++, i)
       } else {
         k++
       }
     }
  }
};
