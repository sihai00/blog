/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  var res = []
  var letterMap = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  }

  if (!digits) return res

  function findCombination(digits, index, s) {
    if (digits.length === index) {
      res.push(s)
      return
    }

    var num = digits[index]
    var letters = letterMap[num]

    for (var i = 0; i < letters.length; i++) {
      findCombination(digits, index + 1, s + letters[i])
    }

    return
  }

  findCombination(digits, 0, '')

  return res
};
