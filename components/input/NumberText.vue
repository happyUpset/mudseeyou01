<template>
  <div class="input-number-box">
    <div class="number-box mb-5 flex items-center">
      <div
        class="number-change-icon w-30 h-30 rounded-o flex justify-center items-center cursor-pointer font-bold select-none font-bold text-teal border border-solid border-teal transition-all duration-300 hover:text-teal-light hover:border-teal-light active:text-teal-dark active:border-teal-dark"
        :class="min === counts ?'opacity-40 cursor-auto':''"
        @click="calc(false)">－</div>
      <div class="number px-12 leading-[3rem] w-max" v-if="type === 'text'">{{ counts }}</div>
      <InputText
        v-if="type === 'input'"
        type="number"
        class="number leading-[3rem] w-max"
        :inputCss="inputCss"
        :idc="idc"
        :default-input="counts"
        :min="min"
        :max="max"
        :update-default-count="countsChange"
        @changeInput="calcNumber"
        @focusInput="focusInput"
        @blurInput="blurInput"
        :warning-force="warningForce"
        :warning="warning"
      />
      <div
        class="number-change-icon w-30 h-30 rounded-o flex justify-center items-center cursor-pointer font-bold select-none font-bold text-teal border border-solid border-teal transition-all duration-300 hover:text-teal-light hover:border-teal-light active:text-teal-dark active:border-teal-dark"
        :class="max <= counts ?'opacity-40 cursor-auto':''"
        @click="calc(true)">＋</div>
    </div>
    <div v-if="showError" class="warring-messages">
      <div class="warring-message">
        <div class="text-box">
          <div class="text deep-red h7-font">{{ warningMessage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {watch} from "vue";

const emit = defineEmits(['changeInput','focusInput','blurInput'])
const props = defineProps({
  idc:{
    type: [String,Number],
    default: 'label'
  },
  label:{
    type: String,
    default: ''
  },
  key:{
    type: [String,Number],
    default: ''
  },
  inputCss:{
    type: String,
    default: ''
  },
  labelCss:{
    type: String,
    default: ''
  },
  warning: {
    type: Boolean,
    default: false
  },
  warningForce: {
    type: Boolean,
    default: false
  },
  warningMessage: {
    type: String,
    default: ''
  },
  messageForce: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text' // input
  },
  clipboardId: {
    type: String,
    default: ''
  },
  autosize: {
    type: [Object, Boolean],
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  widthLevel: {
    type: String,
    default: 'normal'
  },
  min: {
    type: [String, Number],
    default: 0
  },
  max: {
    type: [String, Number],
    default: 9999
  },
  fixedNumber:{
    type: Boolean,
    default: true
  },
  defaultInput: {
    type: [String, Number],
    default: 0
  },
  updateDefaultCount: {
    type: Number,
    default: 0
  },
})

const blur = ref(false)
const counts = ref(0)
const countsChange = ref(0)

const showError = computed(()=>props.messageForce || state.value === false)
const state = computed(()=>{
  return (props.warningForce && !props.warning) ||
  (!props.warningForce && (!props.warning || !blur.value))
    ? null
    : false
})


watch(()=>props.defaultInput,()=>{
  init()
})

watch(()=>props.updateDefaultCount,()=>{
  init()
})

onMounted(()=>{
  init()
})

function updateCounts () {
  // 強制型
  if(parseInt(counts.value) > parseInt(props.max)){
    counts.value = props.max
  }else if(parseInt(counts.value) < parseInt(props.min)) {
    counts.value = props.min
  }
  emit('changeInput',{
    id: props.idc,
    data: counts.value,
    key: props.key
  })
}
function focusInput() {
  emit('focusInput')
}
function blurInput() {
  blur.value = true
  emit('blurInput')
}

function init () {
  counts.value = props.defaultInput && props.defaultInput !== 0 ? props.defaultInput : 0
}

function calc(add){
  this.blur = true
  if(add && canAdd()){
    counts.value = parseInt(counts.value) + 1
    updateCounts()
    countsChange.value++
  } else if(!add && canMinus()){
    counts.value = parseInt(counts.value) - 1
    updateCounts()
    countsChange.value++
  }
}

function calcNumber({data}){
  blur.value = true
  const data2 = data ? data : 0
  if(props.fixedNumber){
    if(data2 <= props.max && data2 >= props.min){
      counts.value = data2
    }else if(data2 > props.max){
      counts.value = props.max
    }else if(data2 < props.min){
      counts.value = props.min
    }
  }else {
    counts.value = data2
  }
  updateCounts()
  countsChange.value++
}

function canMinus(){
  return parseInt(counts.value) > props.min
}
function canAdd(){
  return parseInt(counts.value) < props.max
}

</script>
