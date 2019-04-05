/**
 * 92.Reverse Linked List II
 * Example:
 * Input: 1->2->3->4->5->NULL, m = 2, n = 4
 * Output: 1->4->3->2->5->NULL
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
function reverseBetween(head, m, n) {
  var before = new ListNode()
  var pre = before

  while(--m) {
    pre = pre.next
    --n
  }

  var cur = pre.next
  while(--n) {
    var next = cur.next
    cur.next = next.next
    next.next = pre.next
    pre.next = next
  }

  return before.next
}
