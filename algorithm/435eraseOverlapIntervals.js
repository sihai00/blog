/**
 * 435. 无重叠区间
 * 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
 *
 * 示例 1:
 * 输入: [ [1,2], [2,3], [3,4], [1,3] ]
 * 输出: 1
 * 解释: 移除 [1,3] 后，剩下的区间没有重叠。
 *
 * 示例 2:
 * 输入: [ [1,2], [1,2], [1,2] ]
 * 输出: 2
 * 解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
 *
 * 示例 3:
 * 输入: [ [1,2], [2,3] ]
 * 输出: 0
 * 解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
 *
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
  // 动态规划
  if (intervals.length === 0) return 0

  intervals = intervals.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0]
    return a[1] - b[1]
  })

  // 最多保留多少个不重叠的子序列
  var memo = Array(intervals.length).fill(1)

  for (var i = 1; i < intervals.length; i++) {
    for (var j = 0; j < i; j++) {
      if (intervals[i][0] >= intervals[j][1]) {
        memo[i] = Math.max(memo[i], 1 + memo[j])
      }
    }
  }

  var res = 0
  for (var i = 0; i < memo.length; i++) {
    res = Math.max(res, memo[i])
  }

  return intervals.length - res
};

var eraseOverlapIntervals = function(intervals) {
  // 贪心算法
  if (intervals.length === 0) return 0

  intervals = intervals.sort((a, b) => {
    if (a[1] !== b[1]) return a[1] - b[1]
    return a[0] - b[0]
  })

  var res = 1
  var pre = 0
  for (var i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= intervals[pre][1]) {
      res ++
      pre = i
    }
  }

  return intervals.length - res
};
