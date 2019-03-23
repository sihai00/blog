/**
 * 451. Sort Characters By Frequency
 *
 * Example 1:
 * Input:
 * "tree"
 *
 * Output:
 * "eert"
 *
 * Explanation:
 * 'e' appears twice while 'r' and 't' both appear once.
 * So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
 *
 * Example 2:
 * Input:
 * "cccaaa"
 *
 * Output:
 * "cccaaa"
 *
 * Explanation:
 * Both 'c' and 'a' appear three times, so "aaaccc" is also a valid answer.
 * Note that "cacaca" is incorrect, as the same characters must be together.
 *
 * Example 3:
 * Input:
 * "Aabb"
 *
 * Output:
 * "bbAa"
 *
 * Explanation:
 * "bbaA" is also a valid answer, but "Aabb" is incorrect.
 * Note that 'A' and 'a' are treated as two different characters.
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
  if (!s) return ''

  var hash = {}
  for (var i = 0; i < s.length; i++) {
    hash[s[i]] = ~~hash[s[i]] + 1
  }

  return Object.key(hash)
    .map(v => v.repeat(hash[v]))
    .sort((a, b) => a.length - b.length)
    .join('')
};
