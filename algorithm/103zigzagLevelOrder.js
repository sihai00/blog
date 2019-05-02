/**
 * 103. Binary Tree Zigzag Level Order Traversal
 *
 * [3,9,20,null,null,15,7]
 * [
 *   [3],
 *   [20,9],
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
var zigzagLevelOrder = function(root) {
  if (!root) return []
  var res = []
  var queue = [{node: root, level: 0}]

  while(queue.length) {
    var head = queue.shift()
    var level = head.level

    if (res[level]) {
      if (level % 2 === 0) {
        res[level].push(head.node.val)
      } else {
        res[level].unshift(head.node.val)
      }
    } else {
      res[level] = [head.node.val]
    }

    if (head.node.left) queue.push({node: head.node.left, level: level + 1})
    if (head.node.right) queue.push({node: head.node.right, level: level + 1})
  }

  return res
};

var zigzagLevelOrder = function(root) {
  var queue = [root]
  var res = []
  var direction = true

  if (!root) return []

  while(queue.length){
    var val = []
    for (var i = 0, len = queue.length; i < len; i++) {
      var head = queue.shift()
      if (direction) {
        val.push(head.val)
      }else{
        val.unshift(head.val)
      }

      if (head.left) queue.push(head.left)
      if (head.right) queue.push(head.right)
    }

    res.push(val)
    direction = !direction
  }

  return res
};
