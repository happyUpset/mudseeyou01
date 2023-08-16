<template>
<!--  2sm:rounded-none-->
  <div
    class="coz-modal relative flex flex-col rounded-lg  loading-box"
    :class="[
      background?'bg-white font-color':'white',
      noBorder?'none-border-color border-transparent':'border-4 border-solid modal-frame-border-color'
    ]">
    <EffectsLoadingSVG position="normal" :is-loading="isLoading"/>
    <div
      class="py-0 w-1/1 h-1/1 flex-nw flex-col overflow-auto"
      :style="{'max-height' : `calc(${screen.windowHeight}px + env(safe-area-inset-bottom) - 70px)`}">
<!--    <div class="py-20 max-h-[calc(100vh+env(safe-area-inset-bottom)-120px)] w-1/1 h-1/1 flex-nw flex-col">-->
      <slot name="prevButton" :item="{close:close}">

      </slot>
      <div class="w-1/1 flex-0-auto">
        <div class="flex">
          <slot name="beforeHead" :item="{close:close}"></slot>
        </div>

        <slot name="header" :item="{close:close}">
          <div class="flex" v-if="title">
            <h5 class="text-5 title mt-40 mb-20 mx-auto flex-1-auto text-center" v-if="typeM === 2">{{title}}</h5>
            <h3 class="text-4 title mt-40 mb-20 mx-auto flex-1-auto text-center" v-else>{{title}}</h3>
          </div>
        </slot>
      </div>
      <div class="w-1/1 overflow-x-hidden overflow-y-auto flex-1-auto">
        <div class="mt-0">
          <slot name="item" :item="{close:close}"></slot>
        </div>
      </div>
      <slot name="footer" :item="{close:close}">
<!--        <div class="py-12 px-36 sm:px-15 shadow-m3-6 w-1/1 flex-0-auto">-->
<!--        </div>-->
      </slot>
    </div>

    <div class="close-btn absolute z-1 top-8 right-8 cursor-pointer" @click="close" v-if="!noCloseBtn">
      <NuxtIcon2 name="times-o" class="w-30 h-30 transition hover:text-gray-5"/>
    </div>
<!--    <div class="flex justify-center absolute h-30 top-[-45px] w-1/1 sm:top-[initial] bottom-[-45px]" @click="close" v-if="!noCloseBtn">-->

  </div>
</template>

<script setup>

import {storeScreen} from "@/store/screen";
import {computed, onUnmounted, onMounted} from "vue";

const emit = defineEmits(['close'])
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  background: {
    type: Boolean,
    default: true
  },
  type:{
    type: [Number,String],
    default: 1 // 1 是通用 2 是預約單號
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  noCloseBtn:{
    type: Boolean,
    default: false
  },
  noBorder:{
    type: Boolean,
    default: true
  },
  hasFooter:{
    type: Boolean,
    default: false
  },
})
const screen = storeScreen()

const typeM = computed(()=> parseInt(props.type))

function close(){
  emit('close')
}

function handler(e){
  if(e.key === 'Escape')
    close()
}

onMounted(() => {
  window.addEventListener('keyup', handler);
})

onUnmounted(() => {
  window.removeEventListener('keyup', handler);
})

</script>
