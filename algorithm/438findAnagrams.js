/**
 * 438.Find All Anagrams in a String
 * Example 1:
 * Input:
 * s: "cbaebabacd" p: "abc"
 *
 * Output:
 * [0, 6]
 *
 * Explanation:
 * The substring with start index = 0 is "cba", which is an anagram of "abc".
 * The substring with start index = 6 is "bac", which is an anagram of "abc".
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
  var res = []
  // 如果p比s多，返回空
  if (s.length < p.length) return res

  // 记录p是否包含26个字母的数据
  var freq_p = Array(26).fill(0)

  // p中存在字母，freq_p对应的项为1，否则为0
  for (var i of p) {
    freq_p[i.charCodeAt(0) - 97] += 1
  }

  var l = 0, r = -1 //[l, r]滑动窗口
  // 记录s中是否包含26个字母的数据
  var freq_s = Array(26).fill(0)

  while(r + 1 < s.length) {
    freq_s[s[++r].charCodeAt(0) - 97] ++

    // 维持长度为p
    if (r - l + 1 > p.length) {
      freq_s[s[l++].charCodeAt(0) - 97] --
    }

    // 判断是否相同
    if (r - l + 1 === p.length && same(freq_s, freq_p)) {
      res.push(l)
    }
  }

  return res
};

function same(freq_s, freq_q){
  for (var i = 0; i < 26; i++){
    if (freq_s[i] !== freq_q[i]) {
      return false
    }
  }

  return true
}
