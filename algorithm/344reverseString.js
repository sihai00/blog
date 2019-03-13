/**
 * 344. Reverse String
 * Example 1:
 * Input: ["h","e","l","l","o"]
 * Output: ["o","l","l","e","h"]
 *
 * Example 2:
 * Input: ["H","a","n","n","a","h"]
 * Output: ["h","a","n","n","a","H"]
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  var l = 0
  var r = s.length - 1

  while(l < r){
    s = swap(s, l, r)
    l += 1
    r -= 1
  }
};

function swap(arr, l, r){
  var temp = arr[l]
  arr[l] = arr[r]
  arr[r] = temp

  return arr
}
