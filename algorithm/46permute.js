/**
 * 46. Permutations
 *
 * Input: [1,2,3]
 * Output:
 * [
 *   [1,2,3],
 *   [1,3,2],
 *   [2,1,3],
 *   [2,3,1],
 *   [3,1,2],
 *   [3,2,1]
 * ]
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  if (!nums || nums.length === 0) return []

  var res = []
  var hash = []

  function helper(nums, index, arr){
    if (nums.length === index) {
      res.push(arr)
      return
    }

    for (var i = 0; i < nums.length; i++) {
      if (!hash[i]) {
        hash[i] = true
        helper(nums, index + 1, arr.concat([nums[i]]))
        hash[i] = false
      }
    }
  }

  helper(nums, 0, [])

  return res
};

var permute = function(nums) {
  if (!nums || nums.length === 0) return []
  var res = []

  function helper(nums, path){
    if (nums.length === 0) {
      res.push(path)
    }

    var last = ''
    for (var i = 0; i < nums.length; i++) {
      last = nums[i]
      helper(nums.slice(0, i).concat(nums.slice(i + 1)), path.concat([nums[i]]))
    }
  }

  helper(nums, [])

  return res
};
