<template>
  <div class="contents">
    <div
      class="rounded-md relative mx-auto py-18 px-15"
      :class="[css,isPick?'bg-teal text-white':'bg-gray-1 text-black',pickable?'cursor-pointer':'']"
      @click="pickData">
      <div :class="isPick?'text-white':'text-black'">
        <div class="flex">
          <slot name="title">
            <div class="flex-1-auto text-left">
              <div class="text-5 font-bold" v-if="title">
                {{title }}
              </div>
            </div>
          </slot>
          <slot name="value">
            <div class="flex-0-auto">
              <div class="text-5 font-bold">
                {{ value }}
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
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
