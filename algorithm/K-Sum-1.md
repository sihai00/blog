# hash-map解法
活用对象来实现

## 1.Two Sum
```javascript
/**
 * @topic 1.Two Sum https://leetcode.com/problems/two-sum/ 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var obj = {}

  for(var i = 0; i < nums.length; i++) {
    var complement = target - nums[i]
    if (complement in obj) {
      return [obj[complement], i]
    }

    obj[nums[i]] = i
  }

  return null
};
```