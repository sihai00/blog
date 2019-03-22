/**
 * 290. Word Pattern
 *
 * Example 1:
 * Input: pattern = "abba", str = "dog cat cat dog"
 * Output: true
 *
 * Example 2:
 * Input:pattern = "abba", str = "dog cat cat fish"
 * Output: false
 *
 * Example 3:
 * Input: pattern = "aaaa", str = "dog cat cat dog"
 * Output: false
 *
 * Example 4:
 * Input: pattern = "abba", str = "dog dog dog dog"
 * Output: false
 *
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function(pattern, str) {
  var p = pattern.split('')
  var s = str.split(' ')
  var p_hash = {}
  var s_hash = {}

  for (var i = 0; i < str.length; i++){
    if (p_hash[p[i]] !== s_hash[s[i]]) return false

    p_hash[p[i]] = i + 1
    s_hash[s[i]] = i + 1
  }

  return true
};
