<template>
  <button class="act-button relative h-1/1 overflow-hidden" v-if="!loading" @click="click">
    <slot></slot>
  </button>
  <button class="act-button relative h-1/1 unSelect overflow-hidden" v-else>
    <slot name="loading">
      <div class="three-dot leading-[1]">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </slot>
  </button>
</template>

<script setup>

const emit = defineEmits(['input'])
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  clickData: {
    default: null,
  }
})
function click(){
  emit('input', props.clickData)
}
</script>
