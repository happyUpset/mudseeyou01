import {defineStore, storeToRefs} from 'pinia'
import {computed} from "vue";
import {SCREEN_DATA_LIST, SCREEN_NAME_LIST} from "~/const/screen";

const screenControls = {
  handleResize ($state, windowWidth) {
    const index = SCREEN_DATA_LIST.findIndex(width => width > windowWidth)
    const index2 = SCREEN_DATA_LIST.findIndex(width => width > windowWidth)
    let data1 = index !== -1 ? [SCREEN_NAME_LIST[index],index]: ['3xl',8]
    let data2 = index2 !== -1 ? [SCREEN_NAME_LIST[index2],index2]: ['3xl',8]
    return data1.concat(data2)
  }
  // handleScroll(){
  //
  // }
}

export const storeScreen = defineStore('screen', ()=> {
  /***
   *类似于组件的 data数据的 ,用来存储全局状态的
   * 1、必须是箭头函数
   */
  const screenWidth = ref(0)
  const screenHeight = ref(0)
  const windowWidth = ref(0)
  const windowHeight = ref(0)
  const documentWidth = ref(0)
  const documentHeight = ref(0)
  const windowScrollTop = ref(0)
  const windowLastTimeScrollTop = ref(0)
  // const platform = reactive({
  //   isMobileSize: false,
  //   isPadSize: false,
  //   isDesktopSize: false,
  //   isMaxDesktopSize: false,
  //   is1440Size: false,
  //   is1680Size: false,
  //   is1920Size: false
  // })
  const platformIndex = ref(0)
  // 絕對值
  const platform = reactive({
    xs: false,
    '2xs': false,
    sm: false, // mobile
    '2sm': false,
    md: false,
    lg: false, // pad
    xl: false,
    '2xl': false,
    '3xl': false
  })
  // 堆疊小於 (範例 寬度為 700 時，xs,2xs,sm 亮燈)
  const platformMin = reactive({
    xs: false,
    '2xs': false,
    sm: false, // mobile
    '2sm': false,
    md: false,
    lg: false, // pad
    xl: false,
    '2xl': false,
    '3xl': false
  })
  // 堆疊大於 (範例 寬度為 1600 時，xl,2xl,3sl 亮燈)
  const platformMax = reactive({
    xs: false,
    '2xs': false,
    sm: false, // mobile
    '2sm': false,
    md: false,
    lg: false, // pad
    xl: false,
    '2xl': false,
    '3xl': false
  })

  const isHorizontal = computed(()=>windowWidth.value >  windowHeight.value)

  const setScreenEvent =() =>{
    const documentWidthData = Math.max(
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.clientWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth
    )
    const documentHeightData = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    )
    windowLastTimeScrollTop.value = windowScrollTop.value
    screenWidth.value = screen.width
    screenHeight.value = screen.height
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
    documentWidth.value = documentWidthData
    documentHeight.value = documentHeightData
    windowScrollTop.value = window.scrollY
    let platformData = screenControls.handleResize(platform, window.innerWidth)
    if(platformData[1] !== platformIndex){
      platformIndex.value = platformData[1]
      for (let key of Object.keys(platform)) {
        platform[key] = key === platformData[0]
      }
      for (let key in Object.keys(platformMin)) {
        platformMin[Object.keys(platformMin)[key]] = key < platformData[1]
        platformMax[Object.keys(platformMin)[key]] = key >= platformData[3]
      }
    }
  }

  function setScreenScrollEvent (){
    windowLastTimeScrollTop.value = windowScrollTop.value
    windowScrollTop.value = window.scrollY
  }

  function setDocumentHeight (){
    documentHeight.value = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    )
  }

  return {
    setScreenEvent,
    setScreenScrollEvent,
    setDocumentHeight,
    screenWidth,
    screenHeight,
    windowWidth,
    windowHeight,
    documentWidth,
    documentHeight,
    windowScrollTop,
    windowScrollTop2: computed(()=> windowScrollTop.value),
    windowLastTimeScrollTop,
    platform,
    platformMin,
    platformMax,
    isHorizontal, // 是橫擺狀態
    // ...toRefs(platform),
    documentMaxScrollTop: computed(()=> documentHeight.value - windowHeight.value),
  }
})
