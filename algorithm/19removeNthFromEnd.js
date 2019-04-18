/**
 * 19. Remove Nth Node From End of List
 * Example:
 * Given linked list: 1->2->3->4->5, and n = 2.
 * After removing the second node from the end, the linked list becomes 1->2->3->5.
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  if (n < 0) return
  var cur = new ListNode()
  var p = new ListNode()
  var q = new ListNode()

  cur.next = head
  p.next = cur
  q.next = cur

  for (var i = 0; i < n + 1; i++) {
    q = q.next
  }

  while(q) {
    p = p.next
    q = q.next
  }

  p.next = p.next.next

  return cur.next
};
