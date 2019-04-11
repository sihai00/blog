/**
 * 82. Remove Duplicates from Sorted List II
 * Example 1:
 * Input: 1->2->3->3->4->4->5
 * Output: 1->2->5
 *
 * Example 2:
 * Input: 1->1->1->2->3
 * Output: 2->3
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
var deleteDuplicates = function(head) {
  var dummpHead = new ListNode()
  dummpHead.next = head
  var cur = dummpHead

  while(cur.next) {
    var next = cur.next

    while(next.next && next.next.val === next.val) {
      next = next.next
    }

    if (next !== cur.next) {
      cur.next = next.next;
    }else{
      cur = cur.next
    }
  }

  return dummpHead.next
};
