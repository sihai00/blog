# sal源码解析-轻量级的滚动动画库
> `sal`是以性能为中心，轻量级的滚动动画库

## 1.前言
`sal`（滚动扩展库）为滚动动画提供高性能和轻量级的解决方案。`sal`采用[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)，在视口中，它在检查元素方面提供了很好的性能。强烈建议优先阅读软大神的[IntersectionObserver API 使用教程](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)文章，了解基本`IntersectionObserver`的使用

本篇读后感分为五部分，分别为前言、使用、解析、demo、总结，五部分互不相连可根据需要分开看。

1前言为介绍、2使用为库的使用、3解析为源码的解析、4demo是抽取源码的核心实现的小demo，5总结为吹水，学以致用。

**建议跟着源码结合本文阅读，这样更加容易理解！** 
1. [IntersectionObserver API 使用教程](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)
2. [sal](https://github.com/mciastek/sal)
3. [sal解析的Github地址](https://github.com/sihai00/blog/blob/master/analysis/sal)

## 2.使用
```html
<!DOCTYPE html>
<html lang="en">
<body>
  <div
    data-sal="slide-up"
    data-sal-delay="300"
    data-sal-easing="ease-out-bounce"
  ></div>
</body>
<script>
  sal({
    once: false
  });
</script>
</html>
```
当页面开始滚动时，为标签添加了data-sal属性的标签就会随着滚动展示动画效果。

data-sal有三种选项：
* data-sal-duration - 动画时长；
* data-sal-delay - 动画延迟时间；
* data-sal-easing - 动画速度曲线。

sal函数接收三个参数：
* threshold - 目标元素的可见比例
* once - 只执行一次动画
* disable - 禁用动画

## 3.解析
库的原理是通过`IntersectionObserver`的`api`，观察目标元素的可见比例，通过添加或者移除`class`来启动动画
```javascript
import './sal.scss';

/**
 * 默认选项
 */
let options = {
  rootMargin: '0% 50%',
  threshold: 0.5,
  animateClassName: 'sal-animate',
  disabledClassName: 'sal-disabled',
  selector: '[data-sal]',
  once: true,
  disabled: false,
};

/**
 * 私有
 */
let elements = [];
let intersectionObserver = null;

/**
 * 为元素添加class启动动画
 * @param  {Node} element
 */
const animate = element => (
  element.classList.add(options.animateClassName)
);

/**
 * 通过移除class来反转启动动画
 * @param  {Node} element
 */
const reverse = element => (
  element.classList.remove(options.animateClassName)
);

/**
 * 元素是否已经启动过动画
 * @param  {Node} element
 */
const isAnimated = element => (
  element.classList.contains(options.animateClassName)
);

/**
 * 为元素移除disabledClassName来启用动画
 */
const enableAnimations = () => {
  document.body.classList.remove(options.disabledClassName);
};

/**
 * 通过添加class来禁用动画
 */
const disableAnimations = () => {
  document.body.classList.add(options.disabledClassName);
};

/**
 * 是否禁用动画
 * @return {Boolean}
 */
const isDisabled = () => (
  options.disabled ||
  (
    (typeof options.disabled === 'function') &&
    options.disabled()
  )
);

/**
 * IntersectionObserver的回调函数
 * @param  {Array<IntersectionObserverEntry>} entries
 * @param  {IntersectionObserver} observer
 */
const onIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio >= options.threshold) {
      // 元素的可见比例大于配置的可见比例，启动动画
      animate(entry.target);

      if (options.once) {
        observer.unobserve(entry.target);
      }
    } else if (!options.once) {
      // 否则，启动反转动画
      reverse(entry.target);
    }
  });
};

/**
 * 禁用sal
 */
const disable = () => {
  disableAnimations();

  intersectionObserver.disconnect();
  intersectionObserver = null;
};

/**
 * 启动
 */
const enable = () => {
  enableAnimations();

  /**
   * 设置对观察元素变化后的行为函数
   * intersectionObserver：观察者
   * onIntersection：观察到变化的行为函数
   */
  intersectionObserver = new IntersectionObserver(onIntersection, {
    rootMargin: options.rootMargin,
    threshold: options.threshold,
  });

  // 获取观察元素
  elements = [].filter.call(
    document.querySelectorAll(options.selector),
    element => !isAnimated(element, options.animateClassName),
  );

  // 为观察元素设置观察者，当变化后触发行为函数
  elements.forEach(element => intersectionObserver.observe(element));
};

/**
 * Init
 * @param  {Object} settings
 * @return {Object} public API
 */
const init = (settings = options) => {
  // 初始化配置
  if (settings !== options) {
    options = {
      ...options,
      ...settings,
    };
  }

  // 判断浏览器是否存在IntersectionObserver
  if (!window.IntersectionObserver) {
    disableAnimations();

    throw Error(`
      Your browser does not support IntersectionObserver!
      Get a polyfill from here:
      https://github.com/w3c/IntersectionObserver/tree/master/polyfill
    `);
  }

  // 开始和结束动画
  if (!isDisabled()) {
    enable();
  } else {
    disableAnimations();
  }

  return {
    elements,
    disable,
    enable,
  };
};

export default init;
```

## 4.demo
通过实现阮大神的两个例子来上手`IntersectionObserver`，也是`sal`的原理
### 4.1 惰性加载（lazy load）
当滚动到一定位置的时候，再加载对应的图片
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>lazyLoad</title>
  <style>
    html, body{
      height: 100%;
      padding: 0;
      margin: 0;
    }
    .block{
      width: 100%;
      height: 700px;
    }
    .red{
      background-color: red;
    }
    .green{
      background-color: green;
    }
    .yellow{
      background-color: yellow;
    }
    img{
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="block red"></div>
  <div class="block green"></div>
  <div class="block yellow"></div>
</body>
<script>
var threshold = 0.3

var onIntersection = (changes, observer) => {
  changes.forEach(function(change) {
    var container = change.target
    
    if (change.intersectionRatio > threshold) {
      var img = new Image()
      img.src = './fafa.jpeg'
      container.append(img)
      observer.unobserve(container)
    }
  })
}

var observer = new IntersectionObserver(onIntersection, {threshold})

document.querySelectorAll('.block').forEach(element => observer.observe(element))
</script>
</html>
```
### 4.2 无限滚动（infinite scroll）
观察列表底部元素加载更多，每当达到设定的可见比例时，就加载数据到列表中
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>lazyLoad</title>
  <style>
    html, body{
      height: 100%;
      padding: 0;
      margin: 0;
    }
    h1{
      border-bottom: 1px solid #000;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="list"></div>
    <div class="bottom">加载更多</div>
  </div>
</body>
<script>
var num = 0
var skip = 10
var threshold = 0.9

function load(){
  var list = document.querySelector('.list')
  var fragment = document.createDocumentFragment();
  
  Array(skip).fill().forEach((v, i) => {
    var dom = document.createElement('h1')
    num += 1
    dom.innerText = num
    fragment.append(dom)
  })

  list.append(fragment) 
}

var onIntersection = (changes, observer) => {
  changes.forEach(function(change) {
    if (change.intersectionRatio > threshold) load()
  })
}

var observer = new IntersectionObserver(onIntersection, {threshold})

observer.observe(document.querySelector('.bottom'))
</script>
</html>
```

## 5.总结
`sal`这个库其实主要是对`IntersectionObserver`的应用，代码简单仅仅只有一百多行，但由于`IntersectionObserver`还只是个实验阶段的api（虽然`chrome`支持了），在实际项目中运用的机会不是太大，但是对它抱有期待。就如无限滚动的例子，如果不使用`IntersectionObserver`的话，就得监听浏览器滚动事件，获取列表高度、窗口高度和滚动高度来计算是否滚动到底部，必要情况下还需要加上防抖动来优化用户体验，所以`IntersectionObserver`还是省去很多步骤的，看好！

转眼就到了2019年了，要坚持分享输出！