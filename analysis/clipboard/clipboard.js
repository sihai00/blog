// 复制的核心代码
import ClipboardAction from './clipboard-action';
// 订阅者模式
import Emitter from 'tiny-emitter';
// 对事件的封装
import listen from 'good-listener';

/**
 * 类Clipboard接受一个或多个元素，为他们添加点击事件
 */
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
        const trigger = e.delegateTarget || e.currentTarget;

        if (this.clipboardAction) {
            this.clipboardAction = null;
        }

        this.clipboardAction = new ClipboardAction({
            action    : this.action(trigger),
            target    : this.target(trigger),
            text      : this.text(trigger),
            container : this.container,
            trigger   : trigger,
            emitter   : this
        });
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
     * Returns the support of the given action, or all actions if no action is
     * given.
     * @param {String} [action]
     */
    static isSupported(action = ['copy', 'cut']) {
        const actions = (typeof action === 'string') ? [action] : action;
        let support = !!document.queryCommandSupported;

        actions.forEach((action) => {
            support = support && !!document.queryCommandSupported(action);
        });

        return support;
    }

    /**
     * 定义复制内容的回调函数
     * @param {Element} trigger
     */
    defaultText(trigger) {
        return getAttributeValue('text', trigger);
    }

    /**
     * Destroy lifecycle.
     */
    destroy() {
        this.listener.destroy();

        if (this.clipboardAction) {
            this.clipboardAction.destroy();
            this.clipboardAction = null;
        }
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

module.exports = Clipboard;
