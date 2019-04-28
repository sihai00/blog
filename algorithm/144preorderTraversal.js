/**
 * 144. Binary Tree Preorder Traversal（前序遍历）
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
var preorderTraversal = function(root) {
  var res =  []

  preorder(root)
  function preorder(node) {
    if (!node) return
    res.push(node.val)
    preorder(node.left)
    preorder(node.right)
  }

  return res
};

var preorderTraversal = function(root) {
  if (!root) return []
  var res = []
  var stack = [{type: 'go', node: root}]

  while(stack.length) {
    var top = stack.pop()

    if (top.type === 'print'){
      res.push(top.node)
    } else {
      if (top.node.right) stack.push({type: 'go', node: top.node.right})
      if (top.node.left) stack.push({type: 'go', node: top.node.left})
      stack.push({type: 'print', node: top.node.val})
    }
  }

  return res
};
