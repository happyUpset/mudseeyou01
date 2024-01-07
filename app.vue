<template>
  <NuxtLayout :style="STYLE" :class="[platform.browserName,platform.deviceName]">
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { STYLE } from '@/const/cssStyle'
import { storeScreen } from '@/store/screen'
import {storeBase} from "@/store/base";
import {platformStore} from "~/store/platform";

const layout = 'default'
// 功能初始
const config = useRuntimeConfig()
const base = storeBase()
base.set_api_url(config.public.apiUrl ?? '')
//--------

// 時間秒跑
initTime()
//--------


// 畫面控制
const platform = platformStore()
const screen = storeScreen()
useScreenResize(handleResizeFunc)
useScreenScroll(handleScrollFunc)

function handleScrollFunc () {
  screen.setScreenEvent()
}
function handleResizeFunc () {
  screen.setScreenEvent()
}
//--------

onMounted(()=>{
  platform.set_is_browser()
  platform.set_is_device()
})

</script>
