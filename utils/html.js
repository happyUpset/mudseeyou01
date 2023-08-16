import {isEmpty} from "~/utils/types";

export function hasClass(element, cName) {
  let escapedCName = cName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 轉義特殊字符
  return !!element.className.match(new RegExp('(\\s|^)' + escapedCName + '(\\s|$)'));
}

export function hasClassAll(element) {
  return element.className;
}

export function addClass(element, cName) {
  if (!hasClass(element, cName)) {
    element.className += ' ' + cName;
  }
}

export function removeClass(element, cName) {
  if (hasClass(element, cName)) {
    let escapedCName = cName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 轉義特殊字符
    element.className = element.className.replace(new RegExp('(\\s|^)' + escapedCName + '(\\s|$)'), ' ');
  }
}
export function hasStyle(element, sTitle) {
  return !isEmpty(element.style[sTitle]);
  // let computedStyle = window.getComputedStyle(element);
  // return sTitle in computedStyle;
}

export function hasStyleAll(element) {
  return element.style.cssText;
}

export function addStyle(element, sTitle, sValue) {
  // if (!hasStyle(element, cName)) {
    element.style[sTitle] = sValue;
  // }
}

export function removeStyle(element, sTitle) {
  // if (hasStyle(element, cName)) {
  element.style[sTitle] = '';
    // element.style = element.style.cssText.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' ');
  // }
}
