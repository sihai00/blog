/**
 * Input: numbers = [2,7,11,15], target = 9
 * Output: [1,2]
 * Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  var l = 0
  var r = numbers.length - 1

  while(l < r) {
    if (numbers[l] + numbers[r] === target) {
      return [l + 1, r + 1]
    } else if(numbers[l] + numbers[r] > target) {
      r -= 1
    } else {
      l += 1
    }
  }
};
