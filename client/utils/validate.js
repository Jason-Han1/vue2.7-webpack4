/**
 * Created by jiachenpan on 16/11/18.
 */

/* 11位手机号 */
export function validatePhone11(textval) {
  // const urlregex = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  const urlregex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  return urlregex.test(textval);
}
// 多条手机号
export function validateMangPhone(textval) {
  const reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  let telArr = textval.split(',');
  let result = telArr.every(item => {
    return reg.test(item);
  });
  return result;
}

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

/* 合法uri */
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
// 多条邮箱
export function validateMangEmail(textval) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let emailArr = textval.split(',');
  let result = emailArr.every(item => {
    return reg.test(item);
  });
  return result;
}

/**
 * 价格：1-9位数的小数点后两位正整数
 * @param price
 * @returns {boolean}
 */
export function validatePrice(price) {
  const reg = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
  return reg.test(price);
}

/**
 * 用户名校验：匹配非空白字符，5-25位（后端仍需进行唯一性校验）
 * @param { 用户名 } username
 */
export function validateUsername(username) {
  const reg = /\S{5,25}/;
  return reg.test(username);
}

/**
 * 用户名校验：6-20位数字+字母，数字+特殊字符，字母+特殊字符，数字+字母+特殊字符组合，而且不能是纯数字，纯字母，纯特殊字符
 * @param { 账户密码 } password
 */
export function validatePassword(password) {
  const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
  return reg.test(password);
}

/**
 * 中国大陆18位身份证号
 * @param { 身份证 } idcard
 */
export function validateIdcardInland(idcard) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return reg.test(idcard);
}

/**
 * 邮政编码
 * @param { 邮编 } postcode
 */
export function validatePostCode(postcode) {
  const reg = /^[1-9][0-9]{5}$/;
  return reg.test(postcode);
}

/**
 * 校验网段数量
 * @param { 网段合集 } cidrs '1.1.1.1/23,1.1.12.3/32'
 */
export function validateCidrLength(cidrstr, len) {
  return cidrstr.split(',').length <= (len || 20);
}

/**
 * @description: 验证多个ip地址或者cidr地址的组合
 * @param { String } ipORcidrStr
 * @return { Boolean } 结果
 */

export function validateIpOrCidrS(ipORcidrStr) {
  // ipORcidrStr = '1.1.1.1,1.1.12.3/32'
  const regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
  const regCidr = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}(\/([0-9]|[1-2][0-9]|3[0-2]))$/;
  const res = ipORcidrStr.split(',');
  const validateResult = res.every((item) => {
    return regIp.test(item) || regCidr.test(item);
  });
  return validateResult;
}

/**
 * 校验网段
 * @param { 网段合集 } cidrs '1.1.1.1/23,1.1.12.3/32'
 */
export function validateCidr(cidrstr) {
  // cidrs = '1.1.1.1/23,1.1.12.3/32'
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}(\/([0-9]|[1-2][0-9]|3[0-2]))$/;
  const cidrs = cidrstr.split(',');
  const validateResult = cidrs.every((item) => {
    return reg.test(item);
  });
  return validateResult;
}

/**
 * 校验单条网段
 * @param { 网段合集 } cidrstr '1.1.1.1/23'
 */
export function validateOnlyCidr(cidrstr) {
  const cidrs = cidrstr.split(',');
  if (cidrs.length > 1) return false;
  return validateCidr(cidrstr);
}
/*
 *验证1000条网段
 */
export function validateThousandCidr(cidrstr) {
  const cidrs = cidrstr.split(',');
  if (cidrs.length > 1000) return false;
  return validateCidr(cidrstr);
}


/**
 * 校验节点名字
 * @param { 节点名字 } nodeName
 */
export function validateNodeName(nodeName) {
  return nodeName.length <= 60;
}

/**
 * 自治系统号
 * @param { 自治系统号 } bgpAsn
 */
export function validateBgpAsn(bgpAsn) {
  return /^[0-9]*$/.test(bgpAsn);
}
/*
 *阿里交换机，路由表，专有网络 安全组 名称验证
 */
export function validateName(name) {
  const reg = /^[\u4E00-\u9FA5A-Za-z]([\u4E00-\u9FA5A-Za-z0-9]|\-|\_){1,99}$/;
  return reg.test(name);
}
/*
 *阿里 描述 正则验证
 */
export function validateDescription(descripton) {
  const reg = /^(http:\/\/|https:\/\/)/;
  return reg.test(descripton);
}
/**
 * 校验DNS
 * @param { 网段合集 } cidrs '1.1.1.1,1.1.12.3'
 */
export function validateDns(dnsstr) {
  // cidrs = '1.1.1.1/23,1.1.12.3/32'
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
  const cidrs = dnsstr.split(',');
  const validateResult = cidrs.every((item) => {
    return reg.test(item);
  });
  return validateResult;
}

/*
  校验单条dns
*/
export function validateOnlyDns(dns) {
  const DNS = dns.split(',');
  if (DNS.length > 1) return false;
  return validateDns(dns);
}
// 校验linker防火墙地址 1.1.1.1或者1.1.1.1-2.2.2.2格式或者1.1.1.1/24
export function checkLinkeIp(val) {
  const ip = val.split(',');
  if (ip.length > 1) return false;
  if (validateDns(val)) {
    return true;
  } else if (validateOnlyCidr(val)) {
    return true;
  } else {
    let arr = val.split('-');
    if (validateDns(arr[0]) && validateDns(arr[1])) {
      return true;
    } else {
      return false;
    }
  }
}

// 校验linker防火墙端口 10或者20-30 ，前端大于后面
export function checkLinkerPort(val) {
  let port = val.split(',');
  if (port.length > 10) return false;
  let reg = /^(\d+|\d+\-\d+)$/;
  let result = port.every(item => {
    if (item.indexOf('-') >= 0) {
      let splitArr = item.split('-');
      let result = splitArr[0] > splitArr[1];
      if (result) return false;
    }
    return reg.test(item);
  });
  return result;
}
/**
 * 校验DNS数量 最多为4
 * @param { 网段合集 } cidrs '1.1.1.1,1.1.12.3'
 */
export function validateDnsLength(dnsstr, length = 4) {
  return dnsstr.split(',').length <= length;
}
/*
 *腾讯安全组来源为cidr：192.168.0.1/24或者IP地址：192.168.0.1都符合,单条
 */
export function validateIpOrCidr(str) {
  if (str.split(',').length > 1) {
    return false;
  } else {
    return validateCidr(str) || validateDns(str);
  }
}
// 回车分割的多条ip
export function checkManyIp(val) {
  const ip = val.split('\n');
  // const regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
  return ip.every((item) => {
    // return regIp.test(item);
    return validateIpOrCidr(item.trim());
  });
}
// 回车分割的多条域名
export function checkManyDomain(val) {
  const domain = val.split('\n');
  // const reg = /^([\w-]*\.[a-z]{1,6}|[\w-]*\.[\w-]*\.[a-z]{1,6})$/;
  const reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
  return domain.every((item) => {
    return reg.test(item.trim());
  });
}
/*
 *验证优先级 1-100
 */
export function validatePriority(num) {
  // ?表示0或1
  const reg = /^([1-9]\d?|100)$/;
  return reg.test(num);

}
/*
*验证优先级规则1-99
*/
export function validatePriority02(num) {
  const reg = /^[1-9]\d?$/;
  return reg.test(num);
}
/*
 *验证域名格式
 */
export function validateDomainName(descripton) {
  const reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
  return reg.test(descripton);
}
/*
 *多条域名
 */
export function validateManyDomain(descripton) {
  const reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
  let domainArr = descripton.split(',');
  let result = domainArr.every(item => {
    return reg.test(item);
  });
  return result;
}
/*
 *验证至多一千条域名
 */
export function validateThousandDomain(descripton) {
  const reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
  let domainArr = descripton.split(',');
  if (domainArr.length > 1000) return false;
  let result = domainArr.every(item => {
    return reg.test(item);
  });
  return result;
}

/*
 * 实例名字
 * 60个字符以内
 * 2-60个字符，以大小写字母或中文开头，可包含数字、“.”、“_”、“:”或“-”
 */
export function validateInstanceName(name) {
  const reg = /^[\u4E00-\u9FA5A-Za-z]([\u4E00-\u9FA5A-Za-z0-9\._:-]){2,60}$/;
  return reg.test(name);
}

/*
 *验证服务器主机名
 * 长度为 2-64 个字符，允许使用点号(.)分隔字符成多段，每段允许使用大小写字母、数字或连字符(-)，但不能连续使用点号(.)或连字符(-)。不能以点号(.)或连字符(-)开头或结尾。
 * 长度为 2-60 个字符，允许使用大小写字母、数字、连字符 "-" 和点号 "."，不能连续使用 "-" 或者 "."，"-" 或者 "." 不能用于开头或结尾，不能包含中文，不能仅使用数字
 * 最终：参考阿里
 */
export function validateHostName(hostName) {
  if (hostName.length > 60 || hostName.length <= 2) return false;
  if (/^[0-9]{1, 59}/.test(hostName)) return false;
  const hostItems = hostName.split('.') || [];
  let flag = true;
  hostItems.forEach(element => {
    if (element === '') flag = false; // 不能连续使用.
    if (/([-])\1/.test(element)) flag = false; // 存在连续的--
    if (!/^[A-Za-z0-9][A-Za-z0-9-]{0,64}[A-Za-z0-9]$/.test(element)) flag = false;
  });
  return flag;
}

/*
 * 验证服务器密码
 * 不能以/开头Linux机器密码需8到30位，不支持“/”置于密码首位，至少包括三项（[a-z],[A-Z],[0-9]和[()`~!@#$%^&*-+=_|{}[]:;'<>,.?/]的特殊符号）
 */
export function validateHostPassword(hostPwd) {
  const len = hostPwd.length;
  if (len < 8 || len > 30) return false;
  if (hostPwd.slice(0, 1) === '/') return false;
  const validata_1 = /[A-Z]{1,100}/.exec(hostPwd) != null;
  const validata_2 = /[a-z]{1,100}/.exec(hostPwd) != null;
  const validata_3 = /[0-9]{1,100}/.exec(hostPwd) != null;
  const validata_4 = /[\(\)`~!@#\$%\^&\-*+=_|{}\[\]:;\'<>,.?\/]{1,3}/.exec(hostPwd) != null;
  if (!validata_1 && validata_2 && validata_3 && validata_4) return true;
  if (validata_1 && !validata_2 && validata_3 && validata_4) return true;
  if (validata_1 && validata_2 && !validata_3 && validata_4) return true;
  if (validata_1 && validata_2 && validata_3 && !validata_4) return true;
  if (validata_1 && validata_2 && validata_3 && validata_4) return true;
  return false;
}

/*
 *验证cpe创建限速规则连续ip地址段，正确格式172.16.0.0-172.16.0.10,192.168.0.0-192.168.0.10    最多四项，英文逗号隔开
 */
export function validateIps(ipsStr) {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}-(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
  const ipsArr = ipsStr.split(',');
  if (ipsArr.length > 4) return false;
  const checkResult = ipsArr.every(item => {
    return reg.test(item);
  });
  return checkResult;
}
/*
 *验证cpe防火墙端口 范围[1-65525]
 */
export function validatePortRange(port) {
  const reg = /^([1-9]\d{0,3}$|^[1-5]\d{4})$|^6[0-4]\d{3}$|^65[0-4]\d{2}$|^655[0-1]\d$|^6552[0-5]$/;
  return reg.test(port);
}
/**
 * @description: 验证端口范围，一个或多个 1-65535
 * @param { String } 参数名称
 * @return { Boolean } 验证结果
 */
export function validatePortsRange(portsStr) {
  const portStr = portsStr.split(',');
  // const reg = /^([1-9]\d{0,3}$|^[1-5]\d{4})$|^6[0-4]\d{3}$|^65[0-4]\d{2}$|^655[0-1]\d$|^6552[0-5]$/;
  const reg = /^([1-9]\d{0,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])(-([1-9]\d{0,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))?$/;
  const checkResult = portStr.every(item => {
    return reg.test(item);
  });
  return checkResult;
}
// /^([1-9]\d{0,3}$|^[1-5]\d{4})$|^6[0-4]\d{3}$|^65[0-4]\d{2}$|^655[0-1]\d$|^6552[0-5]$/
/**
 * 校验为范围数字
 * @param {*} str 要校验的数值字符串
 * @param {} min 最小值
 * @param {} max 最大值
 * @description
 * 1.只传min，表示从[min, +∞];
 * 2.只传max，表示从[-∞, max];
 * 3.max和min都传，表示[min, max];
 */
export function validateRangeNumber(str, min, max) {
  str = `${str}`;
  const reg = /^[0-9]*$/;
  const flag = reg.test(str);
  if (!flag) return false;
  if (!!min && str - min < 0) return false;
  if (!!max && str - max > 0) return false;
  return true;
}

// linker 创建nat中srcip地址
export function validateSrcIp(str) {
  let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
  let srcips = str.split(',');
  let result = srcips.every(item => {
    return reg.test(item);
  });
  return result;
}
// linker 创建nat中srcip中目的地址只能一条
export function validateSrcIpLength(str) {
  return str.split(',').length === 1;
}
// linker 端口范围
export function validateNatPort(val) {
  let number = parseInt(val);
  if (number > 10 < 8080) {
    return true;
  } else {
    return false;
  }
}

// 创建业务组
// 验证协议端口是否正确tcp,udp,icmp,gre,all,格式为tcp:30,不区分大小写
export function validateProtocolPort(val) {
  if (val === 'ALL') {
    return true;
  }
  let reg0 = /^(TCP|UDP)(\:)(\d{1,5})$/;
  let reg1 = /^(TCP|UDP)(\:)(\d{1,5}\-\d{1,5})$/;
  let reg2 = /^(TCP|UDP)(\:)((\d{1,5}\,)+)(\d{1,5})$/;
  // let reg3 = /^(ICMP)$/;
  let protocol = val.split(';');
  let result = protocol.every(item => {
    return reg0.test(item) || reg1.test(item) || reg2.test(item); // || reg3.test(item)
  });
  return result;
  // reg.test(val);

}

// 监控设置阈值，延时阈值0-999ms，只验证数值，不带单位
export function validatedelayThreshold(val) {
  let reg = /^[1-9]?\d{0,2}$/;
  return reg.test(val);
}
// 丢包1-100%
export function validatelossThreshold(val) {
  let reg = /^([1-9]?\d|100)$/;
  return reg.test(val);
}
// 安全策略，创建规则中，端口验证 30或30,40-200或40-200
export function validatePolicyPort(val) {
  let port = val.split(',');
  let reg = /^(\d+|\d+\-\d+)$/;
  let result = port.every(item => {
    return reg.test(item);
  });
  return result;
}
/*
验证安全策略，规则的端口数量
*/
export function validatePolicyPortNum(val, num = 10) {
  return val.split(',').length > num;
}
/*
*验证网段个数,参数num:限制个数,可动态传入
*/
export function validateCidrNum(val, num = 10) {
  // if (val.split(',').length > num) return false;
  return val.split(',').length > num;
}
