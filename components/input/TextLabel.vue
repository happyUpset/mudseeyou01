<template>
  <div class="input-box flex-w">
    <div class="field w-1/1 relative mx-auto">
      <input
        :type="typeShow"
        class="input flex-0-1/1 form-control h-[60px] pt-24 px-16 pb-6 leading-[30px] block mx-auto my-0"
        :id="idc+(key || '')"
        :name="nameShow"
        v-model.trim="input"
        :class="[inputCss,showError?'border-deep-red':'']"
        :disabled="disabled"
        :readonly="readonly"
        :pattern="pattern"
        :min="min"
        :max="max"
        required
        :data-clipboard-target="clipboardId"
        :hasvalue="!isEmpty"
        @input="changeInput($event)"
        @focus="focusInput"
        @keyup.enter="submit($event)"
        @blur="blurInput"/>
      <p
        class="placeholder z-1 top-0 left-0 origin-top-left pointer-events-none absolute text-deep-gray text-p"
        :class="labelCss"
      >
        {{ placeholderShow || '輸入:' }}
      </p>
    </div>
<!--    :state="state"-->
    <div v-if="showError" class="warring-messages mt-6">
      <slot name="warring-message">
        <div class="warring-message text-left">
          <div class="text-box">
            <div class="text text-red text-7">{{ warningMessage }}</div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { isNumber,isDefined } from '@/utils/types'
import {computed, watch} from "vue";

const emit = defineEmits(['changeInput','focusInput','blurInput','submitInput'])
const props = defineProps({
  idc:{
    type: [String,Number],
    default: 'label'
  },
  label:{
    type: String,
    default: ''
  },
  actLabel:{
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
const firstBlur = ref(false)
const focus = ref(false)

const showError = computed(()=>props.messageForce || state.value === false)
const state = computed(()=>{
  return (props.warningForce && !props.warning) ||
  (!props.warningForce && (!props.warning || !firstBlur.value))
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
const placeholderShow = computed(()=>{
  let placeholder = props.label
  let actPlaceholder = props.actLabel
  if(isEmpty.value && !focus.value)
    return placeholder
  else
    return actPlaceholder !== '' ? actPlaceholder : placeholder
})
const pattern = computed(()=>{
  return props.type === 'numberString' || props.type === 'number' ? '[0-9]*' : ''
})
const isEmpty = computed(()=>{
  if(props.type === 'number'){
    return !isNumber(input.value)
  }else {
    return input.value === null || input.value === ''
  }
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

function changeInput ($event) {
  fixedNumber()
  emit('changeInput', {
    id: props.idc,
    data: input.value,
    key: props.key,
    $event
  })
}
function submit($event){
  emit('submitInput',$event)
}

function focusInput() {
  fixedNumber()
  focus.value = true
  emit('focusInput')
}
function blurInput() {
  fixedNumber()
  firstBlur.value = true
  focus.value = false
  emit('blurInput')
}
function fixedNumber(){
  if(props.type === 'number'){
    input.value = parseInt(input.value)
  }
}

function init() {
  if (props.type === 'number') {
    requestAnimationFrame(() => {
      input.value = isDefined(props.defaultInput)
        ? props.defaultInput
        : 0
    })
  } else {
    input.value = isDefined(props.defaultInput)
      ? props.defaultInput
      : ''
  }
}
</script>

<style lang="sass" scoped>
.field
  input
    transition: box-shadow .2s linear, border-color .25s ease-out
    &:focus ~ .placeholder
      transform: translate(17px, 6px) scale(.8)
    &[hasvalue='true'] ~ .placeholder
      transform: translate(17px, 6px) scale(.8)

  .placeholder
    transform: translate(15px, 17px) scale(1)
    transition: transform .2s ease-out

//input:focus
  //outline: none
  //box-shadow: 0 2px 10px rgba(0,0,0,.2)
  //border: solid 2px #98dcff
</style>
