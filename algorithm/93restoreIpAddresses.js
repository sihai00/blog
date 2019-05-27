/**
 * 93. Restore IP Addresses
 *
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  var res = []

  function helper(remaining, chosen){
    if (remaining === '' && chosen.length === 4) {
      res.push(chosen.join('.'))
    } else if (chosen.length > 4) {
      return
    }

    for (var i = 1; i < 4 && i <= remaining.length; i++) {
      // 当第一个数字为0，跳过
      if (remaining[0] === '0' && i > 1) continue

      var n = parseInt(remaining.substring(0, i))
      if (n <= 255) helper(remaining.slice(i), chosen.concat([n]))
    }
  }

  helper(s, [])

  return res
};
