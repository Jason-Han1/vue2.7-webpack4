const moment = require('moment');
/**
 * @description: 路由跳转方法
 * @param { String } path 路径
 * @param { Object } sArguments 查询参数
 * @return void
 */
// export const doJumpRoute = ( sArguments = {query: {}, params: {}, name: '', path: ''})=> {
export function doJumpRoute(sArguments = { query: {}, params: {}, name: '', path: '' }, _that) {
  _that.$router.push(sArguments);
}
/**
 * @description: 流量基础单位简介
 * 单位      缩写   中文名称    换算
 * bit       b     比特(位)     8
 * (B)byte   B     字节         1
 */
/**
 * @description: 常见流量单位换算关系
 * 1B（字节）= 8b（位）
 * 1KB = 1024B
 * 1MB = 1024KB
 * 1GB = 1024MB
 * 1TB = 1024GB
 */
/**
 * @description: B与b(bps)的换算以M(B)举例，其他同理
 * MB2Mbps = MB * 8
 * Mbps2MB = Mbps / 8
 */
/**
 * @description: 流量换算 B2Mb
 * @param { number } bytes 字节数（B）
 * @return { number, string }  size:大小 unit:单位
 */
export function BToMb(bytes) {
  let defaultSize = '';
  let defaultUnit = '';
  bytes = bytes * 8;
  if (bytes <= 0) {
    defaultSize = 0;
    defaultUnit = 'bps';
  } else if (bytes < 1 * 1024) { // 如果小于1KB转化成B
    defaultSize = bytes.toFixed(2);
    defaultUnit = 'bps';
  } else if (bytes < 1 * 1024 * 1024) { // 如果小于1MB转化成KB
    defaultSize = (bytes / 1024).toFixed(2);
    defaultUnit = 'Kbps';
  } else if (bytes < 1 * 1024 * 1024 * 1024) { // 如果小于1GB转化成MB
    defaultSize = (bytes / (1024 * 1024)).toFixed(2);
    defaultUnit = 'Mbps';
  } else { // 其他转化成GB
    defaultSize = (bytes / (1024 * 1024 * 1024)).toFixed(2);
    defaultUnit = 'Gbps';
  }
  let sizestr = defaultSize + '';
  let len = sizestr.indexOf('.');
  let dec = sizestr.substr(len + 1, 2);
  if (dec == '00') { // 当小数点后为00时 去掉小数部分
    return {
      size: sizestr.substring(0, len) + sizestr.substr(len + 3, 2),
      unit: defaultUnit
    };
  }
  return {
    size: defaultSize,
    unit: defaultUnit
  };
}

/**
 * @description: 流量换算 B2MB
 * @param { number } bytes 字节数（B）
 * @return { number, string }  size:大小 unit:单位
 */
export function B2MB(bytes) {
  if (bytes === 0) return { size: 0, unit: 'B' };
  let k = 1024;
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return {
    size: Math.floor((bytes / Math.pow(k, i))),
    unit: sizes[i]
  };
}

/**
 * @description: 根据s换算成d-h-m-s
 * @param { number } second 秒数
 * @return { string } d-h-m-s
 */
export function getDuration(second) {
  let duration = '';
  let days = Math.floor(second / 86400);
  let hours = Math.floor((second % 86400) / 3600);
  let minutes = Math.floor(((second % 86400) % 3600) / 60);
  let seconds = Math.floor(((second % 86400) % 3600) % 60);
  if (days > 0) duration = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒';
  else if (hours > 0) duration = hours + '小时' + minutes + '分' + seconds + '秒';
  else if (minutes > 0) duration = minutes + '分' + seconds + '秒';
  else if (seconds > 0) duration = seconds + '秒';
  return duration;
}

/**
 * @description: 根据unixTime换算成y-m-d h:mm:s
 * @param { number } second 秒数
 * @return { string } d-h-m-s
 */
export function unixToTime(unixTime) {
  function timeAdd(m) {
    return m < 10 ? '0' + m : m;
  }
  // unixTime是整数，否则要parseInt转换
  const time = new Date(unixTime * 1000);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();
  return y + '-' + timeAdd(m) + '-' + timeAdd(d) + ' ' + timeAdd(h) + ':' + timeAdd(mm) + ':' + timeAdd(s);
}

/**
 * @description: 计算子网起始地址(不包括网络地址)
 * @param { string } ip
 * @param { string } mask
 * @return { string } 子网起始地址
 */
export function getLowAddr(ip, netMask) {
  let lowAddr = '';
  let ipArray = [];
  let netMaskArray = [];
  // I参数不正确
  if (ip.split('.').length != 4 || (netMask == '')) { return ''; }
  for (let i = 0; i < 4; i++) {
    ipArray[i] = ip.split('.')[i];
    netMaskArray[i] = netMask.split('.')[i];
    // eslint-disable-next-line no-mixed-operators
    if (ipArray[i] > 255 || ipArray[i] < 0 || netMaskArray[i] > 255 && netMaskArray[i] < 0) { return ''; }
    ipArray[i] = ipArray[i] & netMaskArray[i];
  }
  // 构造最小地址
  for (let j = 0; j < 4; j++) {
    if (j == 3) {
      ipArray[j] = ipArray[j] + 1;
    }
    if (lowAddr == '') {
      lowAddr += ipArray[j];
    } else {
      lowAddr += '.' + ipArray[j];
    }
  }
  return lowAddr;
}

/**
 * @description: 计算子网终止地址（不包括广播地址）
 * @param { string } ip
 * @param { string } mask
 * @return { string } 子网终止地址
 */
export function getHighAddr(ip, netMask) {
  let lowAddr = getLowAddr(ip, netMask);
  let hostNumber = getHostNumber(netMask);
  if (lowAddr == '' || hostNumber == 0) { return ''; }
  let lowAddrArray = [];
  for (let i = 0; i < 4; i++) {
    lowAddrArray[i] = lowAddr.split('.')[i];
    if (i == 3) {
      lowAddrArray[i] = Number(lowAddrArray[i] - 1);
    }
  }
  lowAddrArray[3] = lowAddrArray[3] + Number(hostNumber - 1);
  if (lowAddrArray[3] > 255) {
    let k = parseInt(lowAddrArray[3] / 256);
    lowAddrArray[3] = lowAddrArray[3] % 256;
    lowAddrArray[2] = Number(lowAddrArray[2]) + Number(k);
    if (lowAddrArray[2] > 255) {
      k = parseInt(lowAddrArray[2] / 256);
      lowAddrArray[2] = lowAddrArray[2] % 256;
      lowAddrArray[1] = Number(lowAddrArray[1]) + Number(k);
      if (lowAddrArray[1] > 255) {
        k = parseInt(lowAddrArray[1] / 256);
        lowAddrArray[1] = lowAddrArray[1] % 256;
        lowAddrArray[0] = Number(lowAddrArray[0]) + Number(k);
      }
    }
  }
  let highAddr = '';
  for (let j = 0; j < 4; j++) {
    if (j == 3) {
      lowAddrArray[j] = lowAddrArray[j] - 1;
    }
    if (highAddr == '') {
      highAddr = lowAddrArray[j];
    } else {
      highAddr += '.' + lowAddrArray[j];
    }
  }
  return highAddr;
}

/**
 * @description: 获取主机数
 * @param { string } mask
 * @return { number } 主机数
 */
export function getHostNumber(netMask) {
  let hostNumber = 0;
  let netMaskArray = [];
  for (let i = 0; i < 4; i++) {
    netMaskArray[i] = netMask.split('.')[i];
    if (netMaskArray[i] < 255) {
      hostNumber = Math.pow(256, 3 - i) * (256 - netMaskArray[i]);
      break;
    }
  }
  return hostNumber;
}

/**
 * @description: 转换掩码的格式
 * @param { string } internetMask 子网掩码
 * @return { string } 格式化后的子网掩码
 */
export function getNetMask(internetMask) {
  let netMask = '';
  if (internetMask > 32) { return netMask; }
  // 子网掩码为1占了几个字节
  let num1 = parseInt(internetMask / 8);
  // 子网掩码的补位位数
  let num2 = internetMask % 8;
  let array = [];
  for (let i = 0; i < num1; i++) {
    array[i] = 255;
  }
  for (let j = num1; j < 4; j++) {
    array[j] = 0;
  }
  for (let k = 0; k < num2; num2--) {
    array[num1] += Math.pow(2, 8 - num2);
  }
  netMask = array[0] + '.' + array[1] + '.' + array[2] + '.' + array[3];
  return netMask;
}

/**
 * 根据路由路径判断是views里的哪个子路由
 * @param path
 * @returns {*}
 */
export function getViewType(path) {
  const pathList = path.split('/');
  return pathList.length >= 3 ? path.split('/')[2] : '';
}


/**
 * 根据路由路径判断是views里的哪个子路由
 * @param path
 * @returns {*}
 */
export function getByteLength(str) {
  return str.replace(/[^\x00-\xff]/g, 'aa').length;
}

/**
 * 传入一个str，获取到包含多少个中文和英文
 * @param str
 * @returns {{total, enNum}}
 */

export function getEnNum(str) {
  let resObj = {
    total: str.length,
    enNum: str.replace(/[^\x00-\xff]/g, '').length
  };

  resObj.zhNum = resObj.total - resObj.enNum;

  return resObj;
}

/**
 * 找到该项，在数组中的索引
 * @param str
 * @returns {{total, enNum}}
 */
export function indexOfArr(arr, dst) {
  let i = arr.length;
  while (i -= 1) {
    if (arr[i] == dst) {
      return i;
    }
  }
  return -1;
}


export function mySetInterval(callback) {
  return setInterval();
}

export function byteToMbps(byteVal, interval) {
  interval = Math.floor(interval / 1000);
  const mb = (byteVal / 1024 / 1024 / interval) * 8;
  return Math.floor(mb * 100) / 100;
}

/**
 * 将byte单位的流量值，转为对应单位的带宽或者流量
 * 转为带宽：例如byte流量，转为Mbps(Mbit/s即兆比特每秒)
 * 转为格式化的流量：例如，byte 转为 GB ,MB, TB
 * notice:目前只以M为单位
 * @param {*byte单位的值} byteVal
 * @param {流量取值的时间间隔，毫秒级别} interval
 * @param {是否指定转换单位，B, M, G, T} unit
 *
 */
export function byteToBeNewUnit(byteVal, interval, unit) {
  if (!interval || (interval - 0) != (interval - 0)) {
    interval = 1; // interval不存在，忽略interval对结果的影响
  } else {
    interval = Math.floor(interval / 1000); // 存在，即转为s单位
  }
  return Math.floor(mb * 100) / 100; // 保留小数点后两位
}

/**
 * 获取为5分钟倍数的最近时间间隔（对时间间隔取整化）
 * @param {*想要获取的时间间隔} interval
 * notice:从getTimeParams接口改编
 */
export function nearTimeInterval(interval, addSecond = 0) {
  const toUnix = new Date().getTime();
  const fromUnix = toUnix - interval;
  return {
    'from': Math.floor(fromUnix / 1000 / 300) * 300 + (addSecond - 0),
    'to': Math.floor(toUnix / 1000 / 300) * 300 - 1 + (addSecond - 0)
  };
}


/**
 * 获取为5分钟倍数的最近时间间隔（对时间间隔取整化）
 * @param {*想要获取的时间间隔} interval
 * notice:从getTimeParams接口改编
 */
export function get(interval) {
  const toUnix = new Date().getTime();
  const fromUnix = toUnix - interval;
  return {
    'from': Math.floor(fromUnix / 1000 / 300) * 300,
    'to': Math.floor(toUnix / 1000 / 300) * 300
  };
}

/**
 * 字节长度
 * @param { *字节长度} byteLength
 */
export function cutStringByByte(str, byteLength) {
  let byteLen = 0,
    len = str.length,
    cutIndex = 0;
  for (let i = 0; i <= len - 1; i++) {
    cutIndex++;
    if (str.charCodeAt(i) > 255) {
      byteLen += 2;
    } else {
      byteLen++;
    }
    if (byteLen >= byteLength) {
      break;
    }
  }

  return len > cutIndex ? (str.slice(0, cutIndex - 1) + '...') : str;
}

/**
 *
 * @param {原始数组 *} arr
 * @param {*} field
 * @param {*} curValue
 */
export function arrayMap(arr = [], field, curValue) {
  let result = undefined;
  arr.forEach(item => {
    if (item[field] == curValue) {
      result = item;
      return;
    }
  });
  return result;
}

/**
 *
 * @param {原始数组 *} arr
 * @param {*} field
 * @param {*} curValue
 */
export function commandCopy(value) {
  let transfer = document.createElement('input');
  document.body.appendChild(transfer);
  transfer.value = value; // 这里表示想要复制的内容
  transfer.focus();
  transfer.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  transfer.blur();
  console.log('复制成功');
  document.body.removeChild(transfer);
}



/**
 *计算累计通话时长
 * @param {原始数组 *} arr
 * @param {*} field
 * @param {*} curValue
 */
export function countTotalTime(enterRoomTime, quitRoomTime) {
  const enterUnix = moment(enterRoomTime).unix();
  const quitUnix = moment(quitRoomTime).unix();
  const h = Math.floor((quitUnix - enterUnix) / (60 * 60));
  const hourInterval = quitUnix - enterUnix;
  const minInterval = hourInterval % (60 * 60);
  const m = Math.floor(minInterval / 60);
  const s = minInterval % 60;
  return `${h}h ${m}min ${s}s`;
}

/**
 * 处理er-form异步数据异常的数据管理对象
 */
export function createErrorStore() {
  const errorContainer = Object.create(null);

  /**
   * 删除所有的error对象
   */
  const clearAll = () => {
    const keys = Object.keys(errorContainer);
    for (const key of keys) {
      delete errorContainer[key];
    }
  };

  /**
   * 删除指定filed的error对象
   * @param {*} field
   */
  const clear = (field) => {
    if (!errorContainer[field]) return;
    delete errorContainer[field];
  };

  /**
   * 添加error对象
   * @param {*} field
   * @param {*} message
   */
  const push = (field, message) => {
    errorContainer[field] = message;
  };

  /**
   * 添加error对象存储，通过axios res
   * @param {*} res
   */
  const pushByRes = (res) => {
    const errorBody = res.payload;
    for (const field in errorBody) {
      const message = errorBody[field].message;
      if (!message) continue;
      push(field, message);
    }
  };

  const getStore = () => {
    return errorContainer;
  };

  const logStore = () => {
    console.log(JSON.stringify(2, null, errorContainer));
  };

  return {
    rules(rule, value, callback, asyncRules) {
      const field = rule.field;
      const message = errorContainer[field];
      if (message) return callback(new Error(message));
      callback();
    },
    clearAll,
    clear,
    push,
    pushByRes,
    getStore,
    logStore
  };
}
