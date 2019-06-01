/**
 * 40. Combination Sum II
 * Input: candidates = [10,1,2,7,6,1,5], target = 8,
 * A solution set is:
 * [
 *   [1, 7],
 *   [1, 2, 5],
 *   [2, 6],
 *   [1, 1, 6]
 * ]
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  candidates = candidates.sort((a,b)=>a-b)
  var res  = []


  function helper(can, target, arr){
    if (target === 0) res.push(arr)

    var last = ''
    for (var i = 0; i < can.length; i++) {
      if (target - can[i] < 0) continue
      if (last === can[i]) continue

      last = can[i]
      helper(can.slice(i + 1), target - can[i], arr.concat([can[i]]))
    }
  }

  helper(candidates, target, [])

  return res
};
