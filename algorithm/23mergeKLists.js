/**
 * 23. Merge k Sorted Lists
 * Example:
 * Input:
 * [
 *   1->4->5,
 *   1->3->4,
 *   2->6
 * ]
 * Output: 1->1->2->3->4->4->5->6
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  if (!lists || !lists.length) return null

  function merge(l1, l2){
    if (!l1) return l2
    if (!l2) return l1

    if (l1.val < l2.val) {
      l1.next = merge(l1.next, l2)
      return l1
    } else {
      l2.next = merge(l1, l2.next)
      return l2
    }
  }

  function partition(l, r){
    if (l === r) return lists[l]

    if (l <= r) {
      var mid = Math.floor((l+r)/2)
      var left = partition(l, mid)
      var right = partition(mid + 1, r)

      return merge(left, right)
    } else {
      return null
    }
  }

  return partition(0, lists.length - 1)
};
