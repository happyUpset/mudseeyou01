<template>
  <div class="flex flex-wrap">
    <label v-if="label" :for="idc+(key || '') || 'select'" :class="labelCss">{{ label }}</label>
    <div class="grid grid-cols-12 gap-8 flex-0-1/1">
      <InputCheckBoxCard
        class="col-span-3"
        v-for="(item,key) in list"
        :key="item.id"
        :keys="key"
        :data-pick="dataPick"
        :disabled-plus-title="disabledPlusTitle"
        :option="item"
        :default-option="defaultOption"
        @input="changeValue"
      />
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
  </div>
</template>

<script setup>

import {computed, watch} from "vue";

const emit = defineEmits(['changeValue'])
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
  labelCss:{
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => {
      return []
    }
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
  keys: {
    type: Number,
    default: 0
  },
  defaultOption: {
    type: [String, Number],
    default: ''
  },
  disabledPlusTitle: {
    type: String,
    default: '(已額滿)'
  },
  warning: {
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
  warningForce: {
    type: Boolean,
    default: false
  },
  resetCount: {
    type: Number,
    default: 0
  },
})

const value = ref('')
const blur = ref(false)

const showError = computed(()=> props.messageForce || state.value === false)
const state = computed(()=> {
  return (props.warningForce && !props.warning) ||
    (!props.warningForce && (!props.warning || !blur.value))
})

function changeValue(val) {
  emit('changeValue', {
    id: props.idc,
    data: val,
    key: props.key
  })
}

function init() {
  value.value = props.defaultOption && props.defaultOption !== '' ? props.defaultOption : ''
}

watch(()=>props.resetCount,()=>{
  value.value = props.defaultOption
})
watch(()=>props.defaultOption,()=>{
  init()
})
onMounted(()=>{
  init()
})

</script>
