/**
 * 76.Minimum Window Substring
 *
 * Example:
 * Input: S = "ADOBECODEBANC", T = "ABC"
 * Output: "BANC"
 *
 * Note:
 * If there is no such window in S that covers all characters in T, return the empty string ""
 *If there is such window, you are guaranteed that there will always be only one unique minimum window in S.
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  var tFreg = Array(256).fill(0)
  for (var i of t) {
    tFreg[i.charCodeAt(0)] ++
  }

  var sFreg = Array(256).fill(0)
  var sCnt = 0

  // 记录结果
  var minLength = s.length + 1
  var startIndex = -1

  var l = 0, r = -1 // [l, r]滑动窗口范围
  while(l < s.length){
    if (r + 1 < s.length && sCnt < t.length) {
      sFreg[s[r + 1].charCodeAt(0)] ++
      if (sFreg[s[r + 1].charCodeAt(0)] <= tFreg[s[r + 1].charCodeAt(0)]) sCnt ++
      r ++
    } else {
      if (sCnt === t.length && r - l + 1 < minLength){
        minLength = r - l + 1
        startIndex = l
      }

      sFreg[s[l].charCodeAt(0)] --
      if (sFreg[s[l].charCodeAt(0)] < tFreg[s[l].charCodeAt(0)]){
        sCnt --
      }
      l ++
    }
  }

  if (startIndex  !== -1) return s.substr(startIndex, minLength)

  return ''
};
