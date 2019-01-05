# sal源码解析-轻量级的滚动动画库
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
-. data-sal-duration - 动画时长；
-. data-sal-delay - 动画延迟时间；
-. data-sal-easing - 动画速度曲线。

sal函数接收三个参数：
-. threshold - 目标元素的可见比例
-. once - 只执行一次动画
-. disable - 禁用动画
## 3.解析
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
 * Private
 */
let elements = [];
let intersectionObserver = null;

/**
 * Launch animation by adding class
 * @param  {Node} element
 */
const animate = element => (
  element.classList.add(options.animateClassName)
);

/**
 * Reverse animation by removing class
 * @param  {Node} element
 */
const reverse = element => (
  element.classList.remove(options.animateClassName)
);

/**
 * Check if element was animated
 * @param  {Node} element
 */
const isAnimated = element => (
  element.classList.contains(options.animateClassName)
);

/**
 * Enable animations by remove class from body
 */
const enableAnimations = () => {
  document.body.classList.remove(options.disabledClassName);
};

/**
 * Disable animations by add class from body
 */
const disableAnimations = () => {
  document.body.classList.add(options.disabledClassName);
};

/**
 * Check if should be disabled
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
 * IntersectionObserver callback
 * @param  {Array<IntersectionObserverEntry>} entries
 * @param  {IntersectionObserver} observer
 */
const onIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio >= options.threshold) {
      animate(entry.target);

      if (options.once) {
        observer.unobserve(entry.target);
      }
    } else if (!options.once) {
      reverse(entry.target);
    }
  });
};

/**
 * Disable sal
 */
const disable = () => {
  disableAnimations();

  intersectionObserver.disconnect();
  intersectionObserver = null;
};

/**
 * Enable sal by launching new IntersectionObserver
 */
const enable = () => {
  enableAnimations();

  intersectionObserver = new IntersectionObserver(onIntersection, {
    rootMargin: options.rootMargin,
    threshold: options.threshold,
  });

  elements = [].filter.call(
    document.querySelectorAll(options.selector),
    element => !isAnimated(element, options.animateClassName),
  );

  elements.forEach(element => intersectionObserver.observe(element));
};

/**
 * Init
 * @param  {Object} settings
 * @return {Object} public API
 */
const init = (settings = options) => {
  if (settings !== options) {
    options = {
      ...options,
      ...settings,
    };
  }

  if (!window.IntersectionObserver) {
    disableAnimations();

    throw Error(`
      Your browser does not support IntersectionObserver!
      Get a polyfill from here:
      https://github.com/w3c/IntersectionObserver/tree/master/polyfill
    `);
  }

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

## 5.总结