import {GET_TABLES} from "~/api/base";
import {storeWeb} from "~/store/web";
import {findIdWithTime, findTimeWithId, getTimeWithId} from "~/const/duration";
import { DateTime } from "luxon";
import _ from 'lodash'

export const needTables = (returnTableWork = ()=>{}) => {

  // data
  const options = storeWeb()
  const date = ref(DateTime.now().toFormat('yyyy-MM-dd'))
  const updateTableCount = ref(0)

  const hasTables = computed(()=>options.tables.length !== 0)


  function setPeriodsDay(periods) {
    let groupDate = _.groupBy(periods,'date')
    // console.log('groupDate',groupDate)
    let newPeriods = []
    Object.keys(groupDate).map((date,key) => {
      if(key === 0){
        newPeriods = groupDate[date]
      } else {
        groupDate[date].forEach(period => {
          newPeriods.push({
            date: period.date,
            period: getTimeWithId(findIdWithTime(period.period) + 96),
            is_used: period.is_used
          })
        })
      }
    })
    // console.log('newPeriods',newPeriods)
    return newPeriods
  }
  /**
   * 建立時間序於桌別
   * @param tables
   */
  function setTimesTables (tables){
    let periods = setPeriodsDay(tables[0].periods)
    let timePicks = []
    let minTimes = 0
    let maxTimes = 88
    let startIndex = findIdWithTime(DateTime.now().plus({minute: 1}).toFormat('HH:mm'))
    if(DateTime.fromFormat(date.value,'yyyy-MM-dd').startOf('day').diff(DateTime.now().startOf('day'),'days').days || startIndex < minTimes){
      startIndex = minTimes
    }
    let startPeriodsIndex = periods.findIndex(period => period.period === getTimeWithId(startIndex))
    let lastPeriodsIndex = findIdWithTime(periods.slice(-1)[0].period)
    let counts = 0

    for(let i = startIndex;i <= lastPeriodsIndex;i++){
      timePicks.push({
        name: getTimeWithId(i),
        id: i,
        value: `${i}`,
        disabled: !makeSureToIncludeAtLeastOneHour(tables,startPeriodsIndex + counts)
      })
      counts++
    }
    // 固定再家一項： ....,11:45] + [12:00] 之後會再被濾掉
    // timePicks.push({
    //   name: getTimeWithId(lastPeriodsIndex + 1),
    //   id: startPeriodsIndex + counts,
    //   value: `${startPeriodsIndex + counts}`,
    //   disabled: !makeSureToIncludeAtLeastOneHour(tables,startPeriodsIndex + counts)
    // })
    options.setTimeList(timePicks)
  }

  /**
   * 確保至少包含一小時
   */
  function makeSureToIncludeAtLeastOneHour(tables,startTimeIndex){
    return tables.some(table => {
      return table.periods.some((period) => {
        return table.periods[startTimeIndex + 3] &&
          !period.is_used &&
          !table.periods[startTimeIndex + 1].is_used &&
          !table.periods[startTimeIndex + 2].is_used &&
          !table.periods[startTimeIndex + 3].is_used
      })
    })
  }


  async function updateTables(){
    options.set_is_tables_getting(true)
    const {data, pending, error, refresh} = await GET_TABLES(date.value)
    if (error.value === null) {
      options.set_tables(data.value.data)
      setTimesTables(data.value.data)
      returnTableWork(options)
    }
    options.set_is_tables_getting(false)
  }
  async function init(){
    if(!options.isTablesGetting && !hasTables.value) {
      await updateTables()
    }
  }

  watch(()=>updateTableCount.value,async ()=>{
    await updateTables()
  })

  // onMounted(async ()=>{
  //   await init()
  // })

  return {
    ntf: options,
    updateTableCount,
    tableDate: date,
    // tables: options.tables,
    // timeList: options.timeList,
    ...toRefs(options),
    updateTables,
    init,
  }
}
