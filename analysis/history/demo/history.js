
  (function(w){
    let History = {
      createBrowserHistory
    }

    // createBrowserHistory
    function createBrowserHistory(){
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

      // 监听历史条目改变
      let forceNextPop = false
      function handlePop(event){
        if (forceNextPop) {
          forceNextPop = false
        } else {
          let isComfirm = window.confirm(prompt(window.location))

          if (!isComfirm) {
            forceNextPop = true
            console.log('cancel')
            go(1)
          }
        }
      }

      // 截取函数
      let prompt = null
      function block(fn){
        prompt = fn
      }

      function push(href){
        let isComfirm = window.confirm(prompt(window.location))

        if (isComfirm) w.history.pushState(null, null, href)
      }

      function go(n){
        w.history.go(n)
      }

      function goBack(){
        go(-1);
      }

      let history = {
        length: w.history.length,
        listen,
        block,
        push,
        go,
        goBack
      }
      return history
    }

    w.History = History
  })(window)