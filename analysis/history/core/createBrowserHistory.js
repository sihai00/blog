import warning from "tiny-warning";
import invariant from "tiny-invariant";

import { createLocation } from "./LocationUtils";
import {
  addLeadingSlash,
  stripTrailingSlash,
  hasBasename,
  stripBasename,
  createPath
} from "./PathUtils";
import createTransitionManager from "./createTransitionManager";
import {
  canUseDOM,
  getConfirmation,
  supportsHistory,
  supportsPopStateOnHashChange,
  isExtraneousPopstateEvent
} from "./DOMUtils";

const PopStateEvent = "popstate";
const HashChangeEvent = "hashchange";

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
function createBrowserHistory(props = {}) {
  invariant(canUseDOM, "Browser history needs a DOM");

  // 浏览器的history
  const globalHistory = window.history;
  const canUseHistory = supportsHistory();
  const needsHashChangeListener = !supportsPopStateOnHashChange();

  const {
    forceRefresh = false,
    getUserConfirmation = getConfirmation,
    keyLength = 6
  } = props;
  
  // 处理basename（相对地址，例如：首页为index，假如设置了basename为/the/base，那么首页为/the/base/index）
  const basename = props.basename
    ? stripTrailingSlash(addLeadingSlash(props.basename))
    : "";

  /**
   * 处理state参数和window.location
   * @param historyState
   * @returns {{hash, key, pathname, search, state}}
   */
  function getDOMLocation(historyState) {
    const { key, state } = historyState || {};
    const { pathname, search, hash } = window.location;

    let path = pathname + search + hash;

    warning(
      !basename || hasBasename(path, basename),
      "You are attempting to use a basename on a page whose URL path does not begin " +
        'with the basename. Expected path "' +
        path +
        '" to begin with "' +
        basename +
        '".'
    );
    
    // 保证path是不包含basename的
    if (basename) path = stripBasename(path, basename);
    
    // 创建history.location对象
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random()
      .toString(36)
      .substr(2, keyLength);
  }

  const transitionManager = createTransitionManager();

  function setState(nextState) {
    // 更新history
    Object.assign(history, nextState);
    history.length = globalHistory.length;

    // 执行监听函数listener
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;

    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  let forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      const action = "POP";

      // 执行block函数
      transitionManager.confirmTransitionTo(
        location,
        action,
        getUserConfirmation,
        ok => {
          if (ok) {
            setState({ action, location });
          } else {
            revertPop(location);
          }
        }
      );
    }
  }

  function revertPop(fromLocation) {
    const toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    let toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    let fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    const delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  const initialLocation = getDOMLocation(getHistoryState());
  let allKeys = [initialLocation.key];

  // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
    warning(
      !(
        typeof path === "object" &&
        path.state !== undefined &&
        state !== undefined
      ),
      "You should avoid providing a 2nd state argument to push when the 1st " +
        "argument is a location-like object that already has state; it is ignored"
    );

    const action = "PUSH";
    // 构造location
    const location = createLocation(path, state, createKey(), history.location);

    // 执行block函数，弹出框
    transitionManager.confirmTransitionTo(
      location,
      action,
      getUserConfirmation,
      ok => {
        if (!ok) return;

        // 获取当前路径名
        const href = createHref(location);
        const { key, state } = location;

        if (canUseHistory) {
          // 添加历史条目
          globalHistory.pushState({ key, state }, null, href);

          if (forceRefresh) {
            // 强制刷新
            window.location.href = href;
          } else {
            const prevIndex = allKeys.indexOf(history.location.key);
            const nextKeys = allKeys.slice(
              0,
              prevIndex === -1 ? 0 : prevIndex + 1
            );

            nextKeys.push(location.key);
            allKeys = nextKeys;

            // 更新history
            setState({ action, location });
          }
        } else {
          warning(
            state === undefined,
            "Browser history cannot push state in browsers that do not support HTML5 history"
          );

          window.location.href = href;
        }
      }
    );
  }

  function replace(path, state) {
    warning(
      !(
        typeof path === "object" &&
        path.state !== undefined &&
        state !== undefined
      ),
      "You should avoid providing a 2nd state argument to replace when the 1st " +
        "argument is a location-like object that already has state; it is ignored"
    );

    const action = "REPLACE";
    // 获取当前路径名
    const location = createLocation(path, state, createKey(), history.location);

    // 执行block函数，弹出框
    transitionManager.confirmTransitionTo(
      location,
      action,
      getUserConfirmation,
      ok => {
        if (!ok) return;

        const href = createHref(location);
        const { key, state } = location;

        if (canUseHistory) {
          globalHistory.replaceState({ key, state }, null, href);

          if (forceRefresh) {
            window.location.replace(href);
          } else {
            const prevIndex = allKeys.indexOf(history.location.key);

            if (prevIndex !== -1) allKeys[prevIndex] = location.key;

            setState({ action, location });
          }
        } else {
          warning(
            state === undefined,
            "Browser history cannot replace state in browsers that do not support HTML5 history"
          );

          window.location.replace(href);
        }
      }
    );
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  let listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      // 监听history
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener)
        window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);

      if (needsHashChangeListener)
        window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  let isBlocked = false;

  /**
   * 每次跳转都会触发，允许设置跳转的提示
   * @param prompt
   * @returns {function(): *}
   */
  function block(prompt = false) {
    // 设置提示
    const unblock = transitionManager.setPrompt(prompt);

    // 是否设置了block
    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    // 解除block函数
    return () => {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      // 消除提示
      return unblock();
    };
  }

  /**
   * 跳转时的监听函数
   * @param {Function} listener
   * @returns {Function}
   */
  function listen(listener) {
    // 添加监听函数到队列
    const unlisten = transitionManager.appendListener(listener);

    checkDOMListeners(1);

    // 解除监听
    return () => {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  const history = {
    //  window.history属性长度
    length: globalHistory.length,

    // history 当前行为（包含PUSH-进入、POP-弹出、REPLACE-替换）
    action: "POP",

    // location对象（与地址有关）
    location: initialLocation,

    // 当前地址（包含pathname）
    createHref,

    // 跳转的方法
    push,
    replace,
    go,
    goBack,
    goForward,

    // 截取
    block,
    
    // 监听
    listen
  };

  return history;
}

export default createBrowserHistory;
