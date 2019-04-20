/**
 * 143. Reorder List
 * Example 1:
 * Given 1->2->3->4, reorder it to 1->4->2->3.
 *
 * Example 2:
 * Given 1->2->3->4->5, reorder it to 1->5->2->4->3.
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
  function findMiddle(head){
    var slot = head
    var fast = head.next

    while(fast && fast.next) {
      slot = slot.next
      fast = fast.next.next
    }

    return slot
  }
  function reverse(head){
    var pre = null

    while(head) {
      var next = head.next
      head.next = pre
      pre = head
      head = next
    }

    return pre
  }
  function merge(head1, head2){
    var res = new ListNode(0)
    res.next = head1

    while(head1 && head2) {
      var temp1 = head1.next
      head1.next = head2
      var temp2 = head2.next
      head2.next = temp1

      head1 = temp1
      head2 = temp2
    }

    head1.next = null

    return res.next
  }

  if (!head || !head.next) return head

  var mid = findMiddle(head)
  var head2 = reverse(mid.next)

  return merge(head, head2)
};
