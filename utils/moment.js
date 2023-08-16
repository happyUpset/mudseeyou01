import { DateTime } from 'luxon'
import { AT_FORMAT, DATE_FORMAT, TIME_FORMAT } from '~/const/time'


/**
 * 時間內的頻率有多少個
 * @param startMoment
 * @param endMoment
 * @param frequencies
 * @param startFormat
 * @param endFormat
 * @return {number}
 */
export function rangePeriodsDivedFrequencies(startMoment,endMoment,frequencies,startFormat = AT_FORMAT,endFormat = AT_FORMAT){
  let counts = 0
  // 起始日期
  let firstDate = DateTime.fromFormat(startMoment, startFormat)
  let firstDateWeekday = firstDate.weekday
  // // 結束日期
  let endDate = DateTime.fromFormat(endMoment, endFormat)
  let endDateWeekday = endDate.weekday
  // 跨過週數
  let mainWeeks = endDate.weekNumber - firstDate.weekNumber
  let isSameWeek = mainWeeks === 0
  // 開始日之週末日
  let firstDateWeekend = isSameWeek ? endDate : DateTime.fromFormat(startMoment, startFormat).set({weekday: 7})
  // 結束日之週始日
  let endDateWeekstart = isSameWeek ? null : DateTime.fromFormat(endMoment, endFormat).set({weekday: 1})
  let headFrequenciesLength = frequencies.filter(frequency => frequency.weekday >= firstDateWeekday && frequency.weekday <= firstDateWeekend).length
  let footFrequenciesLength = 0
  if(endDateWeekstart){
    footFrequenciesLength = frequencies.filter(frequency => frequency.weekday <= endDateWeekday).length
  }
  let mainWeekLength = mainWeeks > 0 ? mainWeeks - 1 : 0

  counts += headFrequenciesLength
  counts += mainWeekLength * frequencies.length
  counts += footFrequenciesLength
  // console.log(endDate.isoWeek(),firstDate.isoWeek())
  // console.log(endDate.toString(),firstDateWeekend.toString())
  // console.log('跨州',mainWeeks,isSameWeek,endDate.diff(firstDateWeekend,'day'))
  // console.log('firstDateWeekend',firstDateWeekend,'endDateWeekstart',endDateWeekstart)
  // console.log('headFrequenciesLength',headFrequenciesLength,'footFrequenciesLength',footFrequenciesLength)
  // console.log('endDate === firstDate',endDate,firstDate,frequencies.length)
  // console.log('mainWeekLength',mainWeekLength)
  return counts
  //   nextStartWeekDay = DateTime.fromFormat(startMoment, startFormat).plus({week : 1}).set({weekday: 1})
}
