/**
 * 125.Valid Palindrome
 * Example 1:
 * Input: "A man, a plan, a canal: Panama"
 * Output: true
 *
 * Example 2:
 * Input: "race a car"
 * Output: false
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  if (!s) return true

  var str = s.toLowerCase().replace(/[^0-9a-z]/g, '')
  var l = 0
  var r = str.length - 1

  while(l < r){
    if (str[l] !== str[r]) return false
    l += 1
    r -= 1
  }

  return true
};
