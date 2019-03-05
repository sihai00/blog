/**
 * 53.Maximum Subarray
 * Input: [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: [4,-1,2,1] has the largest sum = 6.
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  var pre = 0
  var max = -Number.MAX_VALUE

  for(var i = 0; i < nums.length; i++) {
    pre = Math.max(pre + nums[i], nums[i])
    max = Math.max(pre, max)
  }

  return sum
};

/**
 * 78.Subsets
 * Input: nums = [1,2,3]
 * Output:
 * [
 *   [3],
 *   [1],
 *   [2],
 *   [1,2,3],
 *   [1,3],
 *   [2,3],
 *   [1,2],
 *   []
 * ]
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  var arr = [[]];
	
  for(var i = 0; i < nums.length; i++) {
    var len = arr.length
    for(var j = 0; j < len; j++) {
      var add = arr[j].slice()
      add.push(nums[i])
      arr.push(add)
    }
  }
	
	return arr;
};

/**
 * 90.Subsets II
 * Input: nums = [1,2,2]
 * Output:
 * [
 *   [2],
 *   [1],
 *   [1,2,2],
 *   [2,2],
 *   [1,2],
 *   []
 * ]
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
  var nums = nums.sort((a, b) => a - b)
  var arr = [[]]

  for(var i = 0; i < nums.length; i++) {
    var startIndex = i > 0 && nums[i] === nums[i - 1] ? len : 0
    var len = arr.length
    for(var j = startIndex; j < len; j++) {
      var add = arr[j].slice()
      add.push(nums[i])
      arr.push(add)
    }
  }

  return arr
};

/**
 * 128.Longest Consecutive Sequence
 * Input: [100, 4, 200, 1, 3, 2]
 * Output: 4
 * Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  var nums = nums.sort((a, b) => a - b)
  var set = [...new Set(nums)]
  var l = 0
  var max = set.length > 0 ? 1 : 0

  for(var i = 1; i < set.length; i++) {
    if (set[i] - set[i - 1] === 1){
      max = Math.max(max, i - l + 1)
    } else {
      l = i
    }
  }

  return max
};

var longestConsecutive = function(nums) {
  if (nums.length === 0) return 0
  nums.sort((a, b) => a - b)

  var result = 1
  var max = 1

  for(var i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      if (nums[i] - nums[i - 1] === 1) {
        result += 1
      } else {
        max = Math.max(max, result)
        result = 1
      }
    }
  }

  return Math.max(max, result)
};

/**
 * 209.Minimum Size Subarray Sum
 * Input: s = 7, nums = [2,3,1,2,4,3]
 * Output: 2
 * Explanation: the subarray [4,3] has the minimal length under the problem constraint.
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
  var res = Number.MAX_VALUE
  var l = 0
  var sum = 0

  for(var i = 0; i < nums.length; i++) {
    sum += nums[i]
    while(l <= i && sum >= s) {
      res = Math.min(res, i - l + 1)
      sum -= nums[l++]
    }
  }

  return res === Number.MAX_VALUE ? 0 : res
};