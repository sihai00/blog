/**
 * 205. Isomorphic Strings
 *
 * Example 1:
 * Input: s = "egg", t = "add"
 * Output: true
 *
 * Example 2:
 * Input: s = "foo", t = "bar"
 * Output: false
 *
 * Example 3:
 * Input: s = "paper", t = "title"
 * Output: true
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  if (s.length !== t.length)  return false

  var s_hash = {}
  var t_hash = {}
  for(var i = 0; i < s.length; i++) {
    if (s_hash[s[i]] !== t_hash[t[i]]) return false

    s_hash[s[i]] = i + 1
    t_hash[t[i]] = i + 1
  }

  return true
};
