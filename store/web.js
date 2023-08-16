import { ref } from "vue";
import { defineStore } from 'pinia'
import _ from "lodash";
import {isEmpty} from "~/utils/types";
import {DateTime} from "luxon";

export const storeWeb = defineStore('web', ()=>{
  // points types options
  const nfs = reactive({list: []})
  const isOffersGetting = ref(false)

  const nts = reactive({list: []})
  const isTablesGetting = ref(false)

  const timeList = ref([])


  function set_offers(list) {
    if(isEmpty(list)){
      nfs.list = []
    }else {
      nfs.list = list
    }
  }
  function set_is_offers_getting(boolean) {
    isOffersGetting.value = boolean
  }

  const offers = computed(()=>{
    return nfs.list.map(item => {
      item.allowsTime = item.rules.period.map(periodItem => {
        return [periodItem * 4,periodItem * 4 + 1,periodItem * 4 + 2,periodItem * 4 + 3]
      }).flat()
      item.allowsType = item.rules.type
      item.allowsWeekdays = item.rules.weekdays.map((weekdayName)=>{
        return parseInt(DateTime.fromFormat(weekdayName,'cccc').toFormat('c'))
      })
      return item
    })
  })

  function set_tables(list) {
    if(isEmpty(list)){
      nts.list = []
    }else {
      nts.list = list
    }
  }
  function set_is_tables_getting(boolean) {
    isTablesGetting.value = boolean
  }

  const tables = computed(()=>{
    let absolutes = []
    let lastSortKey = _.maxBy(nts.list,'sortable')
    if(lastSortKey){
      for(let i = 1; i <= lastSortKey.sortable; i++){
        const obj = nts.list.find(item => item.sortable === i);
        if (obj) {
          absolutes.push(obj);
        } else {
          absolutes.push(null);
        }
      }
      return absolutes
    }
    return []
  })

  function setTimeList(list){
    timeList.value = list
  }

  return{
    nfs,
    offers,
    isOffersGetting,
    set_offers,
    set_is_offers_getting,
    nts,
    tables,
    isTablesGetting,
    set_tables,
    set_is_tables_getting,
    timeList,
    setTimeList
  }
})
