<template>
  <div class="select-box relative flex flex-wrap" :class="[addClass]">
    <label v-if="label" :for="idc+(key || '') || 'select'" :class="labelCss">{{ label }}</label>
    <div class="select-content flex-0-1/1 w-1/1 relative" :class="addClass">
      <select
        :id="idc+(key || '') || 'select'"
        :name="idc+(key || '') || 'select'"
        v-model="value"
        class="h-[5rem] text-[1.8rem] appearance-none leading-[5rem] rounded-md border pr-[0.75rem] pl-[1rem] my-6"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="[size, state?'':'input-warning-color',addClass,inputCss]"
        @change="changeValue(value)"
        @focus="focusSelect"
        @blur="blurSelect"
      >
        <option
          v-if="placeholder"
          value=""
          disabled
        >
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option[dataPick.key]"
          :value="option[dataPick.key]"
          :disabled="option.disabled"
        >
          {{ option[dataPick.name] + (option.disabled ? disabledPlusTitle : '')}}
        </option>
      </select>

      <div class="absolute h-1/1 top-0 right-0 flex justify-center items-center w-30 cursor-pointer" v-if="value !== '' && clearable" @click="clear">
        <NuxtIcon2 name="times" class="w-10 h-10"/>
      </div>
      <div class="absolute h-1/1 pointer-events-none top-0 right-0 flex justify-center items-center w-30" v-else>
        <div class="allow w-8 h-7 bg-gray-5"/>
      </div>
    </div>
    <slot name="warring-message">
      <div v-if="showError" class="warring-messages">
        <div class="warring-message">
          <div class="text-box">
            <div class="text text-red text-7">{{ warningMessage }}</div>
          </div>
        </div>
      </div>
    </slot>
<!--    <span v-if="showError" class="warning-messages f-red">{{ warningMessages }}</span>-->
  </div>
</template>

<script setup>
import {computed, watch} from "vue";

const emit = defineEmits(['changeValue', 'focusSelect', 'blurSelect'])
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
  warning: {
    type: Boolean,
    default: false
  },
  warningMessage: {
    type: String,
    default: ''
  },
  warningForce: {
    type: Boolean,
    default: false
  },
  messageForce: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  addClass: {
    type: String,
    default: 'block' // block, inline, inline-fix
  },
  inputCss: {
    type: String,
    default: ''
  },
  labelCss:{
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disabledPlusTitle: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => {
      return []
    }
  },
  clearable:{
    type: Boolean,
    default: false
  },
  dataPick: {
    type: Object,
    default: () => {
      return {
        key: 'id',
        name: 'name'
      }
    }
  },
  defaultOption: {
    type: [String, Number],
    default: ''
  },
  resetCount: {
    type: Number,
    default: 0
  },
  size: {
    type: String,
    default: 'normal' // big
  }
})

const value = ref('')
const blur = ref(false)

const showError = computed(()=> props.messageForce || state.value === false)
const state = computed(()=> {
  return (props.warningForce && !props.warning) ||
    (!props.warningForce && (!props.warning || !blur.value))
})

watch(()=>props.resetCount,()=>{
  value.value = props.defaultOption
})
watch(()=>props.defaultOption,()=>{
  init()
})
onMounted(()=>{
  init()
})
function changeValue(val) {
  emit('changeValue', {
    id: props.idc,
    data: val,
    key: props.key
  })
}
function clear() {
  emit('changeValue', {
    id: props.idc,
    data: '',
    key: props.key
  })
}
function focusSelect () {
  emit('focusSelect')
}
function blurSelect () {
  blur.value = true
  emit('blurSelect')
}
function init() {
  value.value = props.defaultOption && props.defaultOption !== '' ? props.defaultOption : ''
}
</script>

<style lang="sass" scoped>

.select-box
  &.filled
    width: 100%
    .select-content
      flex: 1 1 auto
      .select-base
        width: 100%
  &.filled-100
    width: 100%
    .select-content
      flex: 0 0 100%
      .select-base
        width: 100%

  &.block
    label
      flex: 0 0 100%

    .select
      flex: 0 0 100%

  &.inline
    label
      flex: 0 0 auto

    .select
      flex: 0 0 auto

  &.inline-fix
    label
      display: flex
      align-items: center
      margin: 0 9px 0 0
      flex: 0 0 auto

    .select
      flex: 1 1 auto

  label
    max-width: 100%
    span
      padding-left: 10px

  .select
    max-width: 100%
  .select-content
    position: relative
    //width: fit-content
    /* 不應該寫在這裡
    //&.filled
    .allow
      clip-path: polygon(50% 100%, 0 0, 100% 0)
  .select-base
    &.line
      border: none
      border-bottom: 1px solid var(--bc-black)
      border-radius: 0
      padding: 0


  //select
  //  font-size: 1.5rem
  //  line-height: 2rem
  //  min-width: 180px
  //  padding: 8px 20px
  //  color: var(--bc-white)
  //  //background: var(--bc-black)
  //  border-radius: 0
  //  border: none
  //  appearance: textfield
  //  -moz-appearance: textfield
  //  -webkit-appearance: textfield
</style>
