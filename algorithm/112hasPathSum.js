/**
 * 112. Path Sum
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
  if (root == null) return false

  if (root.left == null && root.right == null) return root.val === sum

  return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val)
};
