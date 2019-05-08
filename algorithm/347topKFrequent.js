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

var topKFrequent = function(nums, k) {
  var obj = {}
  var heap = new minHeap(k)

  for (var i = 0; i < nums.length; i++) {
    var val = obj[nums[i]]
    obj[nums[i]] = val ? val + 1 : 1
  }

  for(let i of Object.keys(obj)){
    if (heap.size < k) {
      heap.insert({
        key: i,
        num: obj[i]
      })
    }else{
      if (heap.data[1].num < obj[i]) {
        heap.extractMin()
        heap.insert({
          key: i,
          num: obj[i]
        })
      }
    }
  }

  var res = []
  for (var i = 0, len = heap.size; i < len; i++) {
    res.push(heap.extractMin().key)
  }

  return res
};

class minHeap {
  constructor(capacity) {
    this.capacity = capacity
    this.data = Array(capacity).fill(null)
    this.size = 0
  }
  _shiftUp(k){
    while(k > 1 && this.data[k].num < this.data[Math.floor(k / 2)].num) {
      this.data = this.swap(this.data, Math.floor(k  / 2), k)
      k = Math.floor(k / 2)
    }
  }
  _shiftDown(k){
    while(2 * k <= this.size){
      let j = 2 * k
      if (j + 1 <= this.size && this.data[j].num > this.data[j + 1].num) j = j + 1

      if (this.data[k].num < this.data[j].num) break

      this.data = this.swap(this.data, k, j)
      k = j
    }
  }
  size(){
    return this.size
  }
  insert(item){
    if (this.size + 1 > this.capacity) return
    this.data[this.size + 1] = item
    this.size = this.size + 1
    this._shiftUp(this.size)
  }
  extractMin(){
    if (this.size <= 0) return
    let res = this.data[1]

    this.data = this.swap(this.data, 1, this.size)
    this.size = this.size - 1
    this._shiftDown(1)
    return res
  }
  swap(arr, a, b){
    var temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp

    return arr
  }
}
