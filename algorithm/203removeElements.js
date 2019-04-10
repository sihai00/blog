/**
 * 203. Remove Linked List Elements
 * Example:
 * Input:  1->2->6->3->4->5->6, val = 6
 * Output: 1->2->3->4->5
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  var dummpHead = new ListNode()
  dummpHead.next = head

  var cur = dummpHead
  while(cur.next !== null) {
    if (cur.next.val === val){
      var del= cur.next
      cur.next = del.next
    } else {
      cur = cur.next
    }
  }

  return dummpHead.next
};
