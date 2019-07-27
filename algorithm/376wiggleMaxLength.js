/**
 * 376. 摆动序列
 * 给定一个整数序列，返回作为摆动序列的最长子序列的长度。 通过从原始序列中删除一些（也可以不删除）元素来获得子序列，剩下的元素保持其原始顺序。
 *
 * 示例 1:
 * 输入: [1,7,4,9,2,5]
 * 输出: 6
 * 解释: 整个序列均为摆动序列
 *
 * 示例 2:
 * 输入: [1,17,5,10,13,15,10,5,16,8]
 * 输出: 7
 * 解释: 这个序列包含几个长度为 7 摆动序列，其中一个可为[1,17,10,13,10,16,8]。
 *
 * 示例 3:
 * 输入: [1,2,3,4,5,6,7,8,9]
 * 输出: 2
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function(nums) {
  var n = nums.length
  if (n < 2) return n

  var up = 1
  var down = 1
  for (var i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      up = down + 1
    }
    if (nums[i] < nums[i - 1]) {
      down = up + 1
    }
  }

  return Math.max(up, down)
};
function flat(arr){
  if (!Array.isArray(arr)) return arr
  var res = []
  var stack = [...arr]
  while(stack.length) {
    var next = stack.shift()
    if (Array.isArray(next)) {
      stack.push(...next)
    } else {
      res.push(next)
    }
  }
  return res
}
flat([1, [2, [3, [4, [5]]]]])
