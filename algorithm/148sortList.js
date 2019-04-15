/**
 * 148. Sort List
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
var sortList = function(head) {
  if (!head || !head.next) return head
  var p1 = head
  var p2 = head.next

  while(p2 && p2.next) {
    p1 = p1.next
    p2 = p2.next.next
  }

  p2 = sortList(p1.next)
  // 切分两段链表
  p1.next = null
  p1 = sortList(head)

  return merge(p1, p2)
};

function merge(p1, p2){
  var dummpHead = new ListNode()
  var cur = dummpHead

  while(p1 && p2){
    if (p1.val > p2.val){
      cur.next = p2
      p2 = p2.next
    } else {
      cur.next = p1
      p1 = p1.next
    }

    cur = cur.next
  }

  cur.next = p1 ? p1 : p2

  return dummpHead.next
};
