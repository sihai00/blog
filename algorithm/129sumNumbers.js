/**
 * 129. Sum Root to Leaf Numbers
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
  if (root == null) return 0

  if (root.left == null && root.right == null) return root.val

  var res = _sumNumbers(root)

  return res.reduce((a, b) => a + Number(b.join('')), 0)
};

function _sumNumbers(root){
  if (root == null) return []

  var res = []
  if (root.left == null && root.right == null) {
    res.push(root.val)
    return res
  }

  var left = _sumNumbers(root.left)
  for (var i = 0; i < left.length; i++) {
    res.push([root.val].concat(left[i]))
  }

  var right = _sumNumbers(root.right)
  for (var i = 0; i < right.length; i++) {
    res.push([root.val].concat(right[i]))
  }

  return res
}

var sumNumbers = function(root){
  function dfs(root, preNum) {
    if (root == null) return 0

    var num = preNum * 10 + root.val
    if (root.left == null && root.right == null) return num

    return dfs(root.left, num) + dfs(root.right, num)
  }

  return dfs(root, 0)
}
