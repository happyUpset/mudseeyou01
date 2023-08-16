
export const times = time()
/**
 *
 * @param time = 'HH:mm'
 * @returns {{name: string, disabled: boolean, id: *}}
 */
export function getTimeWithTime(time){
  let data = time.split(':')
  let id = parseInt(data[0]) * 4 + Math.ceil((parseInt(data[1]) + 1)/15)

  return times.find(time => time.id === id)
}

// 尋找最近的時間點，需大於
export function findTimeWithId(time){
  let data = time.split(':')
  let id = parseInt(data[0]) * 4 + Math.ceil((parseInt(data[1]) + 1)/15)

  return times.find(time => time.id === id)
}

// 尋找最近的時間點，需大於
export function findIdWithTime(time){
  let data = time.split(':')
  return  parseInt(data[0]) * 4 + Math.ceil((parseInt(data[1]))/15)
}

// 尋找最近的時間點，需大於
export function getTimeWithId(ids){
  let id = parseInt(ids)
  let hour = Math.floor(id / 4)
  hour = hour < 10 ? '0'+hour : hour
  let min = (id % 4) * 15
  min = min < 10 ? '0'+min : min
  return `${hour}:${min}`
}

// 超過 24:00 改為 （隔日）00:00起
export function nextDayWithTime(time){
  let data = time.split(':')
  if(parseInt(data[0]) >= 24){
    let hour = (parseInt(data[0]) - 24)
    hour = hour < 10 ? '0'+hour : hour
    let min = parseInt(data[1])
    min = min < 10 ? '0'+min : min
    return `（隔日）${hour}:${min}`
  }else {
    return time
  }
}



export function time () {
  let perPick = 192 //120 // 24 * 4  (15min/per) + 24
  let timePicks = []
  for(let i = 0;i < perPick;i++){
    let hour = Math.floor(i / 4)
    hour = hour < 10 ? '0'+hour : hour
    let min = (i % 4) * 15
    min = min < 10 ? '0'+min : min
    timePicks[i] = {
      name: `${hour}:${min}`,
      id: i,
      value: `${i}`,
      disabled: false
    }
  }
  return timePicks
}
