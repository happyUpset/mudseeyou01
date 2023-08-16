import VueScrollTo from 'vue-scrollto'
import Notification from '@kyvg/vue3-notification'

export default defineNuxtPlugin((NuxtApp) => {
// 訊息
  NuxtApp.vueApp.use(VueScrollTo)
  NuxtApp.vueApp.use(Notification)
//--------
})
