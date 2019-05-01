/**
 * 107. Binary Tree Level Order Traversal II
 *
 * [3,9,20,null,null,15,7]
 * [
 *   [15,7],
 *   [9,20],
 *   [3]
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
var levelOrderBottom = function(root) {
  if (!root) return []

  var res = []
  var queue = [{node: root, level: 0}]

  while(stack.length) {
    var head = queue.shift()
    var level = head.level

    if (res[level]) {
      res[level].push(head.node.val)
    } else {
      res[level] = [head.node.val]
    }

    if (head.node.left) queue.push({node: head.node.left, level: level + 1})
    if (head.node.right) queue.push({node: head.node.right, level: level + 1})
  }

  return res.reverse()
};

var levelOrderBottom = function(root) {
  if (!root) return []

  var res = []
  var queue = [root]

  while(stack.length) {
    var item = []

    for (var i = 0, len = queue.length; i < len; i++) {
      var head = queue.shift()

      item.push(head.val)
      if (head.left) queue.push(head.left)
      if (head.right) queue.push(head.right)
    }

    res.unshift(item)
  }

  return res
};
