<template>
  <div class="contents">
    <div
      class="rounded-lg relative mx-auto flex justify-center items-center"
      :class="[css,isPick?'bg-teal':'bg-gray-1',pickable?'cursor-pointer':'']"
      @click="pickData">
      <div :class="isPick?'text-white':'text-black'">
        <slot name="icon" :value="value">
        </slot>
        <slot name="title">
          <div class="text-2 font-bold" v-if="iconTitle">
            {{  iconTitle }}
          </div>
        </slot>
      </div>
    </div>
    <slot name="value" :title="title">
      <div class="my-12 text-center text-4">
        {{ title }}
      </div>
    </slot>
  </div>
</template>

<script setup>

const emit = defineEmits(['onPick'])
const props = defineProps({
  css:{
    type: String,
    default: ''
  },
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
  pickable:{
    type: Boolean,
    default: false
  },
  isPick:{
    type: Boolean,
    default: false
  },
})


function pickData () {
  if(props.pickable)
    emit('onPick', props.value)
}
</script>
