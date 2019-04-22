/**
 * 234. Palindrome Linked List
 * Example 1:
 * Input: 1->2
 * Output: false
 *
 * Example 2:
 * Input: 1->2->2->1
 * Output: true
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  var first = ''
  var second = ''

  while(head) {
    first = head.val + first
    second = second + head.val

    head = head.next
  }

  return first === second
};

var isPalindrome = function(head) {
  function findMid(head){
    var slow = head
    var fast = head.next

    while(fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
    }

    return slow
  }
  function reverse(head){
    var pre = null

    while(head){
      var next = head.next
      head.next = pre
      pre = head
      head = next
    }

    return pre
  }
  function compare(head1, head2){
    while(head1 && head2){
      if (head1.val !== head2.val) return false

      head1 = head1.next
      head2 = head2.next
    }

    return true
  }

  if (!head || !head.next) return true

  var mid = findMid(head)
  var reverHead = reverse(mid.next)

  mid.next = null
  return compare(head, reverHead)
};
