(function(){
  // 函数调用次数
  var num = 0

  /**
   * 斐波那契数列
   * @param n
   * @returns number
   */
  function fib(n){
    num ++
    if (n === 0) return 0
    if (n === 1) return 1

    return fib(n - 1) + fib(n - 2)
  }

  /**
   * 斐波那契数列
   * 缺点：大量重复的值反复计算
   * 优化：记忆化搜索（自顶向下），使用数组记忆计算过的值
   * @param n
   * @returns number
   */
  function fib1(n) {
    // 记录重复值
    var memo = []

    function fib(n){
      num ++
      if (n === 0) return 0
      if (n === 1) return 1

      if (!memo[n]) memo[n] = fib(n - 1) + fib(n - 2)

      return memo[n]
    }

    fib(n)

    return memo[n]
  }
})()
