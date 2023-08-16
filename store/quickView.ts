import {defineStore} from 'pinia'

export const storeQuickView = defineStore('quickView', ()=> {

  const info = ref(null)
  const isLoading = ref(false)
  const lastLotteryNumbers = ref([])
  // 每次廣播時的計算器
  const broadcastCounts = ref(0)
  // 最新一期 期號
  const lastLotteryPeriod = ref('')
  // const lastLotteryPeriod = ref('111062245')
  // 是否開始開獎
  const isLotteryTime = ref(false)
  // 是否開始開獎在其他頁面（目前只用analysis）
  const isOpenLotteryTimeInPage = ref(false)
  // const isLotteryTime = ref(true)
  // 最新開獎資訊
  const broadcastData = ref([])
  // const broadcastData = ref([
  //   {
  //     "bingo": {
  //       "id": 361752,
  //       "period": "111062245",
  //       "lottery_time": "2022-11-03 17:35:00",
  //       "odd_or_even": "小單",
  //       "big_or_small": null,
  //       "super_number": 33,
  //       "remaining_number_count": 3,
  //       "created_at": "2022-11-03 00:01:02",
  //       "status_id": 2
  //     },
  //     "numbers": {
  //       "0": "39",
  //       "1": "73",
  //       "2": "32",
  //       "3": "76",
  //       "4": "14",
  //       "5": "75",
  //       "6": "11",
  //       "7": "41",
  //       "8": "65",
  //       "9": "12",
  //       "11": "55",
  //       "12": "25",
  //       "13": "03",
  //       "14": "69",
  //       "15": "34",
  //       "16": "72",
  //       "17": "45",
  //       "18": "40",
  //       "19": "74",
  //       "20": "33"
  //     }
  //   }
  // ])


  function set_broadcast_counts(){
    broadcastCounts.value++
  }
  function set_board(infoData){
    info.value = JSON.parse(JSON.stringify(infoData))
    // console.log('set_board',info.value)
  }
  function set_first_loading(isLoadingData :boolean){
    isLoading.value = isLoadingData
    // console.log('isLoading',isLoading.value)
  }
  function set_last_lottery_numbers(lastLotteryNumbersData :number[]){
    lastLotteryNumbers.value = lastLotteryNumbersData
    // console.log('lastLotteryNumbers',lastLotteryNumbers.value)
  }
  function set_last_lottery_period(lastLotteryPeriodData :string){
    lastLotteryPeriod.value = lastLotteryPeriodData
    // console.log('lastLotteryPeriod',lastLotteryPeriod.value)
  }
  function set_is_lottery_time(boolean :boolean){
    isLotteryTime.value = boolean
    // console.log('isLotteryTime',isLotteryTime.value)
  }
  function set_is_lottery_time_in_page(boolean :boolean){
    isOpenLotteryTimeInPage.value = boolean
  }
  function set_broadcast_data(lastBroadcast :[]){
    broadcastData.value = lastBroadcast
    // console.log('broadcastData',broadcastData.value)
  }

  return {
    info,
    isLoading,
    lastLotteryNumbers,
    lastLotteryPeriod,
    isLotteryTime,
    isOpenLotteryTimeInPage,
    broadcastData,
    broadcastCounts,
    hasInfo: computed(()=>!(info.value === null  || info.value.length === 0)),
    set_board,
    set_first_loading,
    set_last_lottery_numbers,
    set_last_lottery_period,
    set_is_lottery_time,
    set_is_lottery_time_in_page,
    set_broadcast_data,
    set_broadcast_counts
  }
})
