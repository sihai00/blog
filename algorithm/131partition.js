/**
 * 131. Palindrome Partitioning
 *
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  if (!s) return []
  
  var res = []

  function helper(str, arr){
    if (!str) {
      res.push(arr)
      return
    }

    for (var i = 1; i <= str.length; i++) {
      var substr = str.slice(0, i);

      if (check(substr)) {
        helper(str.slice(i), arr.concat([substr]))
      }
    }
  }

  function check(str) {
    if (str.length === 1) {
      return true;
    }
    for (let i = 0; i < parseInt(str.length/2); i++) {
      if (str[i] !== str[str.length-1-i]) {
        return false;
      }
    }
    return true;
  }

  helper(s, [])

  return res
};
