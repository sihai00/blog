/**
 * 77. Combinations
 * Input: n = 4, k = 2
 * Output:
 * [
 *   [2,4],
 *   [3,4],
 *   [2,3],
 *   [1,2],
 *   [1,3],
 *   [1,4],
 * ]
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  if (n === 0 || k === 0 || k > n) return []

  var res = []

  function helper(n, k, start, arr){
    if (arr.length === k) {
      res.push(arr)
    }

    for (var i = start; i <= n; i++) {
      helper(n, k, i + 1, arr.concat([i]))
    }
  }

  helper(n, k, 1, [])

  return res
};
