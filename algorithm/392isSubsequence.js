/**
 * 392. 判断子序列
 * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 *
 * 示例 1:
 * s = "abc", t = "ahbgdc"
 * 返回 true.
 *
 * 示例 2:
 * s = "axc", t = "ahbgdc"
 * 返回 false.
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
  var si = 0
  var ti = 0

  while(si < s.length && ti < t.length) {
    if (s[si] === t[ti]) {
      si++
      ti++
    } else {
      ti++
    }
  }

  return si === s.length
};
