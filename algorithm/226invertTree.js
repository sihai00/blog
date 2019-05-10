/**
 * 226. Invert Binary Tree
 *
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {

  if (!root) return null

  let left = invertTree(root.left)
  var right = invertTree(root.right)

  var temp = root.left
  root.left = root.right
  root.right = temp

  return root
};
