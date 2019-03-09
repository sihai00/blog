/**
 * 75.Sort Colors：计数快排
 * Input: [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var 75 = function(nums) {
  var index = 0
  var count = Array(3).fill(0)

  for (var i = 0; i < nums.length; i++) {
    count[nums[i]] += 1
  }

  for(var j = 0; j < count.length; j++) {
    for (var k = 0; k < count[j]; k++) {
      nums[index++] = j
    }
  }
};

/**
 * 75.Sort Colors：三路快排
 * Input: [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  // nums[0...zero] = 0
  var zero = -1
  // nums[two...n-1] = 2
  var two = nums.length

  for (var i = 0; i < two; ) {
    if (nums[i] === 1) {
      i++
    } else if(nums[i] === 2) {
      two--
      nums = swap(nums, i, two)
    } else if(nums[i] === 0){
      zero++
      nums = swap(nums, i, zero)
      i++
    }
  }
};

var swap = function(arr, a, b){
  var temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
  return arr
}
