/**
 * 328. Odd Even Linked List
 * Example 1:
 * Input: 1->2->3->4->5->NULL
 * Output: 1->3->5->2->4->NULL
 *
 * Example 2:
 * Input: 2->1->3->5->6->4->7->NULL
 * Output: 2->3->6->7->1->5->4->NULL
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
  if (head === null) return null

  var left = new ListNode()
  var right = new ListNode()
  var leftIndex = left
  var rightIndex = right
  var isLeft = true

  while(head !== null) {
    if (isLeft) {
      left.next = head
      left = left.next
      isLeft = false
    } else {
      right.next = head
      right = right.next
      isLeft = true
    }

    head = head.next
  }

  right.next = null
  left.next = rightIndex.next
  return leftIndex.next
};
