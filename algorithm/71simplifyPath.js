/**
 * 71. Simplify Path
 * Example 1:
 * Input: "/home/"
 * Output: "/home"
 * Explanation: Note that there is no trailing slash after the last directory name.
 *
 * Example 2:
 * Input: "/../"
 * Output: "/"
 * Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.
 *
 * Example 3:
 * Input: "/home//foo/"
 * Output: "/home/foo"
 * Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one.
 *
 * Example 4:
 * Input: "/a/./b/../../c/"
 * Output: "/c"
 *
 * Example 5:
 * Input: "/a/../../b/../c//.//"
 * Output: "/c"
 *
 * Example 6:
 * Input: "/a//b////c/d//././/.."
 * Output: "/a/b/c"
 *
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
  var res = []
  path.split('/').forEach(v => {
    if (v === '..') {
      res.pop()
    } else if (v === '' || v === '.') {
      return true
    } else {
      res.push(v)
    }
  })

  return '/' + res.join('/')
};
