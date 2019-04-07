/**
 * 86. Partition List
 * Example:
 * Input: head = 1->4->3->2->5->2, x = 3
 * Output: 1->2->2->4->3->5
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
  if (head === null) return null

  var left = new ListNode()
  var right = new ListNode()
  var leftIndex = left, rightIndex = right

  var cur = head
  while(cur !== null) {
    if (cur.val < x) {
      left.next = cur
      left = left.next
    } else {
      right.next = cur
      right = right.next
    }

    cur = cur.next
  }

  right.next = null
  left.next = rightIndex.next

  return leftIndex.next
};
