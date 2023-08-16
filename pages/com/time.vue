<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">時間顯示</div>
      <div class="my-12">
        <input type="date" v-model="date">
        <input type="time" v-model="time">
        <div class="mt-24 text-5">Format</div>
        <ShellCountDownTimer :data-in="show"/>
        <div class="mt-12 text-5"> Relative</div>
        <ShellCountDownTimer :data-in="show" types="Relative"/>
        <div class="mt-12 text-5"> Calendar</div>
        <ShellCountDownTimer :data-in="show" types="Calendar"/>
        <div class="mt-12 text-5"> Simple</div>
        <ShellCountDownTimer :data-in="show" types="Simple"/>
        <div class="mt-12 text-5"> DayTime</div>
        <ShellCountDownTimer :data-in="show" types="DayTime"/>
        <div class="mt-12 text-5">SimpleDayTime</div>
        <ShellCountDownTimer :data-in="show" types="SimpleDayTime"/>

        <div class="mt-24 text-5">Format tw</div>
        <ShellCountDownTimer :data-in="show" is-taiwan format-out="民國y年MM月dd日 ccc HH:mm:ss"/>
        <div class="mt-12 text-5"> Simple tw</div>
        <ShellCountDownTimer :data-in="show" is-taiwan types="Simple"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DateTime } from "luxon";

const date = ref(DateTime.now().toFormat('yyyy-MM-dd'))
const time = ref(DateTime.now().toFormat('HH:mm:ss'))

const show = computed(()=>{
  return date.value + ' ' + time.value
})
</script>
