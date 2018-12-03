(function(w){
  let History = {
    createBrowserHistory
  }

  // createBrowserHistory
  function createBrowserHistory(){
    // key
    function createKey() {
      return Math.random().toString(36).substr(2, 6);
    }

    // 获取地址信息
    function getDOMLocation(historyState = {}) {
      const { key, state } = historyState || {};
      const { pathname, search, hash } = window.location;

      return {pathname, search, hash, key};
    }
    // location地址信息
    let initialLocation = getDOMLocation()
    // 初始化allKeys
    let allKeys = [initialLocation.key]

    // listen数组
    let listener = []
    function listen(fn){
      listener.push(fn)

      checkDOMListeners()
    }

    // 只能添加一个监听历史条目改变的函数
    let isListener = false
    function checkDOMListeners(){
      if (!isListener) {
        isListener = true
        window.addEventListener('popstate', handlePop)
      }
    }

    // 跳过block。因为当点击弹出框的取消后，会执行go，然后会再一次执行handlePop函数，此次要跳过
    let forceNextPop = false
    // 监听历史条目改变
    function handlePop(event){
      let location = getDOMLocation(event.state)
      if (forceNextPop) {
        forceNextPop = false
      } else {
        // 弹出框
        let isComfirm = window.confirm(prompt(window.location))

        if (isComfirm) {
          // 确定
          // 更新history
          Object.assign(history, {location, length: history.length})
        } else {
          // 取消
          // 获取当前的history.key和上一次的location.key比较，然后进行回跳
          let toIndex = allKeys.indexOf(history.location.key)
          toIndex = toIndex === -1 ? 0 : toIndex

          let fromIndex = allKeys.indexOf(location.key)
          fromIndex = fromIndex === -1 ? 0 : fromIndex

          // 差值
          let delta = toIndex - fromIndex

          // 差值为0不跳
          if (delta) {
            forceNextPop = true;
            go(delta);
          }
        }
      }
    }

    // 截取函数
    let prompt = null
    function block(fn){
      prompt = fn
    }

    // push
    function push(href){
      let isComfirm = window.confirm(prompt(window.location))

      if (isComfirm) {
        let key = createKey()
        // 更新allKeys数组
        allKeys.push(key)
        // 更新历史条目
        w.history.pushState({key}, null, href)
        
        // 获取当前最新的location信息
        let location = getDOMLocation({key})

        // 更新history
        Object.assign(history, {location, length: history.length})
      } else {

      }
    }

    // go
    function go(n){
      w.history.go(n)
    }

    // goBack
    function goBack(){
      go(-1);
    }

    let history = {
      length: w.history.length,
      listen,
      block,
      push,
      go,
      goBack,
      location: initialLocation
    }
    return history
  }

  w.History = History
})(window)