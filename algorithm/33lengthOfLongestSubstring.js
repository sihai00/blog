/**
 * 3.Longest Substring Without Repeating Characters
 * Example 1:
 * Input: "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 *
 * Example 2:
 * Input: "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 *
 * Example 3:
 * Input: "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  var freq = {}
  var l = 0
  var r = -1
  var res = 0

  while(l < s.length) {
    if (r + 1 < s.length && !freq[s[r + 1]]) {
      freq[s[++r]] = 1
    } else {
      freq[s[l++]] = 0
    }

    res = Math.max(res, r - l + 1)
  }

  return res
};
