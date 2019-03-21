/**
 * 242.Valid Anagram
 *
 * Example 1:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 *
 * Example 2:
 * Input: s = "rat", t = "car"
 * Output: false
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false

  var hash = {}

  for (var i = 0; i < s.length; i++) {
    hash[s[i]] = hash[s[i]] ? hash[s[i]] + 1 : 1
  }

  for (var j = 0; j < t.length; j++) {
    hash[t[j]] = hash[t[j]] ? hash[t[j]] - 1 : -1
  }

  for (var k in hash) {
    if (hash[k] !== 0) return false
  }

  return true
};
