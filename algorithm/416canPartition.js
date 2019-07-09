/**
 * 416. Partition Equal Subset Sum
 * Example 1:
 * Input: [1, 5, 11, 5]
 * Output: true
 * Explanation: The array can be partitioned as [1, 5, 5] and [11].
 *
 * Example 2:
 * Input: [1, 2, 3, 5]
 * Output: false
 * Explanation: The array cannot be partitioned into equal sum subsets.
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  var sum = 0
  for (var i = 0; i < nums.length; i++) {
    sum += nums[i]
  }

  if (sum % 2 !== 0) return false

  function tryPartition(nums, index, sum) {
    if (sum === 0) return true
    if (sum < 0 || index < 0) return false
    if (memo[index][sum] !== -1) return memo[index][sum] === 1

    memo[index][sum] = tryPartition(nums, index - 1, sum) || tryPartition(nums, index - 1, sum - nums[index - 1]) ? 1 : 0
    return memo[index][sum] === 1
  }

  var memo = Array(nums.length).fill(Array(parseInt(sum / 2) + 1).fill(-1))
  tryPartition(nums, nums.length - 1, sum / 2)
};

var canPartition = function(nums) {
  var sum = 0
  for (var i = 0; i < nums.length; i++) {
    sum += nums[i]
  }
  if (sum % 2 !== 0) return false
  
  var n = nums.length
  var C = parseInt(sum / 2) + 1
  var memo = Array(C + 1).fill(-1)
  for (var i = 0; i <= C; i++) memo[i] = nums[0] === i

  for (var i = 1; i < n; i++) {
    for (var j = C; j >= nums[i]; j--) {
      memo[j] = memo[j] || memo[j - nums[i]]
    }
  }

  return memo[C]
}
