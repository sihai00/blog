/**
 * 206. Reverse Linked List
 *
 * Example:
 * Input: 1->2->3->4->5->NULL
 * Output: 5->4->3->2->1->NULL
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
var reverseList = function(head) {
  var pre = null
  var cur = head

  while(cur){
    var next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }

  return pre
};
