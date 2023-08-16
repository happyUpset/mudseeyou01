export const useScreenResize = (handleScrollFunc: any) => {
  const state = reactive({
    resizeSto: null,
    resizeStoTime: 0,
    detectResize: true,
  })
  const { delay,setUseSTO,setDelayLength } = useDelay()
  setUseSTO(true)
  setDelayLength(state.resizeStoTime)

  const readyWindow = () => {
    if (state.detectResize) {
      window.addEventListener('resize', handleResizeSto)
    }
  }
  const beforeDestroyWindow = () => {
    if (state.detectResize) {
      window.removeEventListener('resize', handleResizeSto)
    }
  }
  const handleResizeSto = () => {
    delay(()=>{
      handleResize()
    })
  }
  let handleResize = () => {
    handleScrollFunc()
  }

  onMounted(()=>{
    handleResize()
    readyWindow()
  })

  onUnmounted(()=>{
    beforeDestroyWindow()
  })

  return {
    handleResize,
    ...toRefs(state)
  }
}
