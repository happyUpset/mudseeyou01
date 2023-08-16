import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import {findIdWithTime, findTimeWithId} from "~/const/duration";
import {storeAuth} from "~/store/auth";
import {ref,computed} from "vue";
import {storeWeb} from "~/store/web";

/**
 * 用戶版本
 */
export const storeBookings = defineStore('Bookings', ()=>{

  const auth = storeAuth()
  const options = storeWeb()
  const type = ref('1') // 目前暫定資料 1 一般預約 2 教學預約 3 方案預約

  const firstMain = ref(false)// 首次進入預約畫面，不是則跳出燈箱
  const formBase = reactive({
    phone: '',
    type: '',
    tableNumber: [],
    duration: 1,
    startTime: '',
    date: '',
    // startTime: findTimeWithId(DateTime.now().plus({minute: 1}).toFormat('HH:mm')).value ?? 15,
    // date: DateTime.now().toFormat('yyyy-MM-dd'),
    // startTime: findIdWithTime('07:00'),
    // date: DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd'),
  })

  const formAdditions = reactive({
    pingPongMachine: 0,
    pingPongPaddle: 0,
    pingPongBall: 0
  })

  const formCoupons = ref([])

  const form = computed(()=>{
    return {
      phone: formBase.phone,
      type: formBase.type,
      tableNumber: formBase.tableNumber,
      duration: formBase.duration,
      startTime: formBase.startTime,
      date: formBase.date,
      additions: formAdditions,
      coupons: formCoupons.value,
    }
  })

  const legalBookings = computed(()=>{
    return !!(auth.loginCheck &&
      form.value.type &&
      form.value.tableNumber &&
      form.value.duration &&
      form.value.startTime !== '' &&
      form.value.date)
  })

  const totalPrice = computed(()=>{
    if(isType3Offers.value){
      return 0
    }
    return form.value.tableNumber.reduce((p,item) => p + (form.value.duration * (form.value.type === '2'? item.coach_price : item.price)),0)
  })

  const isBookingTypeOffer = computed(()=> auth.hasOffers && options.offers && form.value.type === '3')

  //方案已經正在使用中
  const type3IsUsingNow = computed(()=>{
    return auth.hasUsingOffersNow && isBookingTypeOffer.value
  })

  //超出方案的預約狀況 星期
  const type3BeyondTheDate = computed(()=>{
    if(isBookingTypeOffer.value && options.offers && options.offers.length > 0){
      let weekday = DateTime.fromFormat(form.value.date,'yyyy-MM-dd').weekday
      // console.log(offers[0].allowsWeekdays ,weekday)
      return !options.offers[0].allowsWeekdays.some(allowWeekday => allowWeekday === weekday)
    }
    return false
  })

  //超出方案的預約狀況 開始時間
  const type3BeyondTheStartTime = computed(()=>{
    if(isBookingTypeOffer.value && options.offers && options.offers.length > 0) {
      return !options.offers[0].allowsTime.some((allowT,key) => {
        return (options.offers[0].allowsTime[key + 3] && options.offers[0].allowsTime[key + 3] === parseInt(form.value.startTime) + 3);
      })
    }
    return false
  })

  //超出方案的 時間長度的處理方式
  const type3BeyondTheDuration = computed(()=>{
    return form.value.duration < 1  || form.value.duration > 2
  })
  //是方案的購買者
  const isType3Offers = computed(()=>{
    return !type3IsUsingNow.value && isBookingTypeOffer.value && !type3BeyondTheDate.value && !type3BeyondTheStartTime.value && !type3BeyondTheDuration.value
  })

  function set_form_base(title,value){
    formBase[title] = value;
  }
  function reset_form_base(){
    formBase.phone = '';
    formBase.type = '';
    formBase.tableNumber = [];
    formBase.duration = 1;
    formBase.startTime = '';
    formBase.date = '';
    // formBase.startTime = findIdWithTime('07:00');
    // formBase.date = DateTime.now().plus({days: 1}).toFormat('yyyy-MM-dd');
  }

  function default_form_date(isEmpty = false){
    formBase.tableNumber = [];
    formBase.duration = 1;
    if(isEmpty){
      formBase.startTime = '';
      formBase.date = '';
    }else {
      formBase.startTime = findTimeWithId(DateTime.now().plus({minute: 1}).toFormat('HH:mm')).value ?? 15;
      formBase.date = DateTime.now().toFormat('yyyy-MM-dd');
    }
  }

  //重新建立訂單購買資訊（不含身份重置）
  function default_form_orders(){
    formBase.tableNumber = [];
    formBase.duration = 1;
    formBase.startTime = findTimeWithId(DateTime.now().plus({minute: 1}).toFormat('HH:mm')).value ?? 15;
    formBase.date = DateTime.now().toFormat('yyyy-MM-dd');
  }

  function set_form_base_toggle(title,value){
    if(formBase[title] === value){
      formBase[title] = '';
    }else
      formBase[title] = value;
  }

  function set_form_table_toggle(value){
    let hasSameInTable = formBase.tableNumber.findIndex(item => item.id === value.id)
    let max = 1
    if(hasSameInTable !== -1){
      formBase.tableNumber = []
    }else if(formBase.tableNumber.length >= max){
      formBase.tableNumber = []
      formBase.tableNumber.push(value)
    }else {
      formBase.tableNumber.push(value)
    }
  }
  function set_form_table(value){
    let hasSameInTable = formBase.tableNumber.findIndex(item => item.id === value.id)
    if(hasSameInTable !== -1){
      formBase.tableNumber.splice(hasSameInTable,1)
    }else {
      formBase.tableNumber.push(value)
    }
  }

  function clear_form_table(){
    formBase.tableNumber = []
  }

  function set_form_additions(title,value){
    formAdditions[title] = value;
  }
  function set_form_coupons(title,value){
    formCoupons.value = value;
  }

  function set_first_main(boolean = true){
    firstMain.value = boolean;
  }

  function setBookingsType(typeId) {
    // if(typeId !== '3' || auth.hasOffers && typeId === '3'){
    type.value = typeId
    // }
  }

  return {
    form,
    type,
    firstMain,
    legalBookings,
    totalPrice,
    isType3Offers,
    type3BeyondTheDate,
    type3BeyondTheStartTime,
    default_form_date,
    default_form_orders,
    set_first_main,
    setBookingsType,
    reset_form_base,
    set_form_base,
    set_form_base_toggle,
    set_form_additions,
    set_form_coupons,
    set_form_table_toggle,
    set_form_table,
    clear_form_table
  }
})
