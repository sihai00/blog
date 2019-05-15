/**
 * 257. Binary Tree Paths
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  if (root == null) return []

  var res = []
  if (root.left == null && root.right == null) return res.concat(String(root.val))
  if (root.left) {
    var left = binaryTreePaths(root.left)

    for (var i = 0; i < left.length; i++) {
      res.push(root.val + '->' + left[i])
    }
  }
  if (root.right) {
    var right = binaryTreePaths(root.right)

    for (var i = 0; i < right.length; i++) {
      res.push(root.val + '->' + right[i])
    }
  }

  return res
};
