import { ALL } from '@/const/permissionsName'
import { ROLES } from '@/const/rolesName'

export const URL = {
  index: {
    path: '/',
    name: 'index',
    locale: '共享桌球館',
  },
  404: {
    path: '/404',
    name: '404',
    locale: '錯誤',
  },
  paymentResponse: {
    path: '/payment/[no]',
    name: 'payment-no',
    locale: '錯誤',
  },
  landings: {
    path: '/landings',
    name: 'landings',
    locale: '前導畫面',
  },

  phone: {
    path: '/phone',
    name: 'phone',
    locale: '會員手機',
  },
  verify: {
    path: '/phone/verify',
    name: 'phone-verify',
    locale: '會員手機驗證',
  },
  register: {
    path: '/register',
    name: 'register',
    locale: '會員註冊',
  },

  browserLeave: {
    path: '/func/browserLeave',
    name: 'func-browserLeave',
    locale: '瀏覽器離開監聽',

    belong: 'func',
  },
  browserResize: {
    path: '/func/browserResize',
    name: 'func-browserResize',
    locale: '瀏覽器改編高寬',

    belong: 'func',
  },
  browserScroll: {
    path: '/func/browserScroll',
    name: 'func-browserScroll',
    locale: '瀏覽器監聽滾輪軸',

    belong: 'func',
  },
  color: {
    path: '/func/color',
    name: 'func-color',
    locale: '顏色轉換',

    belong: 'func',
  },
  currency: {
    path: '/func/currency',
    name: 'func-currency',
    locale: '金錢分段',

    belong: 'func',
  },
  htmlClass: {
    path: '/func/htmlClass',
    name: 'func-htmlClass',
    locale: 'css,style控制功能',

    belong: 'func',
  },
  positionTop: {
    path: '/func/positionTop',
    name: 'func-positionTop',
    locale: 'div物件高度取得',

    belong: 'func',
  },
  storage: {
    path: '/func/storage',
    name: 'func-storage',
    locale: 'storage',

    belong: 'func',
  },
  modal: {
    path: '/com/modal',
    name: 'com-modal',
    locale: '燈箱效果',

    belong: 'com',
  },
  time: {
    path: '/com/time',
    name: 'com-time',
    locale: '時間顯示',

    belong: 'com',
  },
  icon: {
    path: '/com/icon',
    name: 'com-icon',
    locale: 'icon顯示',

    belong: 'com',
  },
  validate: {
    path: '/var/validate',
    name: 'var-validate',
    locale: 'validate',

    belong: 'var',
  },


}

export const FUNC = Object.keys(URL).filter(key => URL[key].belong === 'func')
export const COM = Object.keys(URL).filter(key => URL[key].belong === 'com')
export const VAR = Object.keys(URL).filter(key => URL[key].belong === 'var')
