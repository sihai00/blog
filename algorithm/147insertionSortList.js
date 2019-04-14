/**
 * 147. Insertion Sort List
 * Example 1:
 * Input: 4->2->1->3
 * Output: 1->2->3->4
 *
 * Example 2:
 * Input: -1->5->3->4->0
 * Output: -1->0->3->4->5
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
var insertionSortList = function(head) {
  var dummpHead = new ListNode()
  dummpHead.next = head
  var cur = dummpHead

  while(cur.next && cur.next.next) {
    let current = cur.next
    let next = current.next

    if (current.val <= next.val) {
      cur = cur.next
    } else {
      current.next = next.next
      let headIndex = dummpHead

      while(headIndex.next.val < next.val) {
        headIndex = headIndex.next
      }

      next.next = headIndex.next
      headIndex.next = next
    }
  }

  return dummpHead.next
};
