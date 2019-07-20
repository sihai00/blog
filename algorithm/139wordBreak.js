/**
 * 139. Word Break
 * Example 1:
 * Input: s = "leetcode", wordDict = ["leet", "code"]
 * Output: true
 * Explanation: Return true because "leetcode" can be segmented as "leet code".
 *
 * Example 2:
 * Input: s = "applepenapple", wordDict = ["apple", "pen"]
 * Output: true
 *
 * Example 3:
 * Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 * Output: false
 *
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  var memo = {}

  function dp(s, wordDict){
    if (s === '') return true
    if (memo[s] !== undefined) return memo[s]
    var res = false

    for (var i = 0; i < wordDict.length; i++) {
      var word = wordDict[i]
      var len = word.length
      var start = s.indexOf(word)

      if (s.includes(word) && start === 0) {
        res = dp(s.substring(len), wordDict)
        if (res) return true
      }
    }

    return memo[s] = res
  }

  return dp(s, wordDict)
};
