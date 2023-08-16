import {APP_API} from "~/const/base";

/**
 * 提供 手機號碼 取得資訊，是否已登入過，如果是則(在打 api 取得 token ) | (直接給予該手機號碼的 token)
 * 如果否 則進入手機驗證以註冊
 * @returns {Promise<{data: Ref<DataT>, pending: Ref<boolean>, refresh: (opts?: { dedupe?: boolean }) => Promise<void>, error: Ref<Error | boolean>}|any>}
 * @constructor
 */
export const GET_TOKEN = async (phone) => {
  const {data, pending, error, refresh} = await useFetch(
    APP_API+'/api/customers/login',
    {
      key: 'token',
      method: 'post',
      body: {phone_number:phone},
    })
  return {data, pending, error, refresh}
}

/**
 * 驗證身份  422 可登入，200 需驗證手機號碼且會發簡訊，重發也是打這個
 * @returns {Promise<{data: Ref<DataT>, pending: Ref<boolean>, refresh: (opts?: { dedupe?: boolean }) => Promise<void>, error: Ref<Error | boolean>}|any>}
 * @constructor
 */
export const GET_VERIFY = async (phone) => {
  const {data, pending, error, refresh} = await useFetch(
    APP_API+'/api/customers',
    {
      key: 'verify',
      method: 'post',
      body: {phone_number:phone},
    })
  return {data, pending, error, refresh}
}

/**
 * 取得 手機 驗證，一般會員註冊
 * @returns {Promise<{data: Ref<DataT>, pending: Ref<boolean>, refresh: (opts?: { dedupe?: boolean }) => Promise<void>, error: Ref<Error | boolean>}|any>}
 * @constructor
 */
export const GET_PHONE_CODE = async (phone,code) => {
  const authToken = useCookie("table_tennis_platform_tk");
  const {data, pending, error, refresh} = await useFetch(
    APP_API+'/api/customers/verify',
    {
      key: 'verify_code',
      method: 'post',
      headers: authToken.value ? {Authorization: 'Bearer '+authToken.value} : {},
      body:{
        verification_code: code,
        phone_number: phone,
      }
    })
  return {data, pending, error, refresh}
}

/**
 * 建立註冊資訊
 * @returns {Promise<{data: Ref<DataT>, pending: Ref<boolean>, refresh: (opts?: { dedupe?: boolean }) => Promise<void>, error: Ref<Error | boolean>}|any>}
 * @constructor
 */
export const POST_REGISTER = async (form) => {
  const authToken = useCookie("table_tennis_platform_tk");
  const {data, pending, error, refresh} = await useFetch(
    APP_API+'/api/customers/me',
    {
      key: 'profile',
      method: 'post',
      body: form,
      headers: authToken.value ? {Authorization: 'Bearer '+authToken.value} : {},
    })
  return {data, pending, error, refresh}
}

/**
 * 取得登入資訊
 * @returns {Promise<{data: Ref<DataT>, pending: Ref<boolean>, refresh: (opts?: { dedupe?: boolean }) => Promise<void>, error: Ref<Error | boolean>}|any>}
 * @constructor
 */
export const GET_PROFILE = async (token = null) => {
  let authToken = ''
  if(token){
    authToken = {value: token}
  }else {
    authToken = useCookie("table_tennis_platform_tk");
  }
  // console.log('authToken',authToken)
  const {data, pending, error, refresh} = await useFetch(
    APP_API+'/api/customers/me',
    {
      key: 'profile',
      headers: authToken.value ? {Authorization: 'Bearer '+authToken.value} : {},
    })
  return {data, pending, error, refresh}
}

// const { data, pending, error, refresh } = await useFetch('/api/booking',{
//   method: 'post',
//   headers:{
//     authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmUyMTkxMDQwM2YzODkxNGFiZTNkMmZjZTBmZWMyMTdjM2NlYTkyZTI3MDhiZTlkNmQwM2I0OTUxMzhiMDFhZTQ1ZTFiMGZhM2VjYWFiOGQiLCJpYXQiOjE2NzkwNTA4ODEsIm5iZiI6MTY3OTA1MDg4MSwiZXhwIjoxNzEwNjczMjgxLCJzdWIiOiIyNSIsInNjb3BlcyI6W119.HdRBEExzcp5x0-sfFV_Y2-yaqxxM5AcDQ7N7tR_OQdPqnByvaN7Ru-vcmGHXWNiHd54NaUg-57vvcnIV4yKPjneUlB5AGrBjEK8Nh31uk07XQ-BhbyPfUGVUnsK97qIGm4PkVp_s7u0WBJ2uozQ6venBz08W27jxXzHLfbl3A8_aWnc_4byNSBfneCpIUklgdOguWZz8mczvBsvGXRFP3VNVWejFbhPEzT5vUlIf89oUnluANb92_4bpyXhrdnd3AEjhiOn4qXegMUgkFXMMV_tEtmuT3JVYWmNlISreFtCTVmONuZbKwE24ItXMoWh38Wn7qgta2MEuGXDmq9dOE4fMKp3xKIjkXeSl42BUReWsyB0E_2psPWriV1Uuwrtq1ljS6d71xpKdW3PgIGhDLTiJbiAJsKhWKVIO88Ts89DpvQYlxLcr32Oo9djrZ9N8y7nU88vwmpGA6RWdFLUNS2mNnsBavV8VeBaurci8toXd5BWxQ9tsOwLhjyP8A5KR1zvav8Lnj8zO7ME3ysrzthq9lGhqVpyp9bzrrqJe3AxhYrok7hyjdKuLCEzcsGh_4WL1nciVK9v9DYTaDolimK-pcT3BlJEZwdpwpUS991Nxyt3jVLBKwSPByXPZpE9f0Dr--reW4TDJ4usv9g4H7m-8eT6jKl0R1TBUoMmLOGE'
//   },
//   body: {
//     phone_number: '0987654321'
//   },
//   onRequest({ request, options }) {
//     // Set the request headers
//     console.log(request, options)
//     // options.headers = options.headers || {}
//     // options.headers.authorization = '...'
//   },
// })

// const { data, pending, error, refresh } = await useFetch('/api/additions', {
//   key: 'categories',
//   onRequest({ request, options }) {
//     // Set the request headers
//     options.headers = options.headers || {}
//     options.headers.authorization = '...'
//   },
//   onRequestError({ request, options, error }) {
//     // Handle the request errors
//   },
//   onResponse({ request, response, options }) {
//     // Process the response data
//     console.log('A',response)
//     return response._data
//   },
//   onResponseError({ request, response, options }) {
//     // Handle the response errors
//   }
// })
// console.log('data2',data.value)
