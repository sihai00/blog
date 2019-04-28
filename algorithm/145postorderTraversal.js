/**
 * 145. Binary Tree Postorder Traversal（后序遍历）
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
var postorderTraversal = function(root) {
  var res = []

  postorder(root)
  function postorder(node){
    if (!node) return

    postorder(node.left)
    postorder(node.right)
    res.push(node.val)
  }

  return res
};


var postorderTraversal = function(root) {
  if (!root) return []
  var res = []
  var stack = [{type: 'go', node: root}]

  while(stack.length) {
    var top = stack.pop()

    if (top.type === 'print'){
      res.push(top.node)
    } else {
      stack.push({type: 'print', node: top.node.val})
      if (top.node.right) stack.push({type: 'go', node: top.node.right})
      if (top.node.left) stack.push({type: 'go', node: top.node.left})
    }
  }

  return res
};
