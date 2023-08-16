<template>
  <div class="contents">
    <div
      class="rounded-lg relative mx-auto sm:w-[75px] sm:h-[50px] w-[110px] h-[76px] flex justify-center items-center"
      :class="[isPick?'bg-teal':'bg-gray-1',disabled?'opacity-10':'cursor-pointer']"
      @click="pickData">
      <div :class="isPick?'text-white':'text-black'">
        <slot name="icon" :value="value">
        </slot>
        <slot name="title">
          <div class="text-4 font-medium">
            {{  iconTitle }}
          </div>
        </slot>
      </div>
    </div>
    <slot name="value">
      <div class="my-6 text-center text-7" :class="disabled?'opacity-10':'cursor-pointer'">
        {{ title }}
      </div>
    </slot>
  </div>
</template>

<script setup>

const emit = defineEmits(['onPick'])
const props = defineProps({
  value:{
    type: [String,Number],
    default: ''
  },
  title:{
    type: [String,Number],
    default: ''
  },
  iconTitle:{
    type: [String,Number],
    default: ''
  },
  isPick:{
    type: Boolean,
    default: false
  },
  disabled:{
    type: Boolean,
    default: false
  },
})


function pickData () {
  if(!props.disabled)
    emit('onPick', props.value)
}
</script>
