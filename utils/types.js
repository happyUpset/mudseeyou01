
/**
 * @param {string} obj
 * @returns {Boolean}
 */
export function isString(obj) {
  if (typeof obj === 'string' || obj instanceof String) {
    return true
  }
  return false
  return Object.prototype.toString.call(obj) === '[object String]';
}

/**
 * @param {[number,null,string]} num
 * @param force 強型別為數字 int, float
 * @returns {Boolean}
 */
export function isNumber(num, force = false) {
  let showNum = num
  if(!force && isString(num)){
    showNum = parseInt(num)
  }
  return Number(showNum) === showNum && isDefined(showNum)
}

/**
 * @param {string,Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

// 判斷是否為物件類型陣列
export function isObject(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}

export const isFunction = (functionToCheck) => {
  let getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

export const isUndefined = (val)=> {
  return val === void 0;
};

export const isDefined = (val) => {
  return val !== undefined && val !== null;
};

// 判斷是不是空資料 undefined, null, '', [], {}
export function isEmpty (data) {
  return typeof data === 'undefined' ||
    data === null ||
    (typeof data === 'string' && data.trim() === '') ||
    (Array.isArray(data) && data.length === 0) ||
    (isObject(data) && Object.keys(data).length === 0)
}
