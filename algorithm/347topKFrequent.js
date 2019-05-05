/**
 * 347. Top K Frequent Elements
 *
 * Example 1:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 *
 * Example 2:
 * Input: nums = [1], k = 1
 * Output: [1]
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  var obj = {}, arr = []

  for (var i = 0; i < nums.length; i++) {
    var res = obj[nums[i]]
    obj[nums[i]] = res ? res + 1 : 1
  }

  for(let i of Object.keys(obj)){
    var min = arr[arr.length - 1]

    if (arr.length < k) {
      arr.push({
        key: i,
        num: obj[i]
      })
    }else{
      if (min.num < obj[i]) {
        arr.pop()
        arr.push({
          key: i,
          num: obj[i]
        })
      }
    }

    arr.sort((a, b) => b.num - a.num)
  }

  return arr.map(v => Number(v.key))
};
