/**
 * 150. Evaluate Reverse Polish Notation
 * Example 1:
 * Input: ["2", "1", "+", "3", "*"]
 * Output: 9
 * Explanation: ((2 + 1) * 3) = 9
 *
 * Example 2:
 * Input: ["4", "13", "5", "/", "+"]
 * Output: 6
 * Explanation: (4 + (13 / 5)) = 6
 *
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
  if (!tokens) return 0

  var res = []
  var a = 0
  var b = 0
  for (var i = 0; i < tokens.length; i++) {
    switch (tokens[i]) {
      case '+':
        b = res.pop()
        a = res.pop()
        res.push(a + b)
        break
      case '-':
        b = res.pop()
        a = res.pop()
        res.push(a - b)
        break
      case '*':
        b = res.pop()
        a = res.pop()
        res.push(a * b)
        break
      case '/':
        b = res.pop()
        a = res.pop()
        res.push(parseInt(a / b))
        break
      default:
        res.push(parseInt(tokens[i]))
    }
  }

  return res.pop()
};
