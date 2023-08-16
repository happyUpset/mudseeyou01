<template>
  <div class="tab-title">
    <div class="tab-label flex">
      <div class="label-item cursor-pointer text-center col"
           v-for="(value,name) in tabsData"
           :class="[nowTab === name?'selected':'']"
           :style="{width: (100/tabsLength)+'%'}"
           :key="name"
           @click="handleClick(name)">
        {{ value.title }}
      </div>
    </div>
    <div class="grid grid-cols-12 in-box">
      <slot name="tabContent" :now-tab="nowTab" :title="nowTab">
      </slot>
    </div>
  </div>
</template>

<script setup>

import {computed} from "vue";

const emit = defineEmits(['handleClick'])

const props = defineProps({
  tabsData: {
    type: Object,
    default: () => {
      return {
        'submit': {
          title: '確認投注',
        },
        'order': {
          title: '即時訂單',
        },
        'favorite': {
          title: '我的最愛',
        },
      }
    },
  },
  nowTab: {
    type: String,
    default: 'submit',
  },
})
const tabsLength = computed(()=> Object.keys(props.tabsData).length)


function handleClick(name){
  emit('handleClick',name)
}
</script>

<style lang="sass" scoped>
@import "@/assets/css/basicVarFunc"

.tab-title
  .tab-label
    .label-item
      letter-spacing: 0.08em
      color: $black
      width: 125px
      line-height: 35px
      padding: 5px 12px
      background: $background-gray
      opacity: 0.8
      transition: all 300ms ease
      @extend %h4

      &.selected
        opacity: 1
        background: $black
        border-top: 3px solid $yellow
        color: $yellow
        font-weight: bold

  .in-box
    height: calc(100% - 45px)

</style>
