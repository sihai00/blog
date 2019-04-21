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
