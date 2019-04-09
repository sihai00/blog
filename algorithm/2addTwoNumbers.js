/**
 * 2. Add Two Numbers
 * Example:
 * Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 * Output: 7 -> 0 -> 8
 * Explanation: 342 + 465 = 807.
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
var addTwoNumbers = function(l1, l2) {
  var head = new ListNode()
  var cur = head
  var add = 0

  while(l1 || l2){
    var v1 = l1 ? l1.val : 0
    var v2 = l2 ? l2.val : 0
    var sum = v1 + v2 + add
    add = ~~(sum / 10)
    cur.next = new ListNode(sum % 10)

    if (l1) l1 = l1.next
    if (l2)  l2 = l2.next
    cur = cur.next
  }

  if (add > 0){
    cur.next = new ListNode(add)
  }

  return head.next
};
