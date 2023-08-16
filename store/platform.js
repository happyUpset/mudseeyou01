import { detect } from 'detect-browser'
import {defineStore} from "pinia";

export const platformStore = defineStore('platform', {
  state: () => {
    return {
      browsers: '',
      devices: {
        isMac: null,
        isIOS: null,
        isWindows: null,
        isAndroid: null,
        isLinux: null,
      }
    }
  },

  actions: {
    set_is_browser () {
      this.$patch((state) => {
        state.browsers = detect() ? detect().name : 'ios-webview' // 臉書有些看 detect() 為 null
      })

    },
    set_is_device () {
      this.$patch((state) => {
        const userAgent = window.navigator.userAgent,
          platform = window.navigator.platform,
          macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
          windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
          iosPlatforms = ['iPhone', 'iPad', 'iPod']
        state.devices.isMac = macosPlatforms.indexOf(platform) !== -1
        state.devices.isIOS = iosPlatforms.indexOf(platform) !== -1
        state.devices.isWindows = windowsPlatforms.indexOf(platform) !== -1
        state.devices.isAndroid = /Android/.test(userAgent)
        state.devices.isLinux = /Linux/.test(platform)
      })
    },
  },
  getters: {
    browserName: (state) => {
      return state.browsers
    },
    isWebviews: (state) => {
      const webviews = [
        'facebook',
        'instagram',
        'ios-webview',
        'chromium-webview'
      ]
      return webviews.some(webview => webview === state.browsers)
    },
    deviceName: (state) => {
      for (let isPlatform of Object.keys(state.devices)) {
        if (state.devices[isPlatform]) {
          return isPlatform
        }
      }
      return ''
    },
  }
})
