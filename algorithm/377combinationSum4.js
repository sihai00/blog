/**
 * 377. Combination Sum IV
 * Example:
 * nums = [1, 2, 3]
 * target = 4
 * The possible combination ways are:
 * (1, 1, 1, 1)
 * (1, 1, 2)
 * (1, 2, 1)
 * (1, 3)
 * (2, 1, 1)
 * (2, 2)
 * (3, 1)
 * Note that different sequences are counted as different combinations.
 * Therefore the output is 7.
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function(nums, target) {
  var memo = Array(target + 1).fill(-1)

  function find(nums, target) {
    if (target === 0) return 1
    if (memo[target] !== -1) return memo[target]

    var res = 0
    for (var i = 0; i < nums.length; i++) {
      if (target - nums[i] >= 0) res += find(nums, target - nums[i])
    }

    return memo[target] = res
  }

  return find(nums, target)
};

var combinationSum4 = function(nums, target) {
  var memo = Array(target + 1).fill(0)
  for (let i = 1; i <= target; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] - i === 0) {
        memo[i] += 1
      } else if (i - nums[j] > 0) {
        memo[i] += memo[i - nums[j]]
      }
    }
  }
  return memo[target]
}
