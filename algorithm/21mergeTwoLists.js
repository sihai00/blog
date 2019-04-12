/**
 * 21. Merge Two Sorted Lists
 * Example:
 * Input: 1->2->4, 1->3->4
 * Output: 1->1->2->3->4->4
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  var cur = new ListNode()
  var head = cur

  while(l1 && l2){
    if (l1.val > l2.val) {
      cur.next = l2
      l2 = l2.next
    } else {
      cur.next = l1
      l1 = l1.next
    }

    cur = cur.next
  }

  cur.next = l1 ? l1 : l2

  return head.next
};
