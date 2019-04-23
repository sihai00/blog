/**
 * 20. Valid Parentheses
 * Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid
 *
 * Example 1:
 * Input: "()"
 * Output: true
 *
 * Example 2:
 * Input: "()[]{}"
 * Output: true
 *
 * Example 3:
 * Input: "(]"
 * Output: false
 *
 * Example 4:
 * Input: "([)]"
 * Output: false
 *
 * Example 5:
 * Input: "{[]}"
 * Output: true
 *
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  var arr = []

  for (var i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      arr.push(s[i])
    } else {
      if (arr.length === 0) return false

      var top = arr.pop()
      var match = ''
      switch(s[i]){
        case ')':
          match = '('
          break
        case '}':
          match = '{'
          break
        case ']':
          match = '['
          break
        default:
          break
      }

      if (top !== match) return false
    }
  }

  return arr.length === 0 ? true : false
};
