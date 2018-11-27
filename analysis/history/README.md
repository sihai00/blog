# history源码解析
> `history`是一个JavaScript库，可让你在JavaScript运行的任何地方轻松管理会话历史记录

## 1.前言
`history`是由facebook维护的，`react-router`依赖于`history`，区别于浏览器的`window.history`，`history`是包含`window.history`的，让开发者可以在任何环境都能使用`history`的api（例如Node、React Native等）。

本篇读后感分为四部分，分别为前言、解析、demo、总结，四部分互不相连可根据需要分开看。

前言和总结为吹水，解析为源码的解析，demo是抽取源码的核心实现的小demo，学以致用。

**建议跟着源码结合本文阅读，这样更加容易理解！** 
1. [history](https://github.com/ReactTraining/history)
2. [history解析的Github地址](https://github.com/sihai00/blog/blob/master/analysis/history)

## 2.使用
`history`有三种不同的方法创建history对象，取决于你的代码环境
1. createBrowserHistory：支持`HTML5 history api`的现代浏览器（例如：/index）
2. createHashHistory：传统浏览器（例如：/#/index）
3. createMemoryHistory：没有Dom的环境

> 注意：本片文章只解析`createBrowserHistory`和`createHashHistory`两种，其实原理都是差不多的

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
** 贴出来的源码我会删减对理解原理不重要的部分！！!如果想看完整的请下载源码看哈 **

从history的源码库目录可以看到modules文件夹，包含了几个文件
1. createBrowserHistory.js 创建createBrowserHistory的history对象
2. createHashHistory.js 创建createHashHistory的history对象
3. createMemoryHistory.js 创建createMemoryHistory的history对象
4. createTransitionManager.js 过渡管理（例如：处理block函数中的弹框、处理listener的队列）
5. DOMUtils.js DOM工具类（例如弹框、判断浏览器兼容性）
6. index.js 入口文件
7. LocationUtils.js 处理Location工具
8. PathUtils.js 处理Path工具

入口文件index.js
```javascript
export { default as createBrowserHistory } from "./createBrowserHistory";
export { default as createHashHistory } from "./createHashHistory";
export { default as createMemoryHistory } from "./createMemoryHistory";
export { createLocation, locationsAreEqual } from "./LocationUtils";
export { parsePath, createPath } from "./PathUtils";
```
把所有需要暴露的方法根据文件名区分开，很好的区分开来。我们先看`createBrowserHistory`，其实只要了解的三种创建`history`中的一种，其他原理大概相同，我们先看`createBrowserHistory`

### 3.1 createBrowserHistory
```javascript
// createBrowserHistory.js
function createBrowserHistory(props = {}){
  // 浏览器的history
  const globalHistory = window.history;
  // 初始化location
  const initialLocation = getDOMLocation(getHistoryState());
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
无论是从代码还是从用法上我们也可以看出，执行了`createBrowserHistory`后函数会返回`history`对象，`history`对象提供了很多属性和方法，最大的疑问应该是`initialLocation`函数，即`history.location`。

#### 3.1.1 location
它区别于`window.location`，我们打印执行后的`createBrowserHistory`看看`history.location`

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
结论是history.location是window.location的儿砸！我们来研究研究作者是怎么处理的。`getDOMLocation`在`history`中会经常调用，理解好这个函数比较重要。

```javascript
// createBrowserHistory.js
function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
function createBrowserHistory(props = {}){
  // 处理basename（相对地址，例如：首页为index，假如设置了basename为/the/base，那么首页为/the/base/index）
  const basename = props.basename
    ? stripTrailingSlash(addLeadingSlash(props.basename))
    : "";

  // 处理state参数和window.location
  function getDOMLocation(historyState) {
    const { key, state } = historyState || {};
    const { pathname, search, hash } = window.location;

    let path = pathname + search + hash;

    // 保证path是不包含basename的
    if (basename) path = stripBasename(path, basename);

    // 创建history.location对象
    return createLocation(path, state, key);
  }
  
  const initialLocation = getDOMLocation(getHistoryState())

  const history = {
    // location对象（与地址有关）
    location: initialLocation,
    ...
  };

  return history;
}
```
一般大型的项目中都会把一个功能拆分成至少两个函数，一个专门处理参数的函数和一个接收处理参数实现功能的函数。`getDOMLocation`函数主要处理`state`和`window.location`参数，返回自定义的`history.location`对象，主要构造`history.location`对象是`createLocation`函数。接下来我们看在`LocationUtils.js`文件中的`createLocation`函数

```javascript
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

// LocationUtils.js
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

  return location;
}
```
`createLocation`根据传递进来的`path`或者`location`值，返回格式化好的`location`，就是上面打印的`history.location`。接下来看`createHref`函数

#### 3.1.2 createHref
`createHref`函数的作用是返回当前的地址
```javascript
// PathUtils.js
function createPath(location) {
  const { pathname, search, hash } = location;

  let path = pathname || "/";

  if (search && search !== "?")
    path += search.charAt(0) === "?" ? search : `?${search}`;

  if (hash && hash !== "#") path += hash.charAt(0) === "#" ? hash : `#${hash}`;

  return path;
}

// createBrowserHistory.js
function createBrowserHistory(props = {}){
  // 处理basename（相对地址，例如：首页为index，假如设置了basename为/the/base，那么首页为/the/base/index）
  const basename = props.basename
    ? stripTrailingSlash(addLeadingSlash(props.basename))
    : "";

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
```

当了解完`history`的属性和方法后，我们就开始按照第二章的使用方法去了解其内部方法的实现。

#### 3.1.3 listener
在第二章中的使用代码中，创建了`History`对象后使用了`h.listener`函数，该方法是用于监听路由的改变。

```javascript
// createTransitionManager.js
function createTransitionManager() {
  // 函数队列
  let listeners = [];

  // 设置监听函数
  function appendListener(fn) {
    // 是否启用
    let isActive = true;

    // 当不启用时，只要设置isActive为false即可，很方便
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

  return {
    appendListener,
    ...
  };
}

// createBrowserHistory.js
import createTransitionManager from "./createTransitionManager";
const transitionManager = createTransitionManager();

function createBrowserHistory(props = {}){
  function listen(listener) {
    // 添加监听函数到队列
    const unlisten = transitionManager.appendListener(listener);

    // 
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
`createTransitionManager`是过渡管理（例如：处理block函数中的弹框、处理listener的队列）。代码风格跟createBrowserHistory几乎一致，暴露全局函数，调用后返回对象即可使用。

调用`h.listener`传递监听回调函数，`h.listener`同时把监听回调函数传递进去`createTransitionManager.js`中的`appendListener`函数，`appendListener`函数把监听回调函数添加到当前的函数队列`listeners`中，说明`history`可以绑定多个监听回调函数。

这里感觉有值得借鉴的地方：
1. 添加队列函数时，依赖于一个状态，额外加多一层函数判断来决定是否启用
2. 调用监听函数`listen`，它会返回一个解除监听方法，只要调用一下返回函数即可解除监听或者复原（有趣）

## 4.总结