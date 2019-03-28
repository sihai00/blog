/**
 * 49. Group Anagrams
 * Example:
 * Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
 *
 * Output:
 * [
 *   ["ate","eat","tea"],
 *   ["nat","tan"],
 *   ["bat"]
 * ]
 *
 * Note:
 * All inputs will be in lowercase.
 * The order of your output does not matter.
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  var hash = {}

  for (var i = 0; i < strs.length; i++) {
    var key = strs[i].split('').sort().join('')
    hash[key] = Array.isArray(hash[key]) ? hash[key].concat(strs[i]) : [strs[i]]
  }

  var res = []
  for (var j in hash) {
    res.push(hash[j])
  }

  return res
};
