/**
 * 78. Subsets
 * Example:
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
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  var res = []

  function helper(nums, start, arr){
    res.push(arr)

    for (var i = start; i < nums.length; i++) {
      helper(nums, i + 1, arr.concat([nums[i]]))
    }
  }

  helper(nums, 0, [])

  return res
};

var subsets = function(nums) {
  const arr = [[]];

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
