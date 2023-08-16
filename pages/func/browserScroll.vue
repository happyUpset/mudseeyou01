<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">瀏覽器監聽滾輪軸</div>
      <div class="text-4 my-6 fixed top-50 right-50">軸度{{ `${screen.windowScrollTop}` }}</div>
      <div class="h-[30000px] w-50 bg-linear-red"></div>
    </div>
  </div>
</template>

<script setup>
import {useScreenScroll} from "~/composables/useScreenScroll";
import {storeScreen} from '@/store/screen'

const screen = storeScreen()
const { delay,setUseSTO } = useDelay()


const browserLeave = useScreenScroll((state)=>{
  delay(() => screen.setScreenScrollEvent())
})

onMounted(()=>{
  setUseSTO(false)
})

</script>
