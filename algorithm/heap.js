class heap {
  constructor(capacity) {
    this.data = Array(capacity).fill(null)
    this.size = 0
  }
  size(){
    return this.size
  }
  insert(item){
    this.data[this.size + 1] = item
    this.size = this.size + 1
    this.shiftUp(this.size)
  }
  shiftUp(k){
    while(k > 1 && this.data[k] > this.data[Math.floor(k / 2)]) {
      this.data = this.swap(this.data, Math.floor(k  / 2), k)
      k = Math.floor(k / 2)
    }
  }
  swap(arr, a, b){
    var temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp

    return arr
  }
}
