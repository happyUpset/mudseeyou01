/**
 * 畫面暫離控制 需要 useVisibility
 * function(return true暫離過久 false觸發暫離事件 null暫離不過久)
 */
import { DateTime } from 'luxon'
export const useLeaveWork = (handleLeaveWorkFunc: Function) => {
  const state = reactive({
    // 最小重整時間 (秒)
    minResetSecond: 1,
    // 會後讀取時間
    lastTime: DateTime.now(),
    lastTimeCounts: 0,
    returnData: false,
    detectVisibility: true,
  })

  // console.log('start useLeaveWork')
  // useVisibility(handleVisibilityFunc)

  function setMinSecond(second: number){
    state.minResetSecond = second
  }

  function handleVisibilityFunc (status : string)  {
    // console.log('handleVisibilityFunc')
    // if (document.hidden) {
    if (status === 'blur') {
      // 時間計算
      state.lastTime = DateTime.now()
      state.returnData = false
      handleLeaveWorkFunc(false)
    } else{
      state.lastTimeCounts = DateTime.now().diff(state.lastTime, 'seconds').seconds
      if(state.lastTimeCounts >= state.minResetSecond){
        // 時間外
        state.returnData = true
        handleLeaveWorkFunc(true)
      }else {
        // 時間內
        state.returnData = null
        handleLeaveWorkFunc(null)
      }
    }
  }

  return {
    setMinSecond,
    handleVisibilityFunc,
    ...toRefs(state)
  }
}
