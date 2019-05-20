/**
 * 98. Validate Binary Search Tree
 * Example 1:
 * Input: [2,1,3]
 * Output: true
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root, max = Infinity, min = -Infinity) {
  if (root == null) return true

  var left = isValidBST(root.left, root.val, min)
  var right = isValidBST(root.right, max, root.val)

  return root.val > min && root.val < max && left && right
};
