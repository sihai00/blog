/**
 * 144. Binary Tree Preorder Traversal（前序遍历）
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
var preorderTraversal = function(root) {
  var res =  []

  preorder(root)
  function preorder(node) {
    if (!node) return
    res.push(node.val)
    preorder(node.left)
    preorder(node.right)
  }

  return res
};
