/**
 * 47. Permutations II
 *
 * Input: [1,1,2]
 * Output:
 * [
 *   [1,1,2],
 *   [1,2,1],
 *   [2,1,1]
 * ]
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  if (!nums || nums.length === 0) return []
  nums.sort((a,b)=>a-b)

  var res = []

  function helper(nums, path){
    if (nums.length === 0) {
      res.push(path)
    }

    var last = ''
    for (var i = 0; i < nums.length; i++) {
      if (last === nums[i]) continue

      last = nums[i]
      helper(nums.slice(0, i).concat(nums.slice(i + 1)), path.concat([nums[i]]))
    }
  }

  helper(nums, [])

  return res
};
