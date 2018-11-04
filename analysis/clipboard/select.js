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

module.exports = select;
