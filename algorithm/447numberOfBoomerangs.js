/**
 * 447. Number of Boomerangs
 * Example:
 * Input:
 * [[0,0],[1,0],[2,0]]
 *
 * Output:
 * 2
 *
 * Explanation:
 * The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]]
 *
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function(points) {
  var res = 0

  for (var i = 0; i < points.length; i++) {
    var hash = {}
    for (var j = 0; j < points.length; j++) {
      if (i !== j) {
        var dis = getDis(i, j)
        hash[dis] = hash[dis] ? hash[dis] + 1 : 1
      }
    }

    for (var k in hash) {
      if (hash[k] > 1) {
        res += hash[k] * (hash[k] - 1)
      }
    }
  }

  return res

  function getDis(i, j){
    return Math.pow(points[i][0] - points[j][0], 2) + Math.pow(points[i][1] - points[j][1], 2)
  }
};
