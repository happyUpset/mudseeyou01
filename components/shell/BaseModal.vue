<template>
  <transition :name="mode === '2' ?screen.platformMax['2sm']?'down':'fade':'fade'">
    <div
      v-if="show"
      class="z-100 fixed w-[100vw] bottom-0 left-0 min-h-[100vh]"
      :style="{height: `${screen.windowHeight}px`}"
      :class="frameCss">
      <div class="absolute top-0 left-0 w-1/1 h-1/1 z-0" :class="hasMask?'opacity-90 bg-[#000]':''" @click="closeModal"/>
<!--      <div class="absolute top-0 left-0 w-1/1 h-1/1 z-0 opacity-90 bg-[#000]" @click="closeModal"/>-->
      <div :class="[size,mode === '2'?'2sm:absolute 2sm:bottom-0 2sm:w-1/1 2sm:max-w-[initial]':'']" class="relative  w-[96%] mt-60 mx-auto z-1 ">
        <slot :close="closeModal" :status="show"/>
      </div>
    </div>
  </transition>
</template>

<script setup>
/**
 * 個別不衝突的燈箱效果
 */
import {storeScreen} from "@/store/screen";
import {storeModal} from "@/store/modal";
import {computed, watch} from "vue";

const emit = defineEmits(['setClose'])
const props = defineProps({
  name:{
    type: String,
    // default: 'modal-frame'
    default: ''
  },
  frameCss:{
    type: String,
    default: 'modal-frame'
  },
  md:{
    type: Boolean,
    default: false
  },
  hasMask:{
    type: Boolean,
    default: false
  },
  sm:{
    type: Boolean,
    default: false
  },
  lg:{
    type: Boolean,
    default: false
  },
  max:{
    type: Boolean,
    default: false
  },
  mode:{
    type: String,
    default: '1'
  },
  noClose:{
    type: Boolean,
    default: false
  },
})

const screen = storeScreen()
const modal = storeModal()

const size = computed(()=>{
  if(props.sm)
    return 'max-w-[300px]'
  if(props.md)
    return 'max-w-[500px]'
  if(props.lg)
    return 'max-w-[700px]'
  if(props.max)
    return 'max-w-[96vw]'
  return 'max-w-[700px]'
})
const show = computed(()=>{
  return modal.baseModals.findIndex(modal => modal === props.name) !== -1
})

function closeModal(){
  console.log('closeModal',props.name)
  if(!props.noClose) {
    modal.remove_base_modals(props.name)
    emit('setClose')
  }
}
</script>
