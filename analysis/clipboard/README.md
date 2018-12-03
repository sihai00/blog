# clipboard.js源码解析-复制到剪切板插件
> [clipboard.js](https://github.com/zenorocha/clipboard.js) 是一个小型的复制到剪切板插件，只有3kb，非flash

## 1.前言
公司项目有用到clipboard.js，由于好奇心顺手点开了源码看看其究竟是如何实现的，本以为是九曲十八弯错综复杂，其实还是挺容易看懂的，所以就分享下读后感哈哈。

本篇读后感分为五部分，分别为前言、使用、解析、demo、总结，五部分互不相连可根据需要分开看。

前言为介绍、使用为库的使用、解析为源码的解析、demo是抽取源码的核心实现的小demo，总结为吹水，学以致用。

**建议跟着源码结合本文阅读，这样更加容易理解！** 
1. [clipboard.js](https://github.com/zenorocha/clipboard.js)
2. [clipboard.js解析的Github地址](https://github.com/sihai00/blog/tree/master/analysis/clipboard)

## 2.使用
在阅读源码之前最好先了解其用法，有助于理解某些诡异的源码为何这样写。（下面是clipboard.js作者的demo）

```html
<button class="btn">Copy</button>
<div>hello</div>

<script>
var clipboard = new ClipboardJS('.btn', {
    target: function() {
        return document.querySelector('div');
    }
});

clipboard.on('success', function(e) {
    console.log(e);
});

clipboard.on('error', function(e) {
    console.log(e);
});
</script>
```
从作者给出的demo可以看到，点击btn后复制了div为hello的值，可以看成三步：
1. 卡卡西（demo的btn）
2. 复制（demo的ClipboardJS）
3. 忍术（demo的div）

即拆解核心：**trigger（卡卡西）** 对 **target（忍术）** 进行 **copy（复制）** 

### 2.1 trigger
把trigger传递给`ClipboardJS`函数，函数接受三种类型
1. dom元素
2. nodeList
3. 选择器
```html
<!-- 1.dom元素 -->
<div id="btn" data-clipboard-text="1"></div>

<script>
var btn = document.getElementById('btn');
var clipboard = new ClipboardJS(btn);
</script>

<!-- 2.nodeList -->
<button data-clipboard-text="1">Copy</button>
<button data-clipboard-text="2">Copy</button>
<button data-clipboard-text="3">Copy</button>

<script>
var btns = document.querySelectorAll('button');
var clipboard = new ClipboardJS(btns);
</script>

<!-- 3.选择器 -->
<button class="btn" data-clipboard-text="1">Copy</button>
<button class="btn" data-clipboard-text="2">Copy</button>
<button class="btn" data-clipboard-text="3">Copy</button>

<script>
var clipboard = new ClipboardJS('.btn');
</script>
```

### 2.2 target
target的目的是为了获取复制的值（text），所以target不一定是dom。获取text有两种方式
1. trigger属性赋值
2. target元素获取

```html
<!-- 1.trigger属性赋值  data-clipboard-text -->
<button class="btn" data-clipboard-text="1">Copy</button>
<button class="btn" data-clipboard-text="2">Copy</button>
<button class="btn" data-clipboard-text="3">Copy</button>

<script>
var clipboard = new ClipboardJS('.btn');
</script>

<!-- 2.target对象获取值 text -->
<button class="btn">Copy</button>
<div>hello</div>

<script>
var clipboard = new ClipboardJS('.btn', {
    target: function() {
        return document.querySelector('div');
    }
});
</script>

<!-- 2.target对象获取值 value -->
<input id="foo" type="text" value="hello">
<button class="btn" data-clipboard-action="copy" data-clipboard-target="#foo">Copy</button>

<script>
var clipboard = new ClipboardJS('.btn');
</script>
```

### 2.3 copy（默认copy / cut）
```html
<!-- 1.复制：默认copy -->
<button class="btn">Copy</button>
<div>hello</div>

<script>
var clipboard = new ClipboardJS('.btn', {
    target: function() {
        return document.querySelector('div');
    }
});
</script>

<!-- 2.剪切：cut -->
<textarea id="bar">hello</textarea>
<button class="btn" data-clipboard-action="cut" data-clipboard-target="#bar">Cut</button>

<script>
var clipboard = new ClipboardJS('.btn');
</script>
```

## 3.解析
源码主要包含两个核心文件clipboard.js和clipboard-action.js，但还需了解tiny-emitter.js。
1. tiny-emitter.js：事件发射器，相当于钩子，处理复制的回调函数
2. clipboard.js：处理复制所需的参数
3. clipboard-action.js：复制的核心逻辑

### 3.1 tiny-emitter.js
> [tiny-emitter](https://github.com/scottcorgan/tiny-emitter) 是一个小型（小于1k）事件发射器（相当于node的events.EventEmitter）

你肯定很奇怪为什么第一个解析的不是clipboard.js而是tiny-emitter.js，先看用法。
```html
<div id="btn" data-clipboard-text="1">
    <span>Copy</span>
</div>

<script>
var btn = document.getElementById('btn');
var clipboard = new ClipboardJS(btn);

// tiny-emitter.js的作用，处理当复制成功或者失败后的回调函数
clipboard.on('success', function(data) {
    console.log(data);
});

clipboard.on('error', function(data) {
    console.log(data);
});
</script>
```

既然定义了事件，源码在哪里触发事件触发器的呢？从他的标识（success | error）自然而然的想到，是复制这个操作之后才触发的。我们先来简单看看clipboard-action.js里的`emit`方法的代码，不影响后续的阅读
```javascript
class ClipboardAction{
  /**
   * 根据复制操作的结果触发对应发射器
   * @param {Boolean} succeeded 复制操作后的返回值，用于判断复制是否成功
   */
  handleResult(succeeded) {
      // 这里this.emitter.emit相当于E.emit
      this.emitter.emit(succeeded ? 'success' : 'error', {
          action: this.action,
          text: this.selectedText,
          trigger: this.trigger,
          clearSelection: this.clearSelection.bind(this)
      });
  }
}
```

clipboard.js中使用了tiny-emitter.js的`on`和`emit`方法。tiny-emitter.js声明一个对象（`this.e`），（success | error）定义标识，`on`方法用来添加该标识事件，emit方法用来标识发射事件。举例：你是一个古代的皇帝，在开朝之初就招了一批后宫佳丽（`on`方法），某天你想检查身体，就让公公向后宫传递一个信号（`emit`方法），就能雨露均沾了。

```javascript
function E () {}
/**
 * @param {String} name 触发事件的表识
 * @param {function} callback 触发的事件
 * @param {object} ctx 函数调用上下文
 */
E.prototype = {
  on: function (name, callback, ctx) {
    // this.e存储全局事件
    var e = this.e || (this.e = {});
    
    // this.e的结构
    // this.e = {
    //   success: [
    //     {fn: callback, ctx: ctx}
    //   ],
    //   error: [...]
    // }
    
    (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx: ctx
    });

    return this;
  },
  emit: function (name) {
        // 获取标识后的参数，就是上面this.emitter.emit函数第二个参数对象{action, text, trigger, clearSelection}
        // 最终从回调函数中获取data。E.on(success, (data) => data) 
        var data = [].slice.call(arguments, 1);
        
        // 获取标识对应的函数
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
    
        for (i; i < len; i++) {
          // 循环触发函数数组的函数，把data传递出去作为on的回调函数的结果
          evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
    
        return this;
    }
};
```
简单理解就是tiny-emitter.js内部维护了一个对象（`this.e`），`this.e`对象用记录一系列的属性（例如：success、error），属性是数组，当调用`on`方法往对应属性的数组添加触发函数，调用`emit`方法就触发对应属性的所有函数
### 3.2 clipboard.js
clipboard.js主要由clipboard.js和clipboard-action.js组成。clipboard.js主要负责对接收传递进来的参数，并组装成clipboard-action.js所需要的数据结构。clipboard-action.js就是复制的核心库，负责复制的实现，我们先来看看clipboard.js

```javascript
import Emitter from 'tiny-emitter';
class Clipboard extends Emitter {
    /**
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     * @param {Object} options
     */
    constructor(trigger, options) {
        super();
        // 定义属性
        this.resolveOptions(options);

        // 定义事件
        this.listenClick(trigger);
    }
}
```
从上面源码可以看到，`Clipboard`继承自`Emitter`，`Emitter`就是tiny-emitter.js的方法。而`Clipboard`初始化时有两个步骤
1. 格式化传递进来的参数
2. 为目标元素添加点击事件，并进行复制操作

---

我们先看`resolveOptions`函数（注意区分trigger元素和target对象，trigger元素是用来绑定click事件的元素，target对象是复制的对象。也就是上面拆解核心：**trigger（卡卡西）** 对 **target（忍术）** 进行 **copy（复制）** ）
```javascript
import Emitter from 'tiny-emitter';
    class Clipboard extends Emitter {
    /**
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     * @param {Object} options
     */
    constructor(trigger, options) {
        super();
        // 定义属性
        this.resolveOptions(options);

        // 定义事件
        this.listenClick(trigger);
    }

    /**
     * 定义函数的属性，如果外部有传函数，使用外部的函数，否则使用内部的默认函数
     * @param {Object} options
     */
    resolveOptions(options = {}) {
        // 事件行为
        this.action    = (typeof options.action    === 'function') ? options.action    : this.defaultAction;
        // 复制的目标
        this.target    = (typeof options.target    === 'function') ? options.target    : this.defaultTarget;
        // 复制的内容
        this.text      = (typeof options.text      === 'function') ? options.text      : this.defaultText;
        // 包含元素
        this.container = (typeof options.container === 'object')   ? options.container : document.body;
    }

    /**
     * 定义行为的回调函数
     * @param {Element} trigger
     */
    defaultAction(trigger) {
        return getAttributeValue('action', trigger);
    }

    /**
     * 定义复制目标的回调函数
     * @param {Element} trigger
     */
    defaultTarget(trigger) {
        const selector = getAttributeValue('target', trigger);

        if (selector) {
            return document.querySelector(selector);
        }
    }

    /**
     * 定义复制内容的回调函数
     * @param {Element} trigger
     */
    defaultText(trigger) {
        return getAttributeValue('text', trigger);
    }
}

/**
 * 工具函数：获取复制目标属性的值
 * @param {String} suffix
 * @param {Element} element
 */
function getAttributeValue(suffix, element) {
    const attribute = `data-clipboard-${suffix}`;

    if (!element.hasAttribute(attribute)) {
        return;
    }

    return element.getAttribute(attribute);
}
```
极为清晰，从`resolveOptions`可以看到格式化了4个所需的参数。
1. `action`事件的行为（复制copy、剪切cut）
2. `target`复制的目标
3. `text`复制的内容
4. `container`包含元素（对于使用者不需要太关心这个，为实现复制功能暂时性的添加`textarea`作为辅助）

格式化的套路是一致的，判断是否传递了相应的参数，传递了就使用，没有的话就从trigger元素中通过属性获取（data-clipboard-xxx）

---

当格式化所需参数后，接下来看listenClick，对trigger元素绑定点击事件，实现复制功能
```javascript
import Emitter from 'tiny-emitter';
import listen from 'good-listener';

class Clipboard extends Emitter {
    /**
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     * @param {Object} options
     */
    constructor(trigger, options) {
        super();
        // 定义属性
        this.resolveOptions(options);

        // 定义事件
        this.listenClick(trigger);
    }
    
    /**
     * 为目标添加点击事件
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     */
    listenClick(trigger) {
        // 作者对绑定事件的封装，可以理解为
        // trigger.addEventListener('click', (e) => this.onClick(e))
        this.listener = listen(trigger, 'click', (e) => this.onClick(e));
    }

    /**
     * 给目标添加clipboardAction属性
     * @param {Event} e
     */
    onClick(e) {
        // trigger元素
        const trigger = e.delegateTarget || e.currentTarget;

        if (this.clipboardAction) {
            this.clipboardAction = null;
        }
        // 执行复制操作，把格式化的参数传递进去
        this.clipboardAction = new ClipboardAction({
            action    : this.action(trigger),
            target    : this.target(trigger),
            text      : this.text(trigger),
            container : this.container,
            trigger   : trigger,
            emitter   : this
        });
    }
}
```
当格式化所需参数后，就可以调用clipboard-action.js，并把对应的参数传递下去，实现复制功能。猜想作者分两个文件来实现是为了以功能来区分模块，清晰明了不至于代码揉杂在一起过于杂乱无章

### 3.3 clipboard-action.js
```javascript
class ClipboardAction {
    /**
     * @param {Object} options
     */
    constructor(options) {
        // 定义属性
        this.resolveOptions(options);

        // 定义事件
        this.initSelection();
    }
    /**
     * 设置行为action，可以是copy（复制）和cut（剪切）
     * @param {String} action
     */
    set action(action = 'copy') {
        this._action = action;
        // action的值设置为除copy和cut之外都报错
        if (this._action !== 'copy' && this._action !== 'cut') {
            throw new Error('Invalid "action" value, use either "copy" or "cut"');
        }
    }

    /**
     * 获取行为action
     * @return {String}
     */
    get action() {
        return this._action;
    }

    /**
     * 使用将复制其内容的元素设置`target`属性。
     * @param {Element} target
     */
    set target(target) {
        if (target !== undefined) {
            if (target && typeof target === 'object' && target.nodeType === 1) {
                if (this.action === 'copy' && target.hasAttribute('disabled')) {
                    throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                }

                if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                    throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                }

                this._target = target;
            }
            else {
                throw new Error('Invalid "target" value, use a valid Element');
            }
        }
    }

    /**
     * 获取target（目标）
     * @return {String|HTMLElement}
     */
    get target() {
        return this._target;
    }
}
```
我们先看`constructor`构造函数，作者的老套路，分两部执行。先定义属性值，然后执行。除了构造函数外，还需要注意一下`class`的`get`和`set`函数，因为它重新定义了某些变量或函数的执行方式。
但从上面看到，作者重新定义了`action`和`target`，把`this._action`和`this._target`作为了载体，限制了取值范围而已，小case。

---

我们清楚了clipboard-action.js的初识设置后，就可以开始看构造函数里的resolveOptions函数。
```javascript
class ClipboardAction {
    /**
     * @param {Object} options
     */
    constructor(options) {
        // 定义属性
        this.resolveOptions(options);

        // 定义事件
        this.initSelection();
    }

    /**
     * 定义基础属性（从类Clipboard传递进来的）
     * @param {Object} options
     */
    resolveOptions(options = {}) {
        // 行为copy / cut
        this.action    = options.action;
        // 包含元素
        this.container = options.container;
        // 钩子函数
        this.emitter   = options.emitter;
        // 复制目标
        this.target    = options.target;
        // 复制内容
        this.text      = options.text;
        // 绑定元素
        this.trigger   = options.trigger;
        
        // 选中的复制内容
        this.selectedText = '';
    }
}
```
把传递进来的值记录在`this`上方便存取，但这里为什么会多一个`this.selectedText`呢？

这里要区分开`text`和`selectedText`。从文章开始使用上看库的用法，`this.text`是用户传递进来需要复制的值，而当传递`this.target`而没有传递`this.text`时，这时候用户希望复制的值是这个目标元素的值。所以了解用法后这里的`this.selectedText`是最终需要复制的值，即`this.text`的值或者`this.target`的值

--- 

定义完属性后就开始最为核心高潮的代码了！initSelection函数
```javascript
class ClipboardAction {
    /**
     * @param {Object} options
     */
    constructor(options) {
        // 定义属性
        this.resolveOptions(options);

        // 定义事件
        this.initSelection();
    }
     /**
     * 使用哪一种策觉取决于提供的text和target
     */
    initSelection() {
        if (this.text) {
            this.selectFake();
        }
        else if (this.target) {
            this.selectTarget();
        }
    }
    /**
     * 从传递的target属性去选择元素
     */
    selectTarget() {
        // 选中
        this.selectedText = select(this.target);
        // 复制
        this.copyText();
    }
}
```
`initSelection`函数的作用是什么呢，翻译意思是初始化选择，从命名其实可以透露出信息（卖个关子嘿嘿）。这里有两条路可以走，`this.text`和`this.target`。我们选择先走`this.target`的路`selectTarget`（方便理解）。

回顾下我们平时在浏览器中复制的操作是怎样的：
1. 用鼠标点击页面
2. 按住鼠标并且滑动，选中需要复制的值
3. `ctrl + c` 或者 右键复制

`selectTarget`函数就是实现这三个步骤。我们可以看到选中的操作交给了`select`函数，下面看`select`函数。

```javascript
function select(element) {
    var selectedText;
    // target为select时
    if (element.nodeName === 'SELECT') {
        // 选中
        element.focus();
        // 记录值
        selectedText = element.value;
    }
    // target为input或者textarea时
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');
        // 如果属性为只读，不能选中
        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }
        // 选中target
        element.select();
        // 设置选中target的范围
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }
        // 记录值
        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }
        // 创建getSelection，用来选中除input、testarea、select元素
        var selection = window.getSelection();
        // 创建createRange，用来设置getSelection的选中范围
        var range = document.createRange();

        // 选中范围设置为target元素
        range.selectNodeContents(element);

        // 清空getSelection已选中的范围
        selection.removeAllRanges();

        // 把target元素设置为getSelection的选中范围
        selection.addRange(range);

        // 记录值
        selectedText = selection.toString();
    }

    return selectedText;
}
```
作者这里分三种情况，其实原理为两步 （想深入的话自行了解浏览器提供下面几个方法）
1. 选中元素（`element.select()`和`window.getSelection()`）
2. 设置选中的范围（`element.setSelectionRange(start, end)`和`range.selectNodeContents(element)`）

--- 

在我们选中了需要复制的元素后，就可以进行复制操作啦 -- `copyText`函数
```javascript
class ClipboardAction {
    /**
     * @param {Object} options
     */
    constructor(options) {
        // 定义属性
        this.resolveOptions(options);

        // 定义事件
        this.initSelection();
    }

    /**
     * 定义基础属性（从类Clipboard传递进来的）
     * @param {Object} options
     */
    resolveOptions(options = {}) {
      // 行为copy / cut
      this.action    = options.action;
      // 包含元素
      this.container = options.container;
      // 钩子函数
      this.emitter   = options.emitter;
      // 复制目标
      this.target    = options.target;
      // 复制内容
      this.text      = options.text;
      // 绑定元素
      this.trigger   = options.trigger;

      // 复制内容
      this.selectedText = '';
    }

    /**
     * 使用哪一种策觉取决于提供的text和target
     */
    initSelection() {
        if (this.text) {
            this.selectFake();
        }
        else if (this.target) {
            this.selectTarget();
        }
    }

    /**
     * 从传递的target属性去选择元素
     */
    selectTarget() {
        // 选中
        this.selectedText = select(this.target);
        // 复制
        this.copyText();
    }

    /**
     * 对目标执行复制操作
     */
    copyText() {
        let succeeded;

        try {
            succeeded = document.execCommand(this.action);
        }
        catch (err) {
            succeeded = false;
        }

        this.handleResult(succeeded);
    }

    /**
     * 根据复制操作的结果触发对应发射器
     * @param {Boolean} succeeded
     */
    handleResult(succeeded) {
        this.emitter.emit(succeeded ? 'success' : 'error', {
            action: this.action,
            text: this.selectedText,
            trigger: this.trigger,
            clearSelection: this.clearSelection.bind(this)
        });
    }
}
```
整个库最为核心的方法就是`document.execCommand`了，查看MDN文档
> 当一个`HTML`文档切换到设计模式 （designMode）时，`document`暴露 `execCommand` 方法，该方法允许运行命令来操纵可编辑区域的内容，大多数命令影响`document`的 `selection`（粗体，斜体等）

1. 命令（copy / cut）
2. 可编辑区域的内容（我们选中的内容，例如input、textarea）
3. 命令影响`document`的`selection`（当`this.target`不是`input`、`textarea`时实现我们选中的内容）

最后，`handleResult`函数就是复制成功或者失败后的钩子函数，也即`Clipboard`所继承`Emitter`，当实例化`ClipboardAction`时就把`Emitter`作为`this.emitter`传递进来，这是复制的整个过程了，哈哈是不是感觉挺好读的。

---

原理是一样的，只要理解了`this.target`这条分路，我们回去`initSelection`函数，看看`this.text`这条路作者是怎么实现的
```javascript
class ClipboardAction {
    /**
     * @param {Object} options
     */
    constructor(options) {
        // 定义属性
        this.resolveOptions(options);

        // 定义事件
        this.initSelection();
    }

    /**
     * 定义基础属性（从类Clipboard传递进来的）
     * @param {Object} options
     */
    resolveOptions(options = {}) {
      // 行为copy / cut
      this.action    = options.action;
      // 父元素
      this.container = options.container;
      // 钩子函数
      this.emitter   = options.emitter;
      // 复制目标
      this.target    = options.target;
      // 复制内容
      this.text      = options.text;
      // 绑定元素
      this.trigger   = options.trigger;

      // 复制内容
      this.selectedText = '';
    }

    /**
     * 使用哪一种策觉取决于提供的text和target
     */
    initSelection() {
        if (this.text) {
            this.selectFake();
        }
        else if (this.target) {
            this.selectTarget();
        }
    }

    /**
     * 创建一个假的textarea元素（fakeElem），设置它的值为text属性的值并且选择它
     */
    selectFake() {
        const isRTL = document.documentElement.getAttribute('dir') == 'rtl';

        // 移除已经存在的上一次的fakeElem
        this.removeFake();

        this.fakeHandlerCallback = () => this.removeFake();
        // 利用事件冒泡，当创建假元素并实现复制功能后，点击事件冒泡到其父元素，删除该假元素
        this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

        this.fakeElem = document.createElement('textarea');
        // Prevent zooming on iOS
        this.fakeElem.style.fontSize = '12pt';
        // Reset box model
        this.fakeElem.style.border = '0';
        this.fakeElem.style.padding = '0';
        this.fakeElem.style.margin = '0';
        // Move element out of screen horizontally
        this.fakeElem.style.position = 'absolute';
        this.fakeElem.style[ isRTL ? 'right' : 'left' ] = '-9999px';
        // Move element to the same position vertically
        let yPosition = window.pageYOffset || document.documentElement.scrollTop;
        this.fakeElem.style.top = `${yPosition}px`;

        this.fakeElem.setAttribute('readonly', '');
        this.fakeElem.value = this.text;

        // 添加到容器中
        this.container.appendChild(this.fakeElem);

        // 选中fakeElem
        this.selectedText = select(this.fakeElem);
        // 复制
        this.copyText();
    }

    /**
     * 在用户点击其他后再移除fakeElem。用户依然可以使用Ctrl+C去复制，因为fakeElem依然存在
     */
    removeFake() {
        if (this.fakeHandler) {
            this.container.removeEventListener('click', this.fakeHandlerCallback);
            this.fakeHandler = null;
            this.fakeHandlerCallback = null;
        }

        if (this.fakeElem) {
            this.container.removeChild(this.fakeElem);
            this.fakeElem = null;
        }
    }

    /**
     * 对目标执行复制操作
     */
    copyText() {
        let succeeded;

        try {
            succeeded = document.execCommand(this.action);
        }
        catch (err) {
            succeeded = false;
        }

        this.handleResult(succeeded);
    }

    /**
     * 根据复制操作的结果触发对应发射器
     * @param {Boolean} succeeded
     */
    handleResult(succeeded) {
        this.emitter.emit(succeeded ? 'success' : 'error', {
            action: this.action,
            text: this.selectedText,
            trigger: this.trigger,
            clearSelection: this.clearSelection.bind(this)
        });
    }
}
```
回顾下复制的流程，当只给了文本而没有元素时如何实现？我们可以自己模拟！作者构造了`textarea`元素，然后选中它即可，套路跟`this.target`一样。

值得注意的是，作者巧妙的运用了事件冒泡机制。在`selectFake`函数中作者把移除`textarea`元素的事件绑定在`this.container`上。当我们点击`trigger`元素复制后，创建一个辅助的`textarea`元素实现复制，复制完之后点击事件冒泡到父级，父级绑定了移除`textarea`元素的事件，就顺势移除了。
## 4.demo
源码看了不练，跟白看有什么区别。接下来提炼最为核心原理写个demo，贼简单（MDN的例子）
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<p>点击复制后在右边textarea CTRL+V看一下</p>
<input type="text" id="inputText" value="测试文本"/>
<input type="button" id="btn" value="复制"/>
<textarea rows="4"></textarea>
<script type="text/javascript">
  var btn = document.getElementById('btn');
  btn.addEventListener('click', function(){
    var inputText = document.getElementById('inputText');
    
    inputText.setSelectionRange(0, inputText.value.length);
    document.execCommand('copy', true);
  });
</script>
</body>
</html>
```

## 5.总结
这是第一篇文章，写文章真的挺耗时间的比起自己看，但好处是反复斟酌源码，细看到一些粗略看看不到的东西。有不足的地方多多提意见，会接受但不一定会改哈哈。还有哪些小而美的库推荐推荐，相互交流，相互学习，相互交易。

![py](https://user-gold-cdn.xitu.io/2018/11/12/16708732db725395?w=600&h=798&f=jpeg&s=111709)