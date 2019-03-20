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

// 哈希表
var intersection = function(nums1, nums2) {
  var record = {}
  for (var i = 0; i < nums1.length; i++) {
    if (!record[nums1[i]]) {
      record[nums1[i]] = 1
    }
  }

  var resultSet = {}
  for(var j = 0; j < nums2.length; j++){
    if (record[nums2[j]]){
      resultSet[nums2[j]] = 1
    }
  }

  return Object.keys(resultSet)
};
