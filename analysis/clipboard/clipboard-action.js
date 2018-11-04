import select from 'select';

/**
 * 内部类：使用text或者target属性执行复制或者剪切
 */
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
     * 创建一个假的textarea元素（fakeElem），设置它的值为text属性的值并且选择它
     */
    selectFake() {
        const isRTL = document.documentElement.getAttribute('dir') == 'rtl';

        // 移除已经存在的上一次的fakeElem
        this.removeFake();

        this.fakeHandlerCallback = () => this.removeFake();
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

    /**
     * 从fakeElem的focus转移到目标上，移除选择
     */
    clearSelection() {
        if (this.trigger) {
            this.trigger.focus();
        }

        window.getSelection().removeAllRanges();
    }

    /**
     * 设置行为action，可以是copy（复制）和cut（剪切）
     * @param {String} action
     */
    set action(action = 'copy') {
        this._action = action;

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

    /**
     * Destroy lifecycle.
     */
    destroy() {
        this.removeFake();
    }
}

module.exports = ClipboardAction;
