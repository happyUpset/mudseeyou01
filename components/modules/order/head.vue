<template>
  <div class="contents">
    <div class="text-4 font-bold" :class="counter?'':'text-left'">{{ title }}</div>
    <div class="pt-50 flex text-6 items-center">
      <div class="contents" v-if="type === '1'">
        <NuxtIcon2 name="table-tennis" class="w-14 h-16 mr-6"/>
        <div class="">臨打</div>
      </div>
      <div class="contents" v-else-if="type === '2'">
        <NuxtIcon2 name="whistle" class="w-14 h-16 mr-6"/>
        <div class="">教學</div>
      </div>
      <div class="contents" v-else-if="type === '3'">
        <NuxtIcon2 name="member" class="w-14 h-16 mr-6"/>
        <div class="">會員方案 : 平日暢打30天</div>
      </div>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  counter:{
    type: Boolean,
    default: false
  },
  type:{
    type: String
  },
  title:{
    type: String,
    default: '選擇預約桌號'
  }
})
</script>
