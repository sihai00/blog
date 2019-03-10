/**
 * 88.Merge Sorted Array
 * Input:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6],       n = 3
 * Output: [1,2,2,3,5,6]
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  var k = m + n - 1
  var i = m - 1
  var j = n - 1

  while(i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i]
      k -= 1
      i -= 1
    } else {
      nums1[k] = nums2[j]
      k -= 1
      j -= 1
    }
  }

  while(j >= 0) {
    nums1[k] = nums2[j]
    k -= 1
    j -= 1
  }

  return nums1
};
