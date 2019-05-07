class maxHeap {
  constructor(capacity) {
    this.capacity = capacity
    this.data = Array(capacity).fill(null)
    this.size = 0
  }
  _shiftUp(k){
    while(k > 1 && this.data[k] > this.data[Math.floor(k / 2)]) {
      this.data = this.swap(this.data, Math.floor(k  / 2), k)
      k = Math.floor(k / 2)
    }
  }
  _shiftDown(k){
    while(2 * k <= this.size){
      let j = 2 * k
      if (j + 1 <= this.size && this.data[j] < this.data[j + 1]) j = j + 1

      if (this.data[k] > this.data[j]) break

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
  extractMax(){
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

class minHeap {
  constructor(capacity) {
    this.capacity = capacity
    this.data = Array(capacity).fill(null)
    this.size = 0
  }
  _shiftUp(k){
    while(k > 1 && this.data[k] < this.data[Math.floor(k / 2)]) {
      this.data = this.swap(this.data, Math.floor(k  / 2), k)
      k = Math.floor(k / 2)
    }
  }
  _shiftDown(k){
    while(2 * k <= this.size){
      let j = 2 * k
      if (j + 1 <= this.size && this.data[j] > this.data[j + 1]) j = j + 1

      if (this.data[k] < this.data[j]) break

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
