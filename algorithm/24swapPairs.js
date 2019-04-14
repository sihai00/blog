/**
 * 24. Swap Nodes in Pairs
 * Example:
 * Given 1->2->3->4, you should return the list as 2->1->4->3.
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
var swapPairs = function(head) {
  var dummpHead = new ListNode()
  dummpHead.next = head
  var cur = dummpHead

  while(cur.next && cur.next.next) {
    var node1 = cur.next
    var node2 = node1.next
    var next = node2.next

    node2.next = node1
    node1.next = next
    cur.next = node2

    cur = node1
  }

  return dummpHead.next
};
