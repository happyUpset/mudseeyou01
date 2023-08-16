import axios from 'axios'
import { isFunction } from "~/utils/types";
// import { getToken, setToken } from '@/utils/auth'
// 讓錯誤直接接上提示視窗
// import processFunc from '@/utils/process'

// const domain = process.env.NUXT_APP_BASE_API
const domain = 'https://pingpongapi.marsfootball.com.tw/'

// axios.defaults.baseURL = "https://api.bebingo.com.tw/";
// axios.defaults.withCredentials = true;
// axios.defaults.headers['Authorization'] = Storage.getCookie('HomeToken')
// if(typeof axios.defaults.headers['Authorization'] === 'undefined' || axios.defaults.headers['Authorization'] === null){
//   axios.defaults.headers['Authorization'] = 'BEAR '
// }

const requestWork = {
  insertHeaderDefaults: (act, data) => {
    for (const key of Object.keys(data)) {
      axios.defaults.headers[act][key] = data[key]
    }
    return axios.defaults.headers
  },
  insertHeaderDefault: (act, data) => {
    axios.defaults.headers[act] = data
    // console.log(axios.defaults.headers);
    return axios.defaults.headers
  }
}

// https://eyesofkids.gitbooks.io/javascript-start-es6-promise/content/contents/then_adv.html
export default requestWork

// 新增語系控制
export const GET_PROMISE = (url, data = {}, configs, catchTitle = null) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: /http/.test(url) ? url : domain + url,
      params: data,
      // 'Content-Type': 'application/json;charset=UTF-8',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: axios.defaults.headers['Authorization'] || 'BEAR2',
      }
    }
    if (typeof configs !== 'undefined' && configs !== null) {
      options = Object.assign({}, options, configs)
    }
    // console.log('options',options)
    axios(options).then(function (response) {
      resolve(response)
    }).catch(function (error) {
      if(typeof catchTitle === 'string')
        // processFunc.catchBackMessageNotifyObj({e:error,title: catchTitle,duration: 3000})
      reject(error)
    })
  })
}

// 新增語系控制
export const POST_PROMISE = (url, data, configs, progressCallback = null, catchTitle = null) => {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'post',
      url: /http/.test(url) ? url : domain + url,
      data,
      onUploadProgress: progressEvent => {
        if(isFunction(progressCallback))
          progressCallback(Math.round((progressEvent.loaded * 100) / progressEvent.total))
      }
    }
    if (typeof configs !== 'undefined' && configs !== null) {
      options = Object.assign({}, options, configs)
    }
    axios(options).then(function (response) {
      resolve(response)
    }).catch(function (error) {
      if(typeof catchTitle === 'string')
        // processFunc.catchBackMessageNotifyObj({e:error,title: catchTitle,duration: 3000})
      reject(error)
    })
  })
}

export const PUT_PROMISE = (url, data, configs, catchTitle = null) => {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'put',
      url: /http/.test(url) ? url : domain + url,
      data
    }
    if (typeof configs !== 'undefined' && configs !== null) {
      options = Object.assign({}, options, configs)
    }
    axios(options).then(function (response) {
      resolve(response)
    }).catch(function (error) {
      if(typeof catchTitle === 'string')
        // processFunc.catchBackMessageNotifyObj({e:error,title: catchTitle,duration: 3000})
      reject(error)
    })
  })
}

export const DELETE_PROMISE = (url, data = {}, configs, catchTitle = null) => {
  return new Promise((resolve, reject) => {
    let configsData = { data }
    if (typeof configs !== 'undefined' && configs !== null) {
      configsData = Object.assign({}, configsData, configs)
    }
    axios.delete( /http/.test(url) ? url : domain + url, configsData)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        if(typeof catchTitle === 'string')
          // processFunc.catchBackMessageNotifyObj({e:error,title: catchTitle,duration: 3000})
        reject(error)
      })
  })
}
