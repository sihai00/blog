/**
 * 113. Path Sum II
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  if (root == null) return []

  var res = []

  if (root.left == null && root.right == null) {
    if (sum - root.val === 0) {
      res.push(root.val)
      return [res]
    }else{
      return res
    }
  }

  return _pathSum(root, sum)
};

function _pathSum(root, sum){
  var res = []

  if (root.left == null && root.right == null) {
    if (sum - root.val === 0) {
      res.push(root.val)
      return res
    }
  }

  var left = pathSum(root.left, sum - root.val) || []
  for (var i = 0; i < left.length; i++) {
    res.push([root.val].concat(left[i]))
  }

  var right = pathSum(root.right, sum - root.val) || []
  for (var i = 0; i < right.length; i++) {
    res.push([root.val].concat(right[i]))
  }

  return res
}
