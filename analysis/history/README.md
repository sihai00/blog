# history源码解析
> `history`是一个JavaScript库，可让你在JavaScript运行的任何地方轻松管理会话历史记录

## 1.前言
`history`是由Facebook维护的，`react-router`依赖于`history`，区别于浏览器的`window.history`，`history`是包含`window.history`的，让开发者可以在任何环境都能使用`history`的api（例如Node、React Native等）。

本篇读后感分为四部分，分别为前言、使用、解析、demo、总结，四部分互不相连可根据需要分开看。

前言和总结为吹水，解析为源码的解析，demo是抽取源码的核心实现的小demo，学以致用。

**建议跟着源码结合本文阅读，这样更加容易理解！** 
1. [history](https://github.com/ReactTraining/history)
2. [history解析的Github地址](https://github.com/sihai00/blog/blob/master/analysis/history)

## 2.使用
`history`有三种不同的方法创建history对象，取决于你的代码环境
1. createBrowserHistory：支持`HTML5 history api`的现代浏览器（例如：/index）
2. createHashHistory：传统浏览器（例如：/#/index）
3. createMemoryHistory：没有Dom的环境（例如：Node、React Native）

> 注意：本片文章只解析`createBrowserHistory`，其实原理都是差不多的

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="./umd/history.js"></script>
    <script>
      var createHistory = History.createBrowserHistory
      // var createHistory = History.createHashHistory

      var page = 0
      // createHistory创建所需要的history对象
      var h = createHistory()

      // h.block触发在地址栏改变之前，用于告知用户地址栏即将改变
      h.block(function (location, action) {
        return 'Are you sure you want to go to ' + location.path + '?'
      })

      // h.listen监听当前地址栏的改变
      h.listen(function (location) {
        console.log(location, 'lis-1')
      })
    </script>
  </head>
  <body>
    <p>Use the two buttons below to test normal transitions.</p>
    <p>
      <!-- h.push用于跳转 -->
      <button onclick="page++; h.push('/' + page, { page: page })">history.push</button>
      <!-- <button onclick="page++; h.push('/' + page)">history.push</button> -->

      <button onclick="h.goBack()">history.goBack</button>
    </p>
  </body>
</html>
```
`block`用于地址改变之前的截取，`listener`用于监听地址栏的改变，`push`、`replace`、`go(n)`等用于跳转，用法简单明了

## 3.解析
**贴出来的源码我会删减对理解原理不重要的部分！！!如果想看完整的请下载源码看哈**

从history的源码库目录可以看到modules文件夹，包含了几个文件
1. createBrowserHistory.js 创建createBrowserHistory的history对象
2. createHashHistory.js 创建createHashHistory的history对象
3. createMemoryHistory.js 创建createMemoryHistory的history对象
4. createTransitionManager.js 过渡管理（例如：处理block函数中的弹框、处理listener的队列）
5. DOMUtils.js DOM工具类（例如弹框、判断浏览器兼容性）
6. index.js 入口文件
7. LocationUtils.js 处理Location工具
8. PathUtils.js 处理Path工具

---

入口文件index.js
```javascript
export { default as createBrowserHistory } from "./createBrowserHistory";
export { default as createHashHistory } from "./createHashHistory";
export { default as createMemoryHistory } from "./createMemoryHistory";
export { createLocation, locationsAreEqual } from "./LocationUtils";
export { parsePath, createPath } from "./PathUtils";
```
把所有需要暴露的方法根据文件名区分开。其实只要了解的三种创建`history`中的一种，其他原理大概相同，我们先看`history`的构造函数`createBrowserHistory`。

### 3.1 createBrowserHistory
```javascript
// createBrowserHistory.js
function createBrowserHistory(props = {}){
  // 浏览器的history
  const globalHistory = window.history;
  // 初始化location
  const initialLocation = getDOMLocation(window.history.state);
  // 创建地址
  function createHref(location) {
    return basename + createPath(location);
  }

  ...

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
```
无论是从代码还是从用法上我们也可以看出，执行了`createBrowserHistory`后函数会返回`history`对象，`history`对象提供了很多属性和方法，最大的疑问应该是`initialLocation`函数，即`history.location`。我们的解析顺序如下：
1. location
2. createHref
3. block
4. listen
5. push
6. replace

#### 3.2 location
location属性存储了与地址栏有关的信息，我们对比下`createBrowserHistory`的返回值`history.location`和`window.location`

```javascript
// history.location
history.location = {
  hash: ""
  pathname: "/history/index.html"
  search: "?_ijt=2mt7412gnfvjpfeuv4hjkq2uf8"
  state: undefined
}

// window.location
window.location = {
  hash: ""
  host: "localhost:63342"
  hostname: "localhost"
  href: "http://localhost:63342/history/index.html?_ijt=2mt7412gnfvjpfeuv4hjkq2uf8"
  origin: "http://localhost:63342"
  pathname: "/history/index.html"
  port: "63342"
  protocol: "http:"
  reload: ƒ reload()
  replace: ƒ ()
  search: "?_ijt=2mt7412gnfvjpfeuv4hjkq2uf8"
}
```
结论是history.location是window.location的儿砸！我们来研究研究作者是怎么处理的。

```javascript
const initialLocation = getDOMLocation(window.history.state)
```

`initialLocation`函数等于`getDOMLocation`函数的返回值（`getDOMLocation`在`history`中会经常调用，理解好这个函数比较重要）。

```javascript
// createBrowserHistory.js
function createBrowserHistory(props = {}){
  // 处理basename（相对地址，例如：首页为index，假如设置了basename为/the/base，那么首页为/the/base/index）
  const basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : "";
  
  const initialLocation = getDOMLocation(window.history.state);

  // 处理state参数和window.location
  function getDOMLocation(historyState) {
    const { key, state } = historyState || {};
    const { pathname, search, hash } = window.location;

    let path = pathname + search + hash;

    // 保证path是不包含basename的
    if (basename) path = stripBasename(path, basename);

    // 创建history.location对象
    return createLocation(path, state, key);
  };

  const history = {
    // location对象（与地址有关）
    location: initialLocation,
    ...
  };

  return history;
}
```
一般大型的项目中都会把一个功能拆分成至少两个函数，一个专门处理参数的函数和一个接收处理参数实现功能的函数。
1. 处理参数：`getDOMLocation`函数主要处理`state`和`window.location`这两参数，返回自定义的`history.location`对象，主要构造`history.location`对象是`createLocation`函数。
2. 构造功能：`createLocation`实现具体构造`location`的逻辑。

接下来我们看在`LocationUtils.js`文件中的`createLocation`函数

```javascript
// LocationUtils.js
import { parsePath } from "./PathUtils";

export function createLocation(path, state, key, currentLocation) {
  let location;
  if (typeof path === "string") {
    // 两个参数 例如: push(path, state)

    // parsePath函数用于拆解地址 例如：parsePath('www.aa.com/aa?b=bb') => {pathname: 'www.aa.com/aa', search: '?b=bb', hash: ''}
    location = parsePath(path);
    location.state = state;
  } else {
    // 一个参数 例如: push(location)
    location = { ...path };

    location.state = state;
  }

  if (key) location.key = key;

  // location = {
  //   hash: ""
  //   pathname: "/history/index.html"
  //   search: "?_ijt=2mt7412gnfvjpfeuv4hjkq2uf8"
  //   state: undefined
  // }
  return location;
}

// PathUtils.js
export function parsePath(path) {
  let pathname = path || "/";
  let search = "";
  let hash = "";

  const hashIndex = pathname.indexOf("#");
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  const searchIndex = pathname.indexOf("?");
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname,
    search: search === "?" ? "" : search,
    hash: hash === "#" ? "" : hash
  };
}
```
`createLocation`根据传递进来的`path`或者`location`值，返回格式化好的`location`，代码简单。

#### 3.3 createHref
`createHref`函数的作用是返回当前路径名，例如地址`http://localhost:63342/history/index.html?a=1`，调用`h.createHref(location)`后返回`/history/index.html?a=1`

```javascript
// createBrowserHistory.js
import {createPath} from "./PathUtils";

function createBrowserHistory(props = {}){
  // 处理basename（相对地址，例如：首页为index，假如设置了basename为/the/base，那么首页为/the/base/index）
  const basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : "";

  function createHref(location) {
    return basename + createPath(location);
  }
  
  const history = {
    // 当前地址（包含pathname）
    createHref,
    ...
  };

  return history;
}

// PathUtils.js
function createPath(location) {
  const { pathname, search, hash } = location;

  let path = pathname || "/";
  
  if (search && search !== "?") path += search.charAt(0) === "?" ? search : `?${search}`;

  if (hash && hash !== "#") path += hash.charAt(0) === "#" ? hash : `#${hash}`;

  return path;
}
```

#### 3.4 listen
在这里我们可以想象下大概的 **监听** 流程
1. 绑定我们设置的监听函数
2. 监听历史记录条目的改变，触发监听函数

---

在**第二章使用**代码中，创建了`History`对象后使用了`h.listen`函数。
```javascript
// index.html
h.listen(function (location) {
  console.log(location, 'lis-1')
})
h.listen(function (location) {
  console.log(location, 'lis-2')
})
```
下面看源码。

---

可见`listen`可以绑定多个监听函数，我们先看作者的`createTransitionManager.js`是如何实现绑定多个监听函数的

> `createTransitionManager`是过渡管理（例如：处理block函数中的弹框、处理listener的队列）。代码风格跟createBrowserHistory几乎一致，暴露全局函数，调用后返回对象即可使用。

```javascript
// createTransitionManager.js
function createTransitionManager() {
  let listeners = [];

  // 设置监听函数
  function appendListener(fn) {
    let isActive = true;

    function listener(...args) {
      // good
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
    appendListener,
    notifyListeners
  };
}
```
1. 设置监听函数`appendListener`：`fn`就是用户设置的监听函数，把所有的监听函数存储在`listeners`数组中
2. 执行监听函数`notifyListeners`：执行的时候仅仅需要循环依次执行即可。

**这里感觉有值得借鉴的地方：添加队列函数时，增加状态管理（如上面代码的`isActive`），决定是否启用**

有了上面的理解，下面看`listen`源码
```javascript
// createBrowserHistory.js
import createTransitionManager from "./createTransitionManager";
const transitionManager = createTransitionManager();

function createBrowserHistory(props = {}){
  function listen(listener) {
    // 添加 监听函数 到 队列
    const unlisten = transitionManager.appendListener(listener);

    // 添加 历史记录条目 的监听
    checkDOMListeners(1);

    // 解除监听
    return () => {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  const history = {
    // 监听
    listen
    ...
  };

  return history;
}


```
`history.listen`是当历史记录条目改变时，触发回调监听函数。所以这里有两步
1. `transitionManager.appendListener(listener)`把回调的监听函数添加到队列里
2. `checkDOMListeners`监听历史记录条目的改变

下面看看如何历史记录条目的改变`checkDOMListeners(1)`
```javascript
// createBrowserHistory.js
function createBrowserHistory(props = {}){
  let listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;
    
    // 是否已经添加
    if (listenerCount === 1 && delta === 1) {
      // 添加绑定，当历史记录条目改变的时候
      window.addEventListener('popstate', handlePopState);
    } else if (listenerCount === 0) {
      //  解除绑定
      window.removeEventListener('popstate', handlePopState);
    }
  }
  
  // getDOMLocation(event.state) = location = {
  //   hash: ""
  //   pathname: "/history/index.html"
  //   search: "?_ijt=2mt7412gnfvjpfeuv4hjkq2uf8"
  //   state: undefined
  // }
  function handlePopState(event) {
    handlePop(getDOMLocation(event.state));
  }
  
  // 是否刷新页面
  let forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      // 强制刷新页面
      forceNextPop = false;
      setState();
    } else {
      // 不需要刷新页面
      const action = "POP";

      setState({ action, location })
    }
  }
}
```
虽然作者写了很多很细的回调函数，可能会导致有些不好理解，但细细看还是有它道理的。
1. `checkDOMListeners`：全局只能有一个监听历史记录条目的函数
2. `handlePopState`：必须把监听函数提取出来，不然不能解绑
3. `handlePop`：监听历史记录条目的核心函数，监听成功后执行`setState`

`setState({ action, location })`作用是根据当前地址信息（`location`）更新history
```javascript
// createBrowserHistory.js
function createBrowserHistory(props = {}){
  function setState(nextState) {
    // 更新history
    Object.assign(history, nextState);
    history.length = globalHistory.length;

    // 执行监听函数listen
    transitionManager.notifyListeners(history.location, history.action);
  }

  const history = {
    // 监听
    listen
    ...
  };

  return history;
}
```
在这里，当更改历史记录条目成功后
1. 更新history
2. 执行监听函数listen

这就是`h.listen`的主要流程了，是不是还挺简单的

#### 3.5 block

`history.block`的功能是当历史记录条目改变时，触发提示信息。在这里我们可以想象下大概的 **截取** 流程
1. 绑定我们设置的截取函数
2. 监听历史记录条目的改变，触发截取函数

哈哈这里是不是感觉跟`listen`函数的套路差不多呢？其实`h.listen`和`h.block`的监听历史记录条目改变的代码是公用同一套（当然拉只能绑定一个监听历史记录条目改变的函数），3.1.3为了方便理解我修改了部分代码，下面是完整的源码

---

在**第二章使用**代码中，创建了`History`对象后使用了`h.block`函数（只能绑定一个`block`函数）。
```javascript
// index.html
h.block(function (location, action) {
  return 'Are you sure you want to go to ' + location.path + '?'
})
```

---

同样的我们先看看作者的`createTransitionManager.js`是如何实现提示的。

> `createTransitionManager`是过渡管理（例如：处理block函数中的弹框、处理listener的队列）。代码风格跟createBrowserHistory几乎一致，暴露全局函数，调用后返回对象即可使用。

```javascript
// createTransitionManager.js
function createTransitionManager() {
  let prompt = null;

  // 设置提示
  function setPrompt(nextPrompt) {
    prompt = nextPrompt;

    // 解除
    return () => {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  /**
   * 实现提示
   * @param location：地址
   * @param action：行为
   * @param getUserConfirmation 设置弹框
   * @param callback 回调函数：block函数的返回值作为参数
   */
  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    if (prompt != null) {
      const result = typeof prompt === "function" ? prompt(location, action) : prompt;

      if (typeof result === "string") {
        // 方便理解我把源码getUserConfirmation(result, callback)直接替换成callback(window.confirm(result))
        callback(window.confirm(result))
      } else {
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  return {
    setPrompt,
    confirmTransitionTo
    ...
  };
}
```

`setPrompt`和`confirmTransitionTo`的用意
1. 设置提示setPrompt：把用户设置的提示信息函数存储在prompt变量
2. 实现提示confirmTransitionTo：
    1. 得到提示信息：执行prompt变量
    2. 提示信息后的回调：执行callback把提示信息作为结果返回出去

---

下面看`h.block`源码
```javascript
// createBrowserHistory.js
import createTransitionManager from "./createTransitionManager";
const transitionManager = createTransitionManager();

function createBrowserHistory(props = {}){
  let isBlocked = false;

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

  const history = {
    // 截取
    block,
    ...
  };

  return history;
}
```
`history.block`的功能是当历史记录条目改变时，触发提示信息。所以这里有两步
1. `transitionManager.setPrompt(prompt)` 设置提示
2. `checkDOMListeners` 监听历史记录条目改变的改变

**这里感觉有值得借鉴的地方：调用`history.block`，它会返回一个解除监听方法，只要调用一下返回函数即可解除监听或者复原。（有趣）**

---

我们看看监听历史记录条目改变函数`checkDOMListeners(1)`（注意：`transitionManager.confirmTransitionTo`）。

```javascript
// createBrowserHistory.js
function createBrowserHistory(props = {}){
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

  let listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;
    
    // 是否已经添加
    if (listenerCount === 1 && delta === 1) {
      // 添加绑定，当地址栏改变的时候
      window.addEventListener('popstate', handlePopState);
    } else if (listenerCount === 0) {
      //  解除绑定
      window.removeEventListener('popstate', handlePopState);
    }
  }
  
  // getDOMLocation(event.state) = location = {
  //   hash: ""
  //   pathname: "/history/index.html"
  //   search: "?_ijt=2mt7412gnfvjpfeuv4hjkq2uf8"
  //   state: undefined
  // }
  function handlePopState(event) {
    handlePop(getDOMLocation(event.state));
  }
  
  // 是否刷新页面
  let forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      // 强制刷新页面
      forceNextPop = false;
      setState();
    } else {
      // 不需要刷新页面
      const action = "POP";

      // 实现提示
      transitionManager.confirmTransitionTo(
        location,
        action,
        getUserConfirmation,
        ok => {
          if (ok) {
            // 确定
            setState({ action, location });
          } else {
            // 取消
            revertPop(location);
          }
        }
      );
    }
  }

  const history = {
    // 截取
    block
    ...
  };

  return history;
}
```
就是在`handlePop`函数触发`transitionManager.confirmTransitionTo`的（3.1.3我对这里做了修改为了方便理解）。

---

`transitionManager.confirmTransitionTo`的回调函数callback有两条分支，用户点击提示框的确定按钮或者取消按钮
1. 当用户点击提示框的确定后，执行`setState({ action, location })`
2. 当用户点击提示框的取消后，执行`revertPop(location)`（这里就不展示了，主要作用是跳转回去之前的页面）。

到这里已经了解完`h.block`函数、`h.listen`和`createTransitionManager.js`。接下来我们继续看另一个重要的函数`h.push`

#### 3.6 push
```javascript
function createBrowserHistory(props = {}){
  function push(path, state) {
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

        // 添加历史条目
        globalHistory.pushState({ key, state }, null, href);
        
        if (forceRefresh) {
          // 强制刷新
          window.location.href = href;
        } else {
          // 更新history
          setState({ action, location });
        }
      }
    );
  }

  const history = {
    // 跳转
    push,
    ...
  };

  return history;
}
```
这里最重要的是`globalHistory.pushState`函数，它直接添加新的历史条目。


#### 3.7 replace
```javascript
function createBrowserHistory(props = {}){
  function replace(path, state) {
    const action = "REPLACE";
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

        globalHistory.replaceState({ key, state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          setState({ action, location });
        }
      }
    );
  }

  const history = {
    // 跳转
    replace,
    ...
  };

  return history;
}
```
其实`push`和`replace`的区别就是`history.pushState`和`history.replaceState`的区别

#### 3.8 go
```javascript
function createBrowserHistory(props = {}){
   function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  const history = {
    // 跳转
    go,
    goBack,
    goForward,
    ...
  };

  return history;
}
```
其实就是`history.go`的运用

## 4.demo

## 5.总结