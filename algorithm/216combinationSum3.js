/**
 * 216. Combination Sum III
 * Example 1:
 * Input: k = 3, n = 7
 * Output: [[1,2,4]]
 *
 * Example 2:
 * Input: k = 3, n = 9
 * Output: [[1,2,6], [1,3,5], [2,3,4]]
 *
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
  var res = []

  function helper(k, n, start, arr){
    if (k === 0 && n === 0) {
      res.push(arr)
      return
    }

    if (k < 0 || n < 0 || start > 9) return

    for (var i = start; i <= 9; i++) {
      helper(k - 1, n - i, i + 1, arr.concat([i]))
    }
  }

  helper(k, n, 1, [])

  return res
};
