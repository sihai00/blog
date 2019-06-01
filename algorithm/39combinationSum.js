/**
 * 39. Combination Sum
 * Input: candidates = [2,3,6,7], target = 7,
 * A solution set is:
 * [
 *   [7],
 *   [2,2,3]
 * ]
 *
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  var res  = []

  function helper(can, target, arr){
    if (target === 0) res.push(arr)

    for (var i = 0; i < can.length; i++) {
      if (target - can[i] < 0) continue

      helper(can.slice(i), target - can[i], arr.concat([can[i]]))
    }
  }

  helper(candidates, target, [])

  return res
};
