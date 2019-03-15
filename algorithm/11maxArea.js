/**
 * 11. Container With Most Water
 * Input: [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  var l = 0
  var r = height.length - 1
  var max = 0

  while(l < r){
    max = Math.max(max, Math.min(height[l], height[r]) * (r - l))

    if (height[l] < height[r]) {
      l += 1
    } else {
      r -= 1
    }
  }

  return max
};
