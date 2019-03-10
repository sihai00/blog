/**
 * 215.Kth Largest Element in an Array
 * Example 1：
 * Input: [3,2,1,5,6,4] and k = 2
 * Output: 5
 *
 * Example 2:
 * Input: [3,2,3,1,2,4,5,5,6] and k = 4
 * Output: 4
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  return quickselect(nums, 0, nums.length - 1, k)
};
// 随机数
function randomInt(a, b) {
  return (Math.random() * (b - a) + a) >> 0;
}
// 快速排序找出随机数在数组中第几大元素
function quickselect(nums, l, r, k) {
  let j = l;
  // 如果一直取最左值，近乎有序的数组会让快排退化为O(n*n)
  let rand = randomInt(l, r + 1);
  swap(nums, rand, r);

  for (let i = l; i < r; i++) {
    if (nums[i] <= nums[r]){
      swap(nums, j++, i);
    }
  }

  swap(nums, j, r);

  let gte = r - j + 1;

  if (gte === k) {
    return nums[j];
  } else if (gte > k) {
    return quickselect(nums, j + 1, r, k);
  } else {
    return quickselect(nums, l, j - 1, k - gte);
  }
}
// 交换数组值
function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
