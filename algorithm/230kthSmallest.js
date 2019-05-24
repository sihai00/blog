/**
 * 230. Kth Smallest Element in a BST
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  if (root == null) return 0

  var leftcount = count(root.left)

  if (k < leftcount + 1) {
    return kthSmallest(root.left, k)
  } else if (k > leftcount + 1) {
    return kthSmallest(root.right, k - leftcount - 1)
  } else {
    return root.val
  }
};
function count(root){
  if (root == null) return 0

  return 1 + count(root.left) + count(root.right)
}
