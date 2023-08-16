<template>
  <div
    class="cancel-btn rounded-o flex justify-center items-center cursor-pointer"
    :class="color"
    :style="{width: `${width}px`,height: `${width}px`}"
    @click="closeClick">
    <NuxtIcon2 name="times" :style="{width: `${timesWidth}px`,height: `${timesWidth}px`}"/>
  </div>
</template>

<script setup>

import {computed} from "vue";

const emit = defineEmits(['handleClick'])

const props = defineProps({
  background: {
    type: Boolean,
    default: true
  },
  color:{
    type: String,
    default: 'green-bg'
  },
  width: {
    type: [String, Number],
    default: 30
  },
})

const timesWidth = computed(() => {
  return parseInt(props.width) * 0.6
})

function closeClick($event){
  emit('handleClick',$event)
}
</script>
