import {DateTime} from "luxon";
import {DATE_FORMAT} from "~/const/common";

export const STATUS = [
  {
    zh_TW: '全部',
    en: 'all',
    value: 'all'
  },
  {
    zh_TW: '投注成功',
    en: 'active',
    value: 'active'
  },
  // {
  //     zh_TW: '已結束',
  //     en: 'completed',
  //     value: 'completed'
  // },
  {
    zh_TW: '已取消',
    en: 'cancel',
    value: 'cancel'
  },
  {
    zh_TW: '處理中',
    en: 'processing',
    value: 'processing'
  },
  {
    zh_TW: '中獎',
    en: 'winning',
    value: 'winning'
  },
  {
    zh_TW: '未中獎',
    en: 'lose',
    value: 'lose'
  },
]

export const DATE_RANGE = [
  {
    zh_TW: '顯示當日訂單',
    en: 'day',
    value: DateTime.now().toFormat(DATE_FORMAT),
    valueDistance: 1,
  },
  {
    zh_TW: '顯示當周訂單',
    en: 'week',
    value: DateTime.now().minus({weeks: 1}).toFormat(DATE_FORMAT),
    valueDistance: 7,
  },
  {
    zh_TW: '顯示當月訂單',
    en: 'mouth',
    value: DateTime.now().minus({months: 1}).toFormat(DATE_FORMAT),
    valueDistance: 30,
  },
]
