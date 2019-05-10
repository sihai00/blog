/**
 * 111. Minimum Depth of Binary Tree
 * Example:
 * Input：[3,9,20,null,null,15,7]
 * Output：2
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
var minDepth = function(root) {
  if (!root) return 0

  var left = minDepth(root.left)
  var right = minDepth(root.right)

  if (left && right) {
    return Math.min(left, right) + 1
  } else if(left && !right) {
    return left + 1
  } else if(!left && right){
    return right + 1
  }

  return 1
};
