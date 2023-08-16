/**
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
 */
export const usePosition = () => {

  function getPositionTop(id : string): number | null{
    let ele = document.getElementById(id)
    if(ele)
      return Math.round(ele.getBoundingClientRect().top + window.scrollY)
    return null
  }

  return {
    getPositionTop,
  }
}
