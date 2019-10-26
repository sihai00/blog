/**
 * 235. Lowest Common Ancestor of a Binary Search Tree
 * Example 1:
 * Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
 * Output: 6
 * Explanation: The LCA of nodes 2 and 8 is 6.
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (root == null) return null

  if (p > root.val && q > root.val) lowestCommonAncestor(root.right, p, q)
  if (p < root.val && q < root.val) lowestCommonAncestor(root.left, p, q)

   return root
};
