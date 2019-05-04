/**
 * 199. Binary Tree Right Side View
 *
 * Example:
 * Input: [1,2,3,null,5,null,4]
 * Output: [1, 3, 4]
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

var rightSideView = function(root) {
  if (!root) return []
  var res = []
  var queue = [{node: root, level: 0}]

  while(queue.length) {
    var head = queue.shift()
    var level = head.level

    if (!res[level]) {
      res[level] = head.node.val
    }

    if (head.node.right) queue.push({node: head.node.right, level: level + 1})
    if (head.node.left) queue.push({node: head.node.left, level: level + 1})
  }

  return res
};

var rightSideView = function(root) {
  if (!root) return []

  var res = []
  var queue = [root]

  while(queue.length) {
    var item = []

    for (var i = 0, len = queue.length; i < len; i++) {
      var head = queue.shift()

      if (i === 0) item.push(head.val)
      if (head.right) queue.push(head.right)
      if (head.left) queue.push(head.left)
    }

    res.push(item)
  }

  return res
};
