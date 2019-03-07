# leetcode算法题
跟着Charlotte小姐姐的计划去做算法题，[Charlotte小姐姐的Github](https://github.com/huxiaoman7/leetcodebook)

## [一：数组](https://github.com/huxiaoman7/leetcodebook/blob/master/Array/array.md)
1. 无序数组（链表）
    -. 概念：未经过排序的数组
    -. 优点：插入快
    -. 缺点：查找慢，删除慢
2. 有序数组
    -. 概念：数组中的元素是按照一定规则排列的
    -. 优点：查找效率高
    -. 缺点：插入和删除较慢

### 1.1 K-Sum
这类题目通常会给定一个数组和一个值，让求出这个数组中两个/三个/K个值的和等于这个给定的值target

解法：
方法 | 说明 | 解题 
------------ | -------------
暴力解法 | 最常见，但是通常会超时 | 无 
hash-map | 建立一个hash-map循环遍历一次 | [hash-map解法](K-Sum-1.md)] 
two-pointers | 定位两个指针根据和的大小来移动另外一个。这里设定的指针个数根据题目中K的个数来定。3Sum中可以设定3个指针，固定两个，移动另一个 | [two-pointers解法](K-Sum-2.md) 

| 标题 | 地址 | 类型 | 功能 |
|:---:|:---:|:---:|:---:|
| [web-mobile-cli简易教程](https://github.com/sihai00/web-mobile-cli) | [链接](web-mobile-cli简易教程) | 工具 | 脚手架 |
| [clipboard.js](https://github.com/zenorocha/clipboard.js) | [链接](analysis/clipboard/) | 源码 | 复制 |
| [history](https://github.com/ReactTraining/history) | [链接](analysis/history/) | 源码 | 历史记录 |
| [sal](https://github.com/mciastek/sal) | [链接](sal) | 工具 | 滚动动画库 |
| [fallSnow](https://codepen.io/sihai00/pen/EGqpXp) | [链接](fallSnow) | 组件 | 下雪效果 |
| leetcode算法题 | [链接](algorithm) | 算法 | 算法题 |

题目：
| 序号 | 题目 | 难度 | 
|:---:|:---:|:---:|
| 1 | [Two Sum](https://leetcode.com/problems/two-sum/) | easy | 
| 15 | [3Sum](https://leetcode.com/problems/3sum/) | medium | 
| 18 | [4Sum](https://leetcode.com/problems/4sum) | medium | 

### 1.2 区间问题
这类题目通常会给一个包含多个子数组的数组，然后针对区间是否重合来判断true or false。

解法：
| 方法 | 说明 | 解题 | 
|:---:|:---:|:---:|
| 排序交集 | 1. 按start排序 2. 在前一个区间的end和后一个区间的start找交集 | [排序交集解法](ragne.md)] |

题目：
| 序号 | 题目 | 难度 | 
|:---:|:---:|:---:|
| 56 | [Merge Intervals](https://leetcode.com/problems/merge-intervals) | medium | 
| 57 | [Insert Interval](https://leetcode.com/problems/insert-interval) | hard | 

### 1.3 子数组类题目
这类题目通常会在一个包含多个子数组的数组中，求和/积，最大最小等。

解法：
| 方法 | 说明 | 解题 | 
|:---:|:---:|:---:|
| 滑动窗口 | 给定两个指针，按条件控制指针的进退 | [滑动窗口解法](subArray.md)] |

题目：
| 序号 | 题目 | 难度 | 
|:---:|:---:|:---:|
| 53 | [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) | easy | 
| 78 | [Subsets](https://leetcode.com/problems/subsets/) | medium | 
| 90 | [Subsets II](https://leetcode.com/problems/subsets-ii/) | medium | 
| 128 | [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence) | hard | 
| 152 | [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) | medium | 
| 209 | [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | medium | 
| 228 | [Summary Ranges](https://leetcode.com/problems/summary-ranges/) | medium | 
| 238 | [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | medium | 
| 239 | [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) | hard | 
| 295 | [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) | hard | 
