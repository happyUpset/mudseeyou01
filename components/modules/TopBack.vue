<template>
  <div class="relative h-50">
    <div class="back absolute left-10 top-7" v-if="link">
      <nuxt-link class="" :to="link">
        <div class="cursor-pointer p-12">
          <NuxtIcon2 name="back" class="w-14 h-12"/>
        </div>
      </nuxt-link>
    </div>
    <div class="time h-1/1 pr-20 flex justify-end items-center" v-if="time">
      <ShellCountDownTimer :timer="base.timer" format-out="ccc HH:mm:ss"/>
    </div>
  </div>
</template>

<script setup>
import {storeBase} from "~/store/base";

const props = defineProps({
  link:{
    type: [Object,null],
    default: ()=>{
      return null
    }
  },
  time:{
    type: Boolean,
    default: false
  }
})

const base = storeBase()

</script>
