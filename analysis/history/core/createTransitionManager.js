import warning from "tiny-warning";

function createTransitionManager() {
  let prompt = null;

  // 设置提示
  function setPrompt(nextPrompt) {
    warning(prompt == null, "A history supports only one prompt at a time");

    prompt = nextPrompt;

    // 解除
    return () => {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  /**
   * 执行提示
   * @param location
   * @param action
   * @param getUserConfirmation 设置弹框
   * @param callback 回调函数：block函数的返回值作为参数
   */
  function confirmTransitionTo(
    location,
    action,
    getUserConfirmation,
    callback
  ) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      const result =
        typeof prompt === "function" ? prompt(location, action) : prompt;

      if (typeof result === "string") {
        if (typeof getUserConfirmation === "function") {
          getUserConfirmation(result, callback);
        } else {
          warning(
            false,
            "A history needs a getUserConfirmation function in order to use a prompt message"
          );

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  let listeners = [];

  // 设置监听函数
  function appendListener(fn) {
    let isActive = true;

    function listener(...args) {
      if (isActive) fn(...args);
    }

    listeners.push(listener);

    // 解除
    return () => {
      isActive = false;
      listeners = listeners.filter(item => item !== listener);
    };
  }

  // 执行监听函数
  function notifyListeners(...args) {
    listeners.forEach(listener => listener(...args));
  }

  return {
    setPrompt,
    confirmTransitionTo,
    appendListener,
    notifyListeners
  };
}

export default createTransitionManager;
