# leetcode算法题

## 一：数组

### 方法
| 方法 | 说明 | 题目 |
|:---:|:---:|:---:|
| 计数快排 | 计算数组中的元素，然后组合数组 | 75 |
| 三路快排 | 利用三路快排的思路解题 | 75、88、215 |
| 对撞指针 | 有序数组，最左指针和最右指针向中间移动 | 167、125、344、345、11、15、18、16 |
| 滑动窗口 | 两个指针，两个指针相同方向移动 | 209、3、438、76 |

### 题目
| 序号 | 题目 | 难度 | 解题
|:---:|:---:|:---:|:---:|
| 3 | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | medium | [javascript](3lengthOfLongestSubstring.js)
| 11 | [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | medium | [javascript](11maxArea.js)
| 15 | [3Sum](https://leetcode.com/problems/3sum/) | medium | [javascript](15threeSum.js)
| 16 | [3Sum Closest](https://leetcode.com/problems/3sum-closest/) | medium | [javascript](16threeSumClosest.js)
| 18 | [4Sum](https://leetcode.com/problems/4sum/) | medium | [javascript](18fourSum.js)
| 75 | [Sort Colors](https://leetcode.com/problems/sort-colors/) | easy | [javascript](75sortColors.js)
| 76 | [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) | hard | [javascript](76minWindow.js)
| 88 | [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) | easy | [javascript](88merge.js)
| 125 | [Valid Palindromey](https://leetcode.com/problems/valid-palindrome/) | easy | [javascript](125isPalindrome.js)
| 167 | [Two Sum II - Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | easy | [javascript](167twoSum.js)
| 209 | [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | medium | [javascript](209minSubArrayLen.js)
| 215 | [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) | medium | [javascript](215findKthLargest.js)
| 344 | [Reverse String](https://leetcode.com/problems/reverse-string/) | easy | [javascript](344reverseString.js)
| 345 | [Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string/) | easy | [javascript](345reverseVowels.js)
| 438 | [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | easy | [javascript](438findAnagrams.js)

## 二：查找

### 方法
| 方法 | 说明 | 题目 |
|:---:|:---:|:---:|
| set | 使用set数据结构 | 349、217 |
| 哈希表map | 使用map数据结构 | 349、350、242、202、290、205、451、1、454、49、447 |
| 滑动窗口 + 查找表 | 结合滑动窗口和set数据结构 | 219、220 |

### 题目
| 序号 | 题目 | 难度 | 解题
|:---:|:---:|:---:|:---:|
| 1 | [Two Sum](https://leetcode.com/problems/two-sum/) | easy | [javascript](1twoSum.js)
| 49 | [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | medium | [javascript](49groupAnagrams.js)
| 202 | [Happy Number](https://leetcode.com/problems/happy-number/) | easy | [javascript](202isHappy.js)
| 205 | [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) | easy | [javascript](205isIsomorphic.js)
| 217 | [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) | easy | [javascript](217containsDuplicate.js)
| 219 | [Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/) | easy | [javascript](219containsNearbyDuplicate.js)
| 219 | [Contains Duplicate III](https://leetcode.com/problems/contains-duplicate-iii/) | medium | [javascript](220containsNearbyAlmostDuplicate.js)
| 242 | [Valid Anagram](https://leetcode.com/problems/valid-anagram/) | easy | [javascript](242isAnagram.js)
| 290 | [Word Pattern](https://leetcode.com/problems/word-pattern/) | easy | [javascript](290wordPattern.js)
| 349 | [Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/) | easy | [javascript](349intersection.js)
| 350 | [Intersection of Two Arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii/) | easy | [javascript](350intersect.js)
| 447 | [Number of Boomerangs](https://leetcode.com/problems/number-of-boomerangs/) | easy | [javascript](447numberOfBoomerangs.js)
| 451 | [Sort Characters By Frequency](https://leetcode.com/problems/sort-characters-by-frequency/) | medium | [javascript](451frequencySort.js)
| 454 | [4Sum II](https://leetcode.com/problems/4sum-ii/) | medium | [javascript](454fourSumCount.js)

## 三：链表

### 方法
| 方法 | 说明 | 题目 |
|:---:|:---:|:---:|
| 链表 | 用前中后三个指针反转链表 | 206、92 |
| 链表 | 基础操作 | 83、86、328、2 |
| 链表 | 删除 | 203、82、21 |

### 题目
| 序号 | 题目 | 难度 | 解题
|:---:|:---:|:---:|:---:|
| 2 | [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) | medium | [javascript](2addTwoNumbers.js)
| 82 | [Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/) | medium | [javascript](82deleteDuplicates.js)
| 83 | [Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/) | esay | [javascript](83deleteDuplicates.js)
| 86 | [Partition List](https://leetcode.com/problems/partition-list/) | medium | [javascript](86partition.js)
| 92 | [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/) | medium | [javascript](92reverseBetween.js)
| 206 | [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) | easy | [javascript](206reverseList.js)
| 203 | [Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/) | easy | [javascript](203removeElements.js)
| 328 | [Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/) | medium | [javascript](328oddEvenList.js)
