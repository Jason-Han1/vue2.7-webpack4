function getType(obj){
  // tostring会返回对应不同的标签的构造函数
  let toString = Object.prototype.toString;
  let map = {
     '[object Boolean]'  : 'boolean',
     '[object Number]'   : 'number',
     '[object String]'   : 'string',
     '[object Function]' : 'function',
     '[object Array]'    : 'array',
     '[object Date]'     : 'date',
     '[object RegExp]'   : 'regExp',
     '[object Undefined]': 'undefined',
     '[object Null]'     : 'null',
     '[object Object]'   : 'object'
 };
 if (obj instanceof Element) {
      return 'element';
 }
 return map[toString.call(obj)];
}

/**
 * 普通递归深拷贝函数
 * @param {} data
 */
function deepClone(data){
  let type = getType(data);
  let obj;
  if (type === 'array'){
      obj = [];
  } else if (type === 'object'){
      obj = {};
  } else {
      // 不再具有下一层次
      return data;
  }

  if (type === 'array'){
      for (let i = 0, len = data.length; i < len; i++){
          obj.push(deepClone(data[i]));
      }
  } else if (type === 'object'){
      for (let key in data){
          obj[key] = deepClone(data[key]);
      }
  }

  return obj;
}

export default deepClone;
