/**
 * 404. Sum of Left Leaves
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
var sumOfLeftLeaves = function(root) {
  if (root == null) return 0

  var sum = 0
  if (isLeft(root.left)) {
    sum += root.left.val
  } else {
    sum += sumOfLeftLeaves(root.left)
  }

  sum += sumOfLeftLeaves(root.right)

  return sum
};

function isLeft(root) {
  if (root == null) return false
  if (root.left == null && root.right == null) return true

  return false
}
