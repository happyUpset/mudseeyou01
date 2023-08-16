<template>
  <div class="input-box flex-w">
    <div class="label-box text-left">
      <label
        class="text-5 pr-6"
        v-if="label"
        :class="labelCss"
        :for="idc+(key || '')">
        {{ label }}
      </label>
    </div>
    <div class="field relative my-8 mx-auto">
      <form class="grid grid-cols-12 gap-16">
        <input
          class="input form-control-bg h-[60px] col-span-3"
          :class="[inputCss,showError?'border-deep-red':'']"
          v-for="(item,key) in length"
          type="tel"
          :id="`digit${key}`"
          name="verification-code"
          pattern="[0-9]"
          inputmode="numeric"
          maxlength="1"
          :readonly="readonly"
          :value="inputs[key]"
          autocomplete="one-time-code"
          @change="detectCode(key,$event)"
          @input="changeInput(key,$event)"
          @focus="focusInput(key,$event)"
          @keyup.enter="submit($event)"
          @blur="blurInput(key,$event)">
<!--        autocomplete="off"-->
      </form>
    </div>
<!--    {{ inputs }}-->
<!--    {{ platform.browserName +','+ platform.deviceName }}-->
<!--    <div class="text-orange" v-html="aaaaa"></div>-->
<!--    <div class="text-teal" v-html="bbbb"></div>-->
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
import {computed, watch} from "vue";
import _ from 'lodash'
import {platformStore} from "~/store/platform";

const emit = defineEmits(['changeInput', 'focusInput', 'blurInput','submitInput'])
const props = defineProps({
  length: {
    type: [String, Number],
    default: 4
  },
  idc:{
    type: [String,Number],
    default: 'label'
  },
  label:{
    type: String,
    default: ''
  },
  labelCss:{
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
  readonly: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
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

const inputs = ref([])
const firstBlur = ref(false)
// const aaaaa = ref('')
// const bbbb = ref('')
const iosDetectStart = ref(0)
const focus = ref(false)
const platform = platformStore()

const showError = computed(() => props.messageForce || state.value === false)
const state = computed(() => {
  return (props.warningForce && !props.warning) ||
  (!props.warningForce && (!props.warning || !firstBlur.value))
    ? null
    : false
})

/**
 * 由於在手機版開啟safari 他的自動填寫方式與chrome 不一樣，但是電腦版的沒有測試
 * @type {ComputedRef<unknown>}
 */
const isIos = computed(()=>{
  if(platform){
    return platform.browserName === 'ios' /*|| platform.browserName === 'safari'*/
  }
})

watch(() => props.defaultInput, () => {
  init()
})

watch(() => props.updateDefaultCount, () => {
  init()
})

onMounted(() => {
  init()
})

//iosDetectStart 與頻果手機驗證相關 棄用
function changeInput(key,$e) {
  // console.log(key,'changeInput',$e,inputs.value)
  // aaaaa.value +='2'
  // bbbb.value +='input='+key+':'+$e.target.value+', '
  let digit = null
  if(isIos.value && $e.target.value){
    // inputs.value[iosDetectStart.value] = $e.target.value
    inputs.value[key] = $e.target.value
    if($e.target.value && key + 1 < parseInt(props.length)){
      digit = document.getElementById(`digit${key + 1}`)
      digit.focus()
      emit('focusInput',key + 1)
      digit.setSelectionRange(0,digit.value.length)
    }
    emit('changeInput', {
      id: props.idc,
      data: inputs.value.reduce((p,c) => p+''+c,''),
      key: props.key
    })
    // iosDetectStart.value++
  }else {
    if($e.data === null){
      inputs.value[key] = ''
    }else if( $e.data !== ''){
      inputs.value[key] = $e.data
      if($e.data && key + 1 < parseInt(props.length)){
        digit = document.getElementById(`digit${key + 1}`)
        digit.focus()
        emit('focusInput',key + 1)
        digit.setSelectionRange(0,digit.value.length)
      }
      emit('changeInput', {
        id: props.idc,
        data: inputs.value.reduce((p,c) => p+''+c,''),
        key: props.key
      })
    }
  }
}

function submit($event){
  emit('submitInput',$event)
}

function detectCode(key,$e) {
  // console.log('detectCode',$e)
  // aaaaa.value +='1 '
  // bbbb.value +='change='+key+':'+$e.target.value+'<br>'
  if(isIos.value){
    if(isEmpty($e.target.value)){
      iosDetectStart.value = 0
    }
    return ;
  }else if($e.target.value.length === props.length){
    inputs.value = $e.target.value.split('')
    emit('changeInput', {
      id: props.idc,
      data: $e.target.value,
      key: props.key
    })
    let digit = document.getElementById(`digit${props.length - 1}`)
    digit.focus()
    digit.setSelectionRange(0,digit.value.length)
  }
}

function focusInput(key,$e) {
  let digit = document.getElementById(`digit${key}`)
  // digit.setSelectionRange(0,digit.value.length)
  focus.value = true
  emit('focusInput',key)
}

function blurInput() {
  firstBlur.value = true
  focus.value = false
  emit('blurInput')
}

function init() {
  let data = props.defaultInput.split('')
  if(data.length === parseInt(props.length)){
    inputs.value = data
  }else if(data.length > parseInt(props.length)){
    inputs.value = _.take(data,props.length)
  }else if(data.length < parseInt(props.length)){
    inputs.value = data.concat(_.fill(new Array(parseInt(props.length) - data.length),''))
  }
  // inputs.value = isDefined(props.defaultInput)
  //   ? props.defaultInput
  //   : []
}
</script>
