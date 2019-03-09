/**
 * 75.Sort Colors：计数快排
 * Input: [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
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
  
};
