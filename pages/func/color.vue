<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">顏色轉換</div>
      <div class="my-6">
        <label for="number">顏色</label>
        <input class="form-control my-4" id="number" type="color" v-model="color">
        <label for="number">亮暗值 0 > x > 2 數值越大越亮</label>
        <input class="form-control my-4" id="number" type="range" max="3" min="0" step="0.01" v-model="pt">
      </div>
      <div class="w-50 h-50" :style="{backgroundColor: show}"></div>
      {{pt}}
    </div>
  </div>
</template>

<script setup>
import {hexToHsl,HSL_lightness} from "~/utils/color";

const color = ref('#E54747')
const pt = ref('0.8')
const show = computed(()=>{
  return HSL_lightness(hexToHsl(color.value),pt.value)
})


</script>
