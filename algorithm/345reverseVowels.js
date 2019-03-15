/**
 * 345.Reverse Vowels of a String
 * Example 1:
 * Input: "hello"
 * Output: "holle"
 *
 * Example 2:
 * Input: "leetcode"
 * Output: "leotcede"
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
  if (!s) return s
  var arr = s.split('')
  var l = 0
  var r = arr.length - 1
  var reg = /[aeiou]/i

  while(l < r) {
    if (!reg.test(arr[l])) {
      l += 1
      continue
    }

    if (!reg.test(arr[r])) {
      r -= 1
      continue
    }

    arr = swap(arr, l, r)
    l += 1
    r -= 1
  }

  return arr.join('')
};

function swap(arr, l, r){
  var temp = arr[l]
  arr[l] = arr[r]
  arr[r] = temp

  return arr
}
