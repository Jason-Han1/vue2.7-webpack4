import { checkLinkeIp } from '@/utils/validate';
function debounce1(fn, delay = 500) {
  let timer;
  return function () {
    // eslint-disable-next-line consistent-this
    const th = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}
export const imageLazy = {
  bind(el, binding, vnode) {
    // const placehold = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    console.log(binding);
    if (binding.value && binding.value.nolazy) {
      const { nolazy } = binding.value
      if (nolazy) return (el.src = el.dataset.src || placehold)
    }
    // el.src = placehold
    const obServer = new IntersectionObserver(entries => {
      // 如果 intersectionRatio 为 0，则目标在视野外，
      // 不需要做任何事情。
      if (entries.find(v => v.intersectionRatio)) {
        el.src = el.dataset.src || placehold
        obServer.unobserve(el)
      }
    })
    obServer.observe(el)
  },
  update(el, binding, vnode) {},
  unbind(el) {},
  inserted(el, binding) {},
  componentUpdated(el, binding) {}
};

export const trim = {
  bind(el, binding, vnode, oldVnode) {
    const inputEl = el.children[0];
    inputEl.addEventListener('blur', (ev) => {
      ev.target.value = ev.target.value.trim();
    });
  },
  update(el, binding, vnode) { },
  unbind(el) {
    const inputEl = el.children[0];
    inputEl.removeEventListener('blur');
  },
  inserted(el, binding) { },
  componentUpdated(el, binding) { }
};
export const submit = {
  bind(el, binding, vnode) {
    // vnode.context[binding.value]();
    el.addEventListener('click', () => {
      console.log(vnode.context);
      console.log(binding);
      console.log(vnode.context.$el.getElementsByClassName);
      binding.value();
    });
  }
};
export const validateIP = {
  bind(el, binding, vnode, oldVnode) {
    // console.log(binding);
    // console.log(vnode);
    let errorText = '';
    const itemContent = el.children[1];
    const inputEl = el.children[1].children[0].children[0];
    let errorDiv = document.createElement('div');
    errorDiv.className = 'el-form-item__error';
    itemContent.appendChild(errorDiv);
    inputEl.addEventListener('blur', (ev) => {
      let data = String(ev.target.value);
      errorText = '';
      if (!data) {
        if (binding.value && binding.value.emptyMsg) {
          errorText = binding.value.emptyMsg;
        } else {
          errorText = '请输入IP地址';
        }
      } else if (!checkLinkeIp(data)) {
        if (binding.value && binding.value.errorMsg) {
          errorText = binding.value.errorMsg;
        } else {
          errorText = '地址格式不正确';
        }
      } else {
        errorText = '';
        inputEl.style.border = '1px solid #ced9ee';
        errorDiv.innerText = '';
        // itemContent.removeChild(errorDiv);
      }
      if (errorText) {
        inputEl.style.border = '1px solid #f56c6c';
        errorDiv.innerText = errorText;
      } else {
        errorDiv.innerText = '';
      }
    });
  },
  update(el, binding, vnode) {},
  unbind(el) {
    const itemContent = el.children[1];
    itemContent.removeChild(errorDiv);
  },
  inserted(el, binding) {},
  componentUpdated(el, binding) {}
};
/**
 * 使用
 * <el-button v-throttle:500="handlerClick">节流按钮throttle</el-button>
 */
export const throttle = {
  inserted(el, binding) {
    if (typeof binding.value !== 'function') {
      throw new Error('指令的参数必须是函数');
    }
    let flg = false;
    let time = 500;
    if (binding.arg) {
      time = parseInt(binding.arg);
    }
    el.handle = () => {
      if (flg) return;
      flg = true;
      binding.value();
      timerName = setTimeout(() => {
        flg = false;
      }, time);
    };
    el.addEventListener('click', el.handle);
  },
  unbind(el, binding) {
    el.removeEventListener('click', el.handle);
  }
};
/**
 * 使用：
 * <el-input v-debounce="handlerInput" v-model="inputValue"></el-input>
 */
const findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type);
};

export const debounce = {
  inserted: function (el, binding) {
    if (typeof binding.value !== 'function') {
      throw new Error('指令的参数必须是函数');
    }
    let timer;
    const $inp = findEle(el, 'input');
    el.$inp = $inp;
    el.handle = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, 1000);
    };
    el.addEventListener('input', el.handle);
  },
  unbind: function (el) {
    el.$inp.removeEventListener('input', el.$inp.handle);
  }
};

/**
 * 使用：
 * <div v-waterMarker="{text:'hlt版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
 */
function addWaterMarker(str, el, font, textColor) {
  // 水印文字，父元素，字体，文字颜色
  let can = document.createElement('canvas');
  el.appendChild(can);
  can.width = 200;
  can.height = 150;
  can.style.display = 'none';
  const cans = can.getContext('2d');
  cans.rotate((-20 * Math.PI) / 180);
  cans.font = font || '16px Microsoft JhengHei';
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)';
  cans.textAlign = 'left';
  cans.textBaseline = 'Middle';
  cans.fillText(str, can.width / 10, can.height / 2);
  el.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
}

export const waterMarker = {
  bind: function (el, binding) {
    addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor);
  }
};
/**
 * 使用
 * <div v-copy="copyText">
 *    <el-button v-copy="copyText">复制</el-button>
 *    {{copyText}}
 * </div>
 */
export const copy = {
  bind(el, binding, vnode, oldVnode) {
    const { value } = binding;
    el.$value = value;
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        console.log('无复制内容');
        return;
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea');
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly';
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value;
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea);
      // 选中值并复制
      textarea.select();
      const result = document.execCommand('Copy');
      if (result) {
        console.log('复制成功'); // 可根据项目UI仔细设计
      }
      document.body.removeChild(textarea);
    };
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler);
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler);
  }
};
/**
 * 使用
 * <el-button v-draggable>拖拽按钮</el-button>
 */
export const draggable = {
  bind(el, binding) {
    el.style.cursor = 'move';
  },
  inserted: function (el) {
    el.onmousedown = function (e) {
      // el.offsetTop/Left 元素到父元素上边/左边的距离
      let disx = e.pageX - el.offsetLeft;
      let disy = e.pageY - el.offsetTop;
      document.onmousemove = function (e) {
        let x = e.pageX - disx;
        let y = e.pageY - disy;
        let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width);
        let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height);
        if (x < 0) {
          x = 0;
        } else if (x > maxX) {
          x = maxX;
        }

        if (y < 0) {
          y = 0;
        } else if (y > maxY) {
          y = maxY;
        }

        el.style.left = x + 'px';
        el.style.top = y + 'px';
      };
      document.onmouseup = function () {
        // eslint-disable-next-line no-multi-assign
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
};

/**
 * 使用: str 标志当前元素展示权限
 * <el-button v-permission="str">按钮1</el-button>
 */
function checkArray(key) {
  let arr = [1, 2, 3, 4];
  return arr.indexOf(key) > -1;
}

export const permission = {
  inserted: function (el, binding) {
    let permission = binding.value; // 获取到 v-permission的值
    if (permission) {
      let hasPermission = checkArray(permission);
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
};
/**
 * 超出设置宽度显示文字提示指令
 * 用法：v-overflow-tooltip / v-overflow-tooltip:width
 * width 可选
 * 只要当dom元素内容超出设置的宽度时，超出文字省略号显示，鼠标画上去有全部文字提示
*/
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = Number(document.documentMode);
const camelCase = function (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};
const getStyle = ieVersion < 9 ? function (element, styleName) {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function (element, styleName) {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    let computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (const prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
}
export const overflowTooltip = {
  name: 'overflow-tooltip',
  bind(el, binding) {
    const width = binding.arg;
    if (width) {
      el.style.width = `${width}px`;
    }
    const style = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };
    setStyle(el, style);
  },
  inserted(el, binding) {
    addTooltip(el, binding);
  },
  unbind(el) {
    if (!el.tooltip) return;
    el.removeEventListener('mouseenter', el.elMouseEnterHandler);
    el.removeEventListener('mouseleave', el.elMouseOutHandler);
    el.tooltip.destroy();
  }
};

function addTooltip(el, binding) {
  el.oldOffsetWidth = el.offsetWidth;
  if (!el.textWidth) {
    // 计算文本宽度
    const range = document.createRange();
    range.setStart(el, 0);
    range.setEnd(el, el.childNodes.length);
    const rangeWidth = range.getBoundingClientRect().width;
    const padding = (parseInt(getStyle(el, 'paddingLeft'), 10) || 0) +
      (parseInt(getStyle(el, 'paddingRight'), 10) || 0);
    const textWidth = rangeWidth + padding;
    el.textWidth = textWidth;
  }

  // 监听元素宽度变化
  const resizeObserver = new ResizeObserver(entry => {
    const target = entry[0].target;
    el.oldOffsetWidth !== target.offsetWidth && addTooltip(el, binding);
  });
  resizeObserver.observe(el);

  // Math.max(el.offsetWidth, binding.arg) 处理offsetWidth不是设置宽度时的情况
  if (el.textWidth > Math.max(el.offsetWidth, binding.arg || 0)) {
    let tooltip = null;

    // eslint-disable-next-line no-multi-assign
    const elMouseEnterHandler = el.elMouseEnterHandler = debounce1((event) => {
      if (!tooltip) {
        const tooltipContent = el.innerText || el.textContent;
        tooltip = new Tooltip();
        tooltip.create(tooltipContent);
        el.tooltip = tooltip;
      }
      // 400为tootip最大宽度
      tooltip.show(event, Math.min(el.textWidth, 400));
    }, 300);
    // eslint-disable-next-line no-multi-assign
    const elMouseOutHandler = el.elMouseOutHandler = debounce1(() => {
      tooltip && tooltip.hide();
    }, 300);

    el.addEventListener('mouseenter', elMouseEnterHandler);
    el.addEventListener('mouseleave', elMouseOutHandler);
  } else {
    el.tooltip && el.tooltip.destroy();
    el.elMouseEnterHandler && el.removeEventListener('mouseenter', el.elMouseEnterHandler);
    el.elMouseOutHandler && el.removeEventListener('mouseleave', el.elMouseOutHandler);
  }
}

class Tooltip {
  constructor() {
    this.id = 'autoToolTip';
    this.styleId = 'autoToolTipStyle';
    this.tooltipContent = '';
    this.styleElementText = `
      #autoToolTip {
        display: none;
        position: absolute;
        border-radius: 4px;
        padding: 10px;
        z-index: 99999;
        font-size: 12px;
        line-height: 1.2;
        min-width: 10px;
        max-width: 400px;
        word-break: break-word;
        color: #fff;
        background: #303133;
        transform-origin: center top;
      }
      #autoToolTip #arrow::after {
        content: " ";
        border-width: 5px;
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        bottom: -10px;
        left: calc(50% - 5px);
        border-top-color: #303133;
      }
    `;
    this.tooltipElement = null;
    this.styleElement = null;
    this.showStatus = false;
  }

  create(tooltipContent) {
    this.tooltipContent = tooltipContent;
    const autoToolTip = document.querySelector('#' + this.id);
    // 同时只添加一个
    if (autoToolTip) {
      this.tooltipElement = autoToolTip;
      return;
    }

    const styleElement = document.createElement('style');
    styleElement.id = this.styleId;
    styleElement.innerHTML = this.styleElementText;
    document.head.append(styleElement);
    this.styleElement = styleElement;

    const element = document.createElement('div');
    element.id = this.id;

    const arrowElement = document.createElement('div');
    arrowElement.id = 'arrow';
    element.append(arrowElement);

    document.body.append(element);
    this.tooltipElement = element;
  }

  show(event, textWidth) {
    if (this.showStatus) return;

    const targetElement = event.target;
    const targetElementRect = targetElement.getBoundingClientRect();
    const { left, top, width } = targetElementRect;

    this.showStatus = true;
    this.removeTextNode();
    this.tooltipElement.insertAdjacentText('afterbegin', this.tooltipContent);
    const style = {
      left: `${left - (textWidth + 20 - width) / 2}px`,
      top: `${top - 38}px`,
      display: 'block'
    };
    setStyle(this.tooltipElement, style);
  }

  hide() {
    const style = {
      left: '0px',
      top: '0px',
      display: 'none'
    };
    setStyle(this.tooltipElement, style);

    this.removeTextNode();
    this.showStatus = false;
  }

  removeTextNode() {
    const { firstChild } = this.tooltipElement;
    if (Object.prototype.toString.call(firstChild) === '[object Text]') {
      this.tooltipElement.removeChild(firstChild);
    }
  }

  destroy() {
    const { tooltipElement, styleElement } = this;
    tooltipElement && tooltipElement.remove();
    styleElement && styleElement.remove();
  }
}

/**
 * 长按指令，使用：
 * longpressFn 长按后执行的方法
 * <el-button v-longpress="longpressFn">长按</el-button>
 */
export const longpress = {
  bind: function (el, binding, vNode) {
    if (typeof binding.value !== 'function') {
      throw new Error('callback must be a function');
    }
    // 定义变量
    let pressTimer = null;
    // 创建计时器（ 2秒后执行函数 ）
    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return;
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          // eslint-disable-next-line no-use-before-define
          handler();
        }, 1500);
      }
    };
    // 取消计时器
    const cancel = (e) => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    // 运行函数
    const handler = (e) => {
      binding.value(e);
    };
    // 添加事件监听器
    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start);
    // 取消计时器
    el.addEventListener('click', cancel);
    el.addEventListener('mouseout', cancel);
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchcancel', cancel);
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler);
  }
};

/**
 * 用法：v-limit-input:digit 只允许输入数字
 * v-limip-input:reg="your reg expression" 支持传正则表达式，处理一些特殊的场景
 */
export const limitInput = {
  name: 'limit-input',
  bind(el, binding, vnode, oldvnode) {
    const typeMap = {
      // 只输入数字
      digit: /\D/g,
      // 只输入正整数
      positiveInteger: /^(0+)|\D+/g,
      // 只输入基本中文
      chinese: /[^\u4E00-\u9FA5]/g,
      // 只输入中文英文字母
      chineseAlphabet: /[^\u4E00-\u9FA5A-Za-z]/g,
      // 只输入大写字母及数字
      uppercaseLetterDigit: /[^A-Z0-9]/g,
      // 只输入字母及数字
      letterDigit: /[^0-9a-zA-Z]/,
      // 只输入合法的金额格式
      price: /(\d+)(\.\d{0,2})?/
      // price: /([^0-9.])|((?<=\d+\.\d{2})\d+)|((?<=^0)0+)|(^0(?=[1-9]))|((?<=\.\d*)\.)|(^\.)/g
    };
    const { arg, value } = binding;
    if (!arg) {
      throw Error('one arg is required');
    }
    if (arg && !typeMap.hasOwnProperty(arg)) {
      throw Error('arg is not in typeMap');
    }
    if (arg === 'reg' && !value) {
      throw Error('reg arg requires a reg expression value');
    }
    const tagName = el.tagName.toLowerCase();
    const input = tagName === 'input' ? el : el.querySelector('input');
    const regKey = arg || (arg === 'reg' && value);
    // 输入法气泡窗弹出，开始拼写
    el.compositionstartHandler = function () {
      el.inputLocking = true;
    };
    // 输入法气泡窗关闭，输入结束
    el.compositionendHandler = function () {
      el.inputLocking = false;
      input.dispatchEvent(new Event('input'));
    };
    el.inputHandler = function (e) {
      if (el.inputLocking) return;
      const oldValue = e.target.value;
      const newValue = oldValue.replace(typeMap[regKey], '');
      // price 正则在safari报错，导致页面无法打开，新增的判断
      if (regKey === 'price') {
        const rege = /(\d+)(\.\d{0,2})?/;
        const target = e.target;
        if (rege.test(target.value)) {
          const value = target.value.match(rege)[0];
          if (value.split('.').length === 1 && target.value === value) {
            input.value = Number(value);
          } else if (target.value !== value) {
            input.value = value;
            input.dispatchEvent(new Event('input')); // 通知v-model更新
          }
        } else {
          input.value = '';
          input.dispatchEvent(new Event('input'));
        }
      } else {
        // 判断是否需要更新，避免进入死循环
        if (newValue !== oldValue) {
          input.value = newValue;
          input.dispatchEvent(new Event('input')); // 通知v-model更新
        }
      }
    };
    input.addEventListener('compositionstart', el.compositionstartHandler);
    input.addEventListener('compositionend', el.compositionendHandler);
    input.addEventListener('input', el.inputHandler);
  },
  unbind(el) {
    const tagName = el.tagName.toLowerCase();
    const input = tagName === 'input' ? el : el.querySelector('input');
    input.removeEventListener('compositionstart', el.compositionstartHandler);
    input.removeEventListener('compositionend', el.compositionendHandler);
    input.removeEventListener('input', el.inputHandler);
  }
};