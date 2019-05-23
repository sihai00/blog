/**
 * 108. Convert Sorted Array to Binary Search Tree
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  if (nums.length === 0) return null

  var min = Math.floor(nums.length / 2)
  var root = new TreeNode(nums[min])
  root.left = sortedArrayToBST(nums.slice(0, min))
  root.right = sortedArrayToBST(nums.slice(min + 1))

  return root
};
