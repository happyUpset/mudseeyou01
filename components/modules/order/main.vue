<template>
  <div class="frame" v-if="bookings.form.type !== ''">
    <ModulesTopBack :link="backLink" time/>
    <div class="mx-15">
      <div class="mx-auto" :class="counter?'max-w-screen-s-sm':'max-w-screen-s-2sm'">
        <ModulesOrderHead
          :counter="counter"
          :type="bookings.form.type"/>
        <div class="pt-20 flex text-left text-6 font-bold">
          <div class="flex-1-auto">
            <div class="">預約時間：</div>
            <div class="mt-6">{{ pickDateRange }}</div>
          </div>
          <div class="flex-0-auto flex items-center">
            <div class="btn-base out-teal tiny" @click="setEditModal(true)">調整時段</div>
          </div>
        </div>
        <div class="grid grid-cols-12 flex-wrap mt-16" v-if="currentTable === null || currentTable.length === 0">
          <div class="col-span-3 my-6" v-for="(key) in 12" :class="'___'+key">
            <div class="h-[70px]">
              <ThumbBox class="h-[50px] mx-10"/>
              <ThumbBox class="h-[16px] mx-10"/>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 flex-wrap mt-16" v-else>
          <div class="col-span-3 my-6" v-for="(table,key) in currentTable" :class="'___'+key">
            <InputCheckBox
              v-if="table && !table.prepare"
              :icon-title="table.id"
              :title="`$${typePrice(table)}`"
              :value="table.id"
              :is-pick="findIsPickTableNumber(table)"
              @onPick="pickTableNumber(table)"
              :disabled="tableDisable(table,bookings)">
              <template #icon="{value}">
                <div class="absolute top-3 left-3" v-if="table.type === 'teaching'">
                  <div class="text-7 text-small">教學</div>
                </div>
              </template>
            </InputCheckBox>
          </div>
        </div>
        <div class="pt-12 text-red" v-if="blur && !!warning">{{ warning }}</div>
        <div class="pt-15 flex">
          <div class="flex-1-auto flex justify-end">
            <div class="px-30 text-center">
              <NuxtIcon2 name="counter" class="w-[57px] h-50"/>
              <div class="mt-4">櫃檯</div>
            </div>
          </div>
        </div>
        <div class="pt-15 flex">
          <div class="flex-1-auto text-6 leading-[3rem] text-left">
            <div class="bg-[#fff3cd] rounded-lg border border-[#ffe69c] px-12 py-12 text-[#664d03]">
              <div class="">8-11 桌為教學優先桌（臨打若有租用發球機需求可選擇 9、10號桌）</div>
              <!--            <div class="">8,11 桌為教學優先桌</div>-->
              <!--            <div class="items-center">-->
              <!--              9,10 桌附發球機-->
              <!--            </div>-->
              <div class="">
                5-7 桌為國際比賽規格認證桌
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShellNotification
        :show="bookings.form.type ==='3' && !isType3Offers && offersWarningShow"
        color="text-orange"
        bg="border border-orange bg-orange-lightest opacity-80"
        title="會員提醒"
        class="mx-auto max-w-screen-s-sm"
        :text="auth.hasUsingOffersNow?`方案會員免費時段訂單尚在進行中，您的下一筆訂單將會進行收費。`:`${bookings.form.date} ${getTimeWithId(bookings.form.startTime)} ，不適用平日暢打方案`"
        @setClose="setWarning(false)"
      />
    </div>
    <LazyLayoutsUnderBtnPanel
      :warning="!!warning"
      :title="btnName"
      :link-name="confirmName"
      class="fixed bottom-0 w-1/1 "
      :class="counter?'':'max-w-screen-s-2sm'"
      btnable
      @input="confirm"
      @setBlur="setBlur">
    </LazyLayoutsUnderBtnPanel>


    <ShellBaseModal
      md
      name="filterModal"
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

    <ShellBaseModal
      md
      name="alertModal">
      <template #default="{close}">
        <ShellSlotModal
          title=""
          close-btn
          :close="close"
          @confirmBtn="alertConfirm">
          <template #item="{item}">
            <div class="mt-72">
              <div class="text-4">8，11 桌為<span class="text-teal">教學桌</span></div>
              <div class="text-4">您是否確定要預約？</div>
            </div>
          </template>
        </ShellSlotModal>
      </template>
    </ShellBaseModal>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
import {storeAuth} from "~/store/auth";
import {needOffers} from "@/composables/needOffers";
import {needTables} from "@/composables/needTables";
import {isEmpty} from "~/utils/types";
import {getTimeWithId, times, nextDayWithTime} from "~/const/duration";
import _ from 'lodash'
import {DateTime} from "luxon";
import {storeForm} from "~/store/form";
import {storeModal} from "~/store/modal";

const props = defineProps({
  counter:{
    type: Boolean,
    default: false
  },
  backLink:{
    type: Object
  },
  redirectName:{
    type: String
  },
  confirmName:{
    type: String
  },
})

const blur = ref(false)
const offersWarningShow = ref(false)
const offersData = ref(null)
const currentTable = ref(null)
const tempForms = reactive({
  duration: '',
  startTime: '',
  date: ''
})

const { currency } = useCurrency()
const {setDelayLength, delay} = useDelay()
const bookings = storeForm()
const modal = storeModal()
const auth = storeAuth()
const $router = useRouter()
const notification = useNotification()
const {ntf,timeList,tables,tableDate,updateTables} = needTables(returnTableWork)


const dateRanges = computed(()=>{
  return _.fill(Array(8),null).map((item,key)=>{
    return {
      id: DateTime.now().plus({days: key}).toFormat('yyyy-MM-dd'),
      name: DateTime.now().plus({days: key}).setLocale('zh-tw').toFormat('yyyy-MM-dd (cccc)'),
    }
  })
})

const warning = computed(()=>{
  if(bookings.form.tableNumber.length === 0){
    return '請選擇一個預約桌號'
  }else if(hasTeachingTableButNotFullNormal.value){
    return '請優先選擇 1 ~ 7 ，9，10 桌'
  }
  return false
})

const hasTeachingTableButNotFullNormal = computed(()=>{
  if(notType2UseTheirTable.value && currentTable.value){
    return currentTable.value.some((table)=>{
      if(table){
        if(table.type !== 'teaching'){
          if(!table.is_used){
            return !bookings.form.tableNumber.find(pickTable => pickTable.id === table.id)
          }else
            return false
        }
      }
      return false
    })
  }
  return false
})

//非教學者使用教學桌
const notType2UseTheirTable = computed(()=>{
  if(bookings.form.type !== '2'){
    return bookings.form.tableNumber.some(table => {
      //9,10桌 後門
     return table.type === 'teaching' && !(table.id === 9 || table.id === 10)
    })
  }
  return false
})

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


//是方案的購買者
const isType3Offers = computed(()=>{
  return isBookingTypeOffer.value && !type3BeyondTheDate.value && !type3BeyondTheStartTime.value
})


const btnName = computed(()=>{
  if(bookings.form.tableNumber.length === 0)
    return '下一步'
  else if(bookings.form.tableNumber.length === 1)
    return `預約 ${bookings.form.tableNumber[0].name}`
  else if(bookings.form.tableNumber.length > 1)
    return `預約共 ${bookings.form.tableNumber.length} 桌`
})

const pickDateRange = computed(()=>{
  let date = bookings.form.date
  let start = times.find(time => time.value === bookings.form.startTime )?.name ?? ''
  let end = nextDayWithTime(getTimeWithId(parseInt(bookings.form.startTime) + (bookings.form.duration*4)))
  return `${date}   ${start} ~ ${end}`
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

const tempChange = computed(()=>{
  return tempForms.date !== bookings.form.date ||
    tempForms.duration !== bookings.form.duration ||
    tempForms.startTime !== bookings.form.startTime
})

function returnTableWork(){
  tempForms.startTime = timeList.value[0].value
  requestAnimationFrame(()=>{
    if(duration.value)
      tempForms.duration = duration.value[0].id
  })
}

function getTablePickable(table){
  // 算出長度
  if(table){
    let counts = 0
    let periodsMax = table.periods.length
    let startTime = getTimeWithId(bookings.form.startTime)
    let startPeriodsIndex = table.periods.findIndex(period => period.period === startTime)
    let afterUseIndex = table.periods.findIndex((period,periodKey) => {
      return periodKey >= startPeriodsIndex && period.is_used
    })
    if(afterUseIndex !== -1){
      counts = (afterUseIndex - startPeriodsIndex) / 4
    }else{
      counts = (periodsMax - (startPeriodsIndex)) / 4
    }
    return counts >= bookings.form.duration
  }
  return false
}

function typePrice(table){
  switch (bookings.form.type) {
    case '1':
      return table.price
    case '2':
      return table.coach_price
    case '3':
      if(bookings.isType3Offers){
        return 0
      }
      // 雖是從月費進入，但是用的是臨打
      return table.price
    default:
      return table.price
  }
}
function findIsPickTableNumber(newTable){
  return bookings.form.tableNumber.some(item => item.id === newTable.id)
}

function pickTableNumber(newTable){
  if(!bookings.isType3Offers){
    bookings.set_form_table(newTable)
  }else {
    bookings.set_form_table_toggle(newTable)
  }
  setBlur()
}

function setBlur() {
  blur.value = true
}

function confirm() {
  if(notType2UseTheirTable.value){
    modal.add_base_modals('alertModal')
  }else
    $router.push({
      name: props.confirmName
    })
}

function alertConfirm() {
  modal.remove_base_modals('alertModal')
  setTimeout(()=>{
    $router.push({
      name: props.confirmName
    })
  },300)
}

function tableDisable(table,bookings) {
  //特例 開放 9 10 雙通，無視教學桌限制
  if(table.id === 9 || table.id === 10 ){
    return table.is_used
  }
  return table.is_used || (bookings.form.type === '2' && table.type !== 'teaching')
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

function setWarning(boolean) {
  offersWarningShow.value = boolean
}

function setEditModal(boolean) {
  modal.set_base_modals('filterModal',boolean)
  findNewStartTime()
  tempForms.date = bookings.form.date
  tempForms.duration = bookings.form.duration
  tempForms.startTime = bookings.form.startTime
}

//如果有選擇項目而找不到預設時間時，選擇第一項選擇項目
function findNewStartTime(){
  let index = timeListToStart.value.findIndex(item => item.value === bookings.form.startTime)
  if(index === -1){
    bookings.set_form_base('startTime',timeListToStart.value[0]?.value ?? 28)
  }
}

function setCurrentTable(lastTables){
  currentTable.value = lastTables
  currentTable.value = currentTable.value.map(table => {
    if(table)
      table.is_used = !getTablePickable(table)
    return table
  })
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
async function closeFilter(){
  modal.remove_base_modals('filterModal')
  if(tempForms.date !== bookings.form.date){
    tableDate.value = bookings.form.date
    await updateTables()
  }
}

watch(() => bookings.form.type, (new1) => {
  if(isEmpty(new1)){
    $router.replace({
      name: props.redirectName,
    })
  }
}, {
  immediate: true
})

// 如果找不到可以選擇的開始時，直接加一天
watch(() => timeListToStart.value, (new1) => {
  if(new1.length === 0){
    bookings.set_form_base('date',DateTime.fromFormat(bookings.form.date,'yyyy-MM-dd').plus({day:1}).toFormat('yyyy-MM-dd'))
    updateTables()
  }
}, {
  immediate: false
})


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
