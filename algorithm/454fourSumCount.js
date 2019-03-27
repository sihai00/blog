/**
 * 454. 4Sum II
 * Example:
 * Input:
 * A = [ 1, 2]
 * B = [-2,-1]
 * C = [-1, 2]
 * D = [ 0, 2]
 *
 * Output:
 * 2
 *
 * Explanation:
 * The two tuples are:
 * 1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
 * 2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
var fourSumCount = function(A, B, C, D) {
  var hash = {}

  for (var i = 0; i < C.length; i++) {
    for (var j = 0; j < D.length; j++) {
      hash[C[i] + D[j]] = hash[C[i] + D[j]] ? hash[C[i] + D[j]] + 1 : 1
    }
  }

  var res = 0
  for (var k = 0; k < A.length; k++) {
    for (l = 0; l < B.length; l++) {
      if (hash[0 - A[k] - B[l]]) {
        res += hash[0 - A[k] - B[l]]
      }
    }
  }

  return res
};
