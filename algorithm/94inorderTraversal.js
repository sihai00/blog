/**
 * 94. Binary Tree Inorder Traversal（中序遍历）
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  var res = []

  inorder(root)
  function inorder(node) {
    if (!node) return

    inorder(node.left)
    res.push(node.val)
    inorder(node.right)
  }

  return res
};
