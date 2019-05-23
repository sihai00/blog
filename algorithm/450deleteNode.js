/**
 * 450. Delete Node in a BST
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
  if (root == null) return null

  if (root.val > key) {
    root.left = deleteNode(root.left, key)
  } else if(root.val < key) {
    root.right = deleteNode(root.right, key)
  } else {
    if (root.left == null) return root.right
    if (root.right == null) return root.left

    var min = root.right
    while(min.left) min = min.left
    root.val = min.val
    root.right = deleteNode(root.right, root.val)
  }

  return root
};
