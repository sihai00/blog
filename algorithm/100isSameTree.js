/**
 * 100. Same Tree
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  if (!p && !q) {
    return true
  } else if ((p && !q) || (!p && q)) {
    return false
  }

  if (p.val !== p.val) return false

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
