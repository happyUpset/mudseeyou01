// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
// https://www.npmjs.com/package/js-cookie
import Cookie from 'js-cookie';

const storage = {
  attributes: null,
  storeName : 'Local',
  set :(name,data,storeName= storage.storeName, params = null) =>{
    return storage['set'+storeName](name,data,params);
  },
  get :(name,storeName=storage.storeName) =>{
    return storage['get'+storeName](name);
  },
  remove :(name,storeName=storage.storeName) =>{
    storage['remove'+storeName](name);
  },
  clearAll :(storeName=storage.storeName) =>{
    storage['clearAll'+storeName]();
  },

  setLocal:(name,data,params = null) => {
    return localStorage.setItem(name,data);
  },
  getLocal:(name) => {
    return localStorage.getItem(name);
  },
  removeLocal:(name) => {
    localStorage.removeItem(name);
  },
  clearAllLocal:() => {
    localStorage.clear();
  },

  setSession:(name,data,params = null) => {
    return sessionStorage.setItem(name,data);
  },
  getSession:(name) => {
    return sessionStorage.getItem(name);
  },
  removeSession:(name) => {
    sessionStorage.removeItem(name);
  },
  clearAllSession:() => {
    sessionStorage.clear();
  },

  //目前直接執行Cookie 才能使用attributes
  setCookie:(name,data,params = null) => {
    if(typeof params !=='undefined' && params){
      return Cookie.set(name,data,params);
    }else {
      return Cookie.set(name,data);
    }
  },
  getCookie:(name) => {
    return Cookie.get(name);
    // return Cookie.getJSON(name);
  },
  removeCookie:(name) => {
    if(typeof storage.attributes !=='undefined'){
      Cookie.remove(name,storage.attributes);
    }else {
      Cookie.remove(name);
    }
  },
  clearAllCookie:() => {
    console.log('hasn\'t clearAllCookie function in code.');
  },

  clearAllStorage :() => {
    storage.clearAllSession();
    storage.clearAllLocal();
  }
};
export default storage
