<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">瀏覽器改編高寬</div>
      <div class="text-4 my-6">高、寬{{ `${screen.documentHeight},${screen.documentWidth}` }}</div>
    </div>
  </div>
</template>

<script setup>
import {useScreenResize} from "~/composables/useScreenResize";
import {storeScreen} from '@/store/screen'

const screen = storeScreen()
const { delay,setUseSTO } = useDelay()


const browserLeave = useScreenResize((state)=>{
  delay(() => screen.setScreenEvent())
})

onMounted(()=>{
  setUseSTO(false)
})

</script>
