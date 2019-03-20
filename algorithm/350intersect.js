/**
 * 350. Intersection of Two Arrays II
 *
 * Example 1:
 * Input: nums1 = [1,2,2,1], nums2 = [2,2]
 * Output: [2,2]
 *
 * Example 2:
 * Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * Output: [4,9]
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  var record = new Map()

  for (var i = 0; i < nums1.length; i++) {
    record.set(nums1[i], (record.get(nums1[i]) || 0) + 1)
  }

  var result = []
  for (var j = 0; j < nums2.length; j++){
    if (record.get(nums2[j]) > 0) {
      result.push(nums2[j])
      record.set(nums2[j], record.get(nums2[j]) - 1)
    }
  }

  return result
};

// 哈希表
var intersect = function(nums1, nums2) {
  var record = {}

  for (var i = 0; i < nums1.length; i++) {
    record[nums1[i]] = record[nums1[i]] || 0
    record[nums1[i]] += 1
  }

  var result = []
  for (var j = 0; j < nums2.length; j++){
    if (record[nums2[j]] > 0) {
      result.push(nums2[j])
      record[nums2[j]] -= 1
    }
  }

  return result
};
