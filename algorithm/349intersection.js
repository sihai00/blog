/**
 * 349.Intersection of Two Arrays
 *
 * Example 1:
 * Input: nums1 = [1,2,2,1], nums2 = [2,2]
 * Output: [2]
 *
 * Example 2:
 * Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * Output: [9,4]
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  var record = new Set(nums1)

  var resultSet = new Set()
  for(var i = 0; i < nums2.length; i++){
    if (record.has(nums2[i])){
      resultSet.add(nums2[i])
    }
  }

  return [...resultSet]
};
