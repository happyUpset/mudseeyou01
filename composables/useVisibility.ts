/**
 * 使用螢幕焦點 //、游標焦點 瀏覽器進出頁面監聽
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/blur_event
 */
export const useVisibility = (handleScrollFunc: any) => {
  const state = reactive({
    visibilityStoTime: 500,
    detectVisibility: true,
    returnData: '' // blur, focus
  })
  const { delay,setUseSTO,setDelayLength } = useDelay()
  // setUseSTO(true)
  // setDelayLength(state.visibilityStoTime)

  const readyWindow = () => {
    if (state.detectVisibility) {
      // document.addEventListener('visibilitychange', handleVisibilitySto)
      //state -> visible, hidden, prerender, unloaded
      window.addEventListener('blur', (event) => handleVisibilitySto(event))
      window.addEventListener('focus', (event) => handleVisibilitySto(event))
    }
  }
  const beforeDestroyWindow = () => {
    if (state.detectVisibility) {
      // document.removeEventListener('visibilitychange', handleVisibilitySto)
      window.removeEventListener('blur', (event) => handleVisibilitySto(event))
      window.removeEventListener('focus', (event) => handleVisibilitySto(event))
    }
  }
  const handleVisibilitySto = (event :any) => {
    delay(()=>{
      handleVisibility(event.type)
    })
  }
  let handleVisibility = (type : string) => {
    // state -> blur, focus
    state.returnData = type
    handleScrollFunc(type)
  }

  onMounted(()=>{
    readyWindow()
  })

  onUnmounted(()=>{
    beforeDestroyWindow()
  })

  return {
    handleVisibility,
    ...toRefs(state)
  }
}
