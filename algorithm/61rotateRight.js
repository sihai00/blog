/**
 * 61. Rotate List
 * Example 1:
 * Input: 1->2->3->4->5->NULL, k = 2
 * Output: 4->5->1->2->3->NULL
 * Explanation:
 * rotate 1 steps to the right: 5->1->2->3->4->NULL
 * rotate 2 steps to the right: 4->5->1->2->3->NULL
 *
 * Example 2:
 * Input: 0->1->2->NULL, k = 4
 * Output: 2->0->1->NULL
 * Explanation:
 * rotate 1 steps to the right: 2->0->1->NULL
 * rotate 2 steps to the right: 1->2->0->NULL
 * rotate 3 steps to the right: 0->1->2->NULL
 * rotate 4 steps to the right: 2->0->1->NULL
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
  if (!head) return null

  var len = get_len(head)
  // 末节点
  var end = head
  var k = k % len

  for (var i = 0; i < k; i++){
    end = end.next
  }
  // 开始节点
  var start = head
  while(end.next) {
    start = start.next
    end = end.next
  }

  // 拼接
  end.next = head
  head = start.next
  start.next = null

  return head
};

function get_len(head){
  var num = 0

  while(head) {
    num += 1
    head = head.next
  }

  return num
}
