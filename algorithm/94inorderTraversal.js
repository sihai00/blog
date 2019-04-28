/**
 * 94. Binary Tree Inorder Traversal（中序遍历）
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
var inorderTraversal = function(root) {
  var res = []

  inorder(root)
  function inorder(node) {
    if (!node) return

    inorder(node.left)
    res.push(node.val)
    inorder(node.right)
  }

  return res
};

var inorderTraversal = function(root) {
  if (!root) return []
  var res = []
  var stack = [{type: 'go', node: root}]

  while(stack.length) {
    var top = stack.pop()

    if (top.type === 'print'){
      res.push(top.node)
    } else {
      if (top.node.right) stack.push({type: 'go', node: top.node.right})
      stack.push({type: 'print', node: top.node.val})
      if (top.node.left) stack.push({type: 'go', node: top.node.left})
    }
  }

  return res
};
