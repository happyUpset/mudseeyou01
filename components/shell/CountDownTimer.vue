<template>
  <div>
    <client-only>
      {{ countDown }}
    </client-only>
  </div>
</template>

<script setup>
import { DateTime } from 'luxon'

const props = defineProps({
  timestamp: {
    type: [String, Number],
    default: ''
  },
  toNow: {
    type: [Number, String],
    default: 0
  },
  // 是否會固定數值不依時間計數器變動。
  timer:{
    type: Number,
    default: 0
  },
  toNowForUnit: {
    type: String,
    default: 'days'
  },
  dataIn: {
    type: String,
    default: ''
  },
  isDate: {
    type: Boolean,
    default: false
  },
  isIso: {
    type: Boolean,
    default: false
  },
  formatIn: {
    type: String,
    default: 'yyyy-MM-dd HH:mm:ss'
  },
  formatOut: {
    type: String,
    default: 'yyyy年MM月dd日 ccc HH:mm:ss'
  },
  types: {
    type: String,
    default: 'Format'// Relative Format Calendar CalendarDay CalendarDayTime Simple DayTime
  },
  // format-out="民國Y年M月D日"
  isTaiwan: {
    type: Boolean,
    default: false
  },
  // 是否會固定數值不依時間計數器變動。（只是開放通道，尚未切確將資料擋住）
  isStatic: {
    type: Boolean,
    default: false
  },
})

const countDown = computed(() => {
  if (props.timer >= 0) {
    let momentObj = null
    if(props.isDate){
      momentObj = DateTime.fromJSDate(props.dataIn)
    } else if(props.isIso){
      momentObj = DateTime.fromISO(props.dataIn)
    } else if (props.timestamp !== '') {
      momentObj = DateTime.fromMillis(props.timestamp)
    } else if (props.dataIn !== '') {
      momentObj = DateTime.fromFormat(props.dataIn, props.formatIn)
    } else if (props.toNow !== 0) {
      momentObj = DateTime.now().plus({ [props.toNowForUnit]: props.toNow })
    } else {
      momentObj = DateTime.now()
    }
    return printDate(momentObj.setLocale('zh-tw'))
  }
})

function printDate (momentObj) {
  switch (props.types){
    case 'Format':
      if (props.isTaiwan) {
        return momentObj.minus({years:1911}).toFormat(props.formatOut)
      } else {
        return momentObj.toFormat(props.formatOut)
      }
    case 'Relative':
      return momentObj.toRelative()
    case 'Calendar':
      return momentObj.toRelativeCalendar()
    case 'Simple':
      if (props.isTaiwan) {
        return momentObj.minus({years:1911}).toFormat('民國y年M月dd日')
      } else {
        return momentObj.toFormat('yyyy年M月dd日')
      }
    case 'DayTime':
      return momentObj.toFormat('HH:mm')
    case 'SimpleDayTime':
      return momentObj.toFormat('M/d HH:mm')
  }
}
</script>
