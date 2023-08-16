<template>
  <div class="input-box flex items-center">
    <div class="label-box flex-0-auto flex-start-center">
      <label
        class="text-5 pr-6"
        v-if="label"
        :class="labelCss"
        :for="idc+(key || '')">
        {{ label }}
      </label>
    </div>
    <input
      :type="typeShow"
      class="input flex-1-auto form-control placeholder:text-slate-400"
      :id="idc+(key || '')"
      :name="nameShow"
      v-model.trim="input"
      :class="[inputCss,showError?'border-red':'']"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :pattern="pattern"
      :min="min"
      :max="max"
      required
      :data-clipboard-target="clipboardId"
      @input="changeInput"
      @focus="focusInput"
      @blur="blurInput"
    />
<!--    :state="state"-->
    <slot name="warring-message">
      <div v-if="showError" class="warring-messages">
        <div class="warring-message">
          <div class="text-box">
            <div class="text text-red text-7">{{ warningMessage }}</div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup>

import {computed, watch} from "vue";

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
    default: 'text'
  },
  name: {
    type: String,
    default: ''
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
  min: {
    type: [String, Number],
    default: ''
  },
  max: {
    type: [String, Number],
    default: ''
  },
  defaultInput: {
    type: [String, Number],
    default: ''
  },
  updateDefaultCount: {
    type: Number,
    default: 0
  }
})

const input = ref('')
const blur = ref(false)

const showError = computed(()=>props.messageForce || state.value === false)
const state = computed(()=>{
  return (props.warningForce && !props.warning) ||
  (!props.warningForce && (!props.warning || !blur.value))
    ? null
    : false
})
const typeShow = computed(()=>{
  if(props.type === 'numberString')
    return 'text'
  return props.type
})
const nameShow = computed(()=>{
  if(props.name === '')
    return props.idc
  return props.name
})
const pattern = computed(()=>{
  return props.type === 'numberString' || props.type === 'number' ? '[0-9]*' : ''
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

function changeInput () {
  fixedNumber()
  emit('changeInput', {
    id: props.idc,
    data: input.value,
    key: props.key
  })
}
function focusInput() {
  fixedNumber()
  emit('focusInput')
}
function blurInput() {
  fixedNumber()
  blur.value = true
  emit('blurInput')
}
function fixedNumber(){
  if(props.type === 'number'){
    input.value = parseInt(input.value)
  }
}

function init() {
  if(props.type === 'number'){
    requestAnimationFrame(()=>{
      input.value = props.defaultInput && props.defaultInput !== ''
        ? props.defaultInput
        : 0
    })
  }else{
    input.value = props.defaultInput && props.defaultInput !== ''
      ? props.defaultInput
      : ''
  }
}
</script>
