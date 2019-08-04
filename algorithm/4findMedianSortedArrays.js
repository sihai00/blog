/**
 * 4. 寻找两个有序数组的中位数
 * 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 *
 * 示例 1:
 * nums1 = [1, 3]
 * nums2 = [2]
 * 则中位数是 2.0
 *
 * 示例 2:
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 * 则中位数是 (2 + 3)/2 = 2.5
 *
 * https://zhuanlan.zhihu.com/p/27104702?refer=linjichu
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  var m = nums1.length
  var n = nums2.length

  // 寻找两个数组中长度相加除以2的中间值即可，分奇偶情况。换个说法即在两个数组中寻找第k小元素。
  return findKth(nums1, nums2, (m + n + 1) >> 1) + findKth(nums1, nums2, (m + n + 2) >> 1)
};

// 二分查找第k小元素
var findKth = function(nums1, nums2, k) {
  if (nums1.length === 0) return nums2[k - 1]
  if (nums2.length === 0) return nums1[k - 1]
  if (k === 1) return Math.min(nums1[0], nums2[0])

  var i = Math.min(k >> 1, nums1.length)
  var j = Math.min(k >> 1, nums2.length)

  if (nums1[i - 1] > nums2[j - 1]) {
    return findKth(nums1, nums2.slice(j), k - j)
  }

 return findKth(nums1.slice(i), nums2, k - i)
}

var findMedianSortedArrays = function (nums1, nums2) {
  var nums = []
  while (nums1.length && nums2.length) {
    if (nums1[0] < nums2[0]) {
      nums.push(nums1.shift())
    } else {
      nums.push(nums2.shift())
    }
  }
  nums = nums.concat(nums1, nums2)
  var median
  if (nums.length % 2) {
    median = nums[Math.floor(nums.length / 2)]
  } else {
    var m = nums.length / 2
    median = (nums[m - 1] + nums[m]) / 2
  }
  return median
}
