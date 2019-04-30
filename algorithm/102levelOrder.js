/**
 * 102. Binary Tree Level Order Traversal
 * [3,9,20,null,null,15,7]
 * [
 *   [3],
 *   [9,20],
 *   [15,7]
 * ]
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) return []

  var res = []
  var stack = [{node: root, level: 0}]

  while(stack.length) {
    var head = stack.shift()
    var level = head.level

    if (res[level]) {
      res[level].push(head.node.val)
    } else {
      res[level] = [head.node.val]
    }

    if (head.node.left) stack.push({node: head.node.left, level: level + 1})
    if (head.node.right) stack.push({node: head.node.right, level: level + 1})
  }

  return res
};
