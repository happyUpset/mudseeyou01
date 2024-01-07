<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" :id="idName"/>
  </svg>
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
})
const iconName = computed(()=>`#icon-${props.name}`)
const idName = computed(()=>`id-icon-${props.name}`)
</script>
