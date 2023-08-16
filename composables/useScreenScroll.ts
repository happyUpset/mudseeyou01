export const useScreenScroll = (handleScrollFunc: any) => {
  const state = reactive({
    scrollSto: null,
    scrollStoTime: 500,
    detectScroll: true,
  })

  const readyWindow = () => {
    if (state.detectScroll) {
      window.addEventListener('scroll', handleScrollSto)
    }
  }
  const beforeDestroyWindow = () => {
    if (state.detectScroll) {
      window.removeEventListener('scroll', handleScrollSto)
    }
  }
  const handleScrollSto = () => {
    handleScroll()
  }
  let handleScroll = () => {
    handleScrollFunc()
  }

  onMounted(()=>{
    handleScroll()
    readyWindow()
  })

  onUnmounted(()=>{
    beforeDestroyWindow()
  })

  return {
    handleScroll,
    ...toRefs(state)
  }
}
