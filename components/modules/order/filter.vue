<template>
  <div class="contents">
    <div class="pt-20 flex text-left text-6 font-bold">
      <div class="flex-1-auto">
        <div class="">預約時間：</div>
        <div class="mt-6">{{ pickDateRange }}</div>
      </div>
      <div class="flex-0-auto flex items-center">
        <div class="btn-base out-teal tiny" @click="setEditModal(true)">調整時段</div>
      </div>
    </div>

    <ShellBaseModal
      md
      name="filerModal"
      @setClose="closeFilter">
      <template #default="{close}">
        <ShellSlotModal
          title="預約條件"
          close-btn
          :close="close"
          :cancelShow="false"
          :confirmShow="false">
          <template #item="{item}">
            <div class="text-orange" v-if="auth.hasUsingOffersNow">
              方案會員免費時段訂單尚在進行中，您的下一筆訂單將會進行收費。
            </div>
            <div class="my-30 mx-15">
              <InputSelect
                label="預約日期"
                class="w-1/1 my-24"
                idc="date"
                label-css="flex-100-ps text-5 text-left"
                :options="dateRanges"
                :warning="false"
                input-css="w-1/1 border-0 bg-gray-1"
                :default-option="tempForms.date"
                @changeValue="changeValueDate"
                placeholder="選擇預約日期"
                warning-message="請選擇要預約的日期"
              >
                <template #warring-message>
                  <div
                    class="text-orange text-left"
                    v-if="type3BeyondTheDate">
                    <div class="">會員提醒！</div>
                    <div class="">{{tempForms.date}}，不適用平日暢打方案</div>
                  </div>
                </template>
              </InputSelect>
              <div class="flex flex-wrap">
                <label
                  for="startTime"
                  class="flex-100-ps text-5 text-left mb-12">
                  選擇時段
                  <span class="border-gray-4 text-gray-4 border text-small rounded-md px-3 py-2 ml-6" v-if="tempForms.startTime">{{ getTimeWithId(tempForms.startTime) }}</span>
                </label>
                <ShellExpandable
                  v-if="timeListToStart"
                  class="flex-0-1/1"
                  min-height="120"
                  auto-height
                  :change-counts="timeListToStart.length"
                  :is-expanded="false"
                  :has-btn="true"
                >
                  <template #expandableText>
                    <InputCheckBoxCards
                      class="w-1/1 "
                      idc="startTime"
                      :list="timeListToStart"
                      :warning="false"
                      :data-pick="{
                        key: 'value',
                        name: 'name'
                      }"
                      :default-option="`${tempForms.startTime}`"
                      disabled-plus-title="(已額滿)"
                      @changeValue="changeValue"
                      warning-message="請選擇要預約的開始時間"
                    >
                    </InputCheckBoxCards>
                  </template>
                </ShellExpandable>
                <div
                  class="text-orange text-left"
                  v-if="type3BeyondTheStartTime">
                  <div class="">會員提醒！</div>
                  <div class="">{{ getTimeWithId(tempForms.startTime) }}，不適用平日暢打方案</div>
                </div>
              </div>
              <InputSelect
                label="時數"
                class="w-1/1 mt-12 mb-24"
                idc="duration"
                label-css="flex-100-ps text-5 text-left"
                :options="duration"
                :warning="false"
                input-css="w-1/1 border-0 bg-gray-1"
                :default-option="tempForms.duration"
                @changeValue="changeValue"
                placeholder="選擇時數"
                warning-message="請選擇要預約的開始時間">
              </InputSelect>
              <div class="mt-6">
                <div class="btn-base big major" @click="useTempForms">套用</div>
              </div>
            </div>
          </template>
        </ShellSlotModal>
      </template>
    </ShellBaseModal>
  </div>
</template>
<script setup>

import {getTimeWithId, nextDayWithTime, times} from "~/const/duration";
import {storeAuth} from "~/store/auth";
import _ from "lodash";
import {DateTime} from "luxon";
import {needOffers} from "~/composables/needOffers";
import {storeModal} from "~/store/modal";

const props = defineProps({
  form:{
    type: Object
  },
  title:{
    type: String,
    default: '選擇預約桌號'
  },

})

const modal = storeModal()
const modalShow = ref(false)
const tempForms = reactive({
  duration: '',
  startTime: '',
  date: ''
})
const offersData = ref(null)
const auth = storeAuth()
const {setDelayLength, delay} = useDelay()

const isBookingTypeOffer = computed(()=> !auth.hasUsingOffersNow && !!offersData.value && offersData.value.offers && bookings.form.type === '3')

//超出方案的預約狀況 星期
const type3BeyondTheDate = computed(()=>{
  if(isBookingTypeOffer.value && !!offersData.value && offersData.value.offers && offersData.value.offers.length > 0){
    let weekday = DateTime.fromFormat(tempForms.date,'yyyy-MM-dd').weekday
    return !offersData.value.offers[0].allowsWeekdays.some(allowWeekday => allowWeekday === weekday)
  }
  return false
})

//超出方案的預約狀況 開始時間
const type3BeyondTheStartTime = computed(()=>{
  if(isBookingTypeOffer.value && !!offersData.value && offersData.value.offers && offersData.value.offers.length > 0) {
    return !offersData.value.offers[0].allowsTime.some((allowT,key) => {
      return offersData.value.offers[0].allowsTime[key] === parseInt(tempForms.startTime) &&
        (offersData.value.offers[0].allowsTime[key + 3] && offersData.value.offers[0].allowsTime[key + 3] === parseInt(tempForms.startTime) + 3);
    })
  }
  return false
})


const pickDateRange = computed(()=>{
  let date = bookings.form.date
  let start = times.find(time => time.value === bookings.form.startTime )?.name ?? ''
  let end = nextDayWithTime(getTimeWithId(parseInt(bookings.form.startTime) + (bookings.form.duration*4)))
  return `${date}   ${start} ~ ${end}`
})

const dateRanges = computed(()=>{
  return _.fill(Array(8),null).map((item,key)=>{
    return {
      id: DateTime.now().plus({days: key}).toFormat('yyyy-MM-dd'),
      name: DateTime.now().plus({days: key}).setLocale('zh-tw').toFormat('yyyy-MM-dd (cccc)'),
    }
  })
})

// 最後四筆為開始日期無法使用的，所以將其剪去
const timeListToStart = computed(()=>{
  let id96Index = timeList.value.findIndex(item => item.id === 96)
  return timeList.value.slice(0, id96Index);
  // if(timeList.value.length > 4)
  //   return timeList.value.slice(0, timeList.value.length - 4);
  // else
  //   return []
})

const duration = computed(()=>{
  if(tempForms.startTime !== ''){
    let counts = 0
    let periods = ntf.nts.list[0]?.periods ?? []
    let periodsMax = 120 //periods.length
    if(isType3Offers.value && offersData.value.offers && offersData.value.offers.length > 0){
      // 最多兩小時、最少一小時
      periodsMax = _.max(offersData.value.offers[0].allowsTime) + 1
    }
    let startTime = getTimeWithId(tempForms.startTime)
    let startPeriodsIndex = periods.findIndex(period => period.period === startTime)
    let data = ntf.nts.list.map((table,key) => {
      // 算出長度
      let afterUseIndex = table.periods.findIndex((period,periodKey) => {
        return periodKey >= startPeriodsIndex && period.is_used
      })
      if(afterUseIndex !== -1){
        // console.log('afterUseIndex ,startPeriodsIndex',afterUseIndex , startPeriodsIndex)
        return (afterUseIndex - startPeriodsIndex) / 4
      }else{
        // console.log('periodsMax ,startPeriodsIndex',periodsMax , startPeriodsIndex)
        return (periodsMax - (startPeriodsIndex)) / 4
      }
    })
    // console.log(data)
    if(isType3Offers.value && offersData.value.offers && offersData.value.offers.length > 0){
      let allowsTimeCurrentIndex = offersData.value.offers[0].allowsTime.findIndex(allowT => allowT === parseInt(tempForms.startTime))
      if(allowsTimeCurrentIndex !== -1){
        if(offersData.value.offers[0].allowsTime[allowsTimeCurrentIndex + 3])// 直接跑兩次
          counts = offersData.value.offers[0].allowsTime[allowsTimeCurrentIndex + 3 ] - parseInt(tempForms.startTime) === 3 ? 1 : counts
        if(offersData.value.offers[0].allowsTime[allowsTimeCurrentIndex + 7])
          counts = offersData.value.offers[0].allowsTime[allowsTimeCurrentIndex + 7 ] - parseInt(tempForms.startTime) === 7 ? 2 : counts
      }
    }else{
      counts = Math.floor(_.max(data)) > 6 ? 6 : Math.floor(_.max(data))
    }
    return _.fill(Array(counts),null).map((item,key)=>{
      let has = data.filter(hour => hour >= key + 1)
      let name = has.length === 0 ? `(已額滿)` : `(尚有${has.length}桌)`
      return {
        name: `${key + 1}小時${name}`,
        id: key + 1,
        disabled: has.length === 0
      }
    })
  }
})

async function closeFilter(){
  modal.add_base_modals('filterModal')
  if(tempForms.date !== bookings.form.date){
    tableDate.value = bookings.form.date
    await updateTables()
  }
}
function setEditModal(boolean) {
  modal.set_base_modals('filterModal',boolean)
  findNewStartTime()
  tempForms.date = bookings.form.date
  tempForms.duration = bookings.form.duration
  tempForms.startTime = bookings.form.startTime
}

async function useTempForms() {
  modal.remove_base_modals('filterModal')
  if(tempChange.value){
    bookings.set_form_base('tableNumber',[])
    bookings.set_form_base('date',tempForms.date)
    bookings.set_form_base('duration',tempForms.duration)
    bookings.set_form_base('startTime',tempForms.startTime)
    setCurrentTable(ntf.tables)
  }
}

//如果有選擇項目而找不到預設時間時，選擇第一項選擇項目
function findNewStartTime(){
  let index = timeListToStart.value.findIndex(item => item.value === bookings.form.startTime)
  if(index === -1){
    bookings.set_form_base('startTime',timeListToStart.value[0]?.value ?? 28)
  }
}

async function changeValueDate({data,id}) {
  tempForms[id] = data
  tableDate.value = tempForms.date
  await delay(()=>{
    updateTables()
  })
}

function changeValue({data,id}) {
  if(id === 'startTime'){
    tempForms[id] = data
    requestAnimationFrame(()=>{
      tempForms.duration = duration.value[0].id
    })
  }else if(id === 'duration'){
    tempForms[id] = data
  }
}

onMounted(async ()=>{
  if(bookings.form.type === '3'){
    offersData.value = needOffers()
    offersData.value.init()
  }
  if(!bookings.legalBookings){
    bookings.default_form_orders()
  }
  tableDate.value =  bookings.form.date
  tempForms.date = bookings.form.date
  tempForms.duration = bookings.form.duration
  tempForms.startTime = bookings.form.startTime
  await updateTables()
  setCurrentTable(ntf.tables)
  setDelayLength(400)
  if(!bookings.firstMain){
    await setEditModal(true)
    bookings.set_first_main()
  }
})
</script>
