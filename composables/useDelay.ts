export const useDelay = () => {

  // data
  const length = ref(1000)
  const sto = ref(setTimeout(()=>{},0))
  const isSto = ref(true)

  // methods
  const setDelayLength = (newLength: number) : void => {
    length.value = newLength
  }
  const setUseSTO = (boolean: boolean) : void => {
    isSto.value = boolean
  }

  const delay = (callback: Function)  => {
    if (isSto.value) {
      clearTimeout(sto.value)
      sto.value = setTimeout(() => {
        callback()
      }, length.value)
      return sto.value
    }else {
      requestAnimationFrame(()=>{
        callback()
      })
    }
  }

  return {
    delay,
    setDelayLength,
    setUseSTO,
  }
}
