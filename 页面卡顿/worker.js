function selectSort(arr){
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        var temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
function random(min, max){
  return Math.floor((max - min + 1) * Math.random()) + min
}
function createArr(num, min, max) {
  return Array(num).fill(1).map(v => random(min, max))
}

self.addEventListener('message', function (e) {
  var arr = createArr(50000, 10, 10000)
  res = selectSort(arr)
  self.postMessage(res)
}, false);
