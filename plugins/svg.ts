// import 'virtual:svg-icons-register'
import svgIcon from '@/components/SvgIcon.vue'
import NuxtIcon2 from '@/components/NuxtIcon2.vue'

export default defineNuxtPlugin((NuxtApp) => {
  NuxtApp.vueApp.component('SvgIcon', svgIcon)
  NuxtApp.vueApp.component('NuxtIcon', NuxtIcon2)
})
