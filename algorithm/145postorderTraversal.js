/**
 * 145. Binary Tree Postorder Traversal（后序遍历）
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
var postorderTraversal = function(root) {
  var res = []

  postorder(root)
  function postorder(node){
    if (!node) return

    postorder(node.left)
    postorder(node.right)
    res.push(node.val)
  }

  return res
};
