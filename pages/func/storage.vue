<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">儲存資訊 `local` `cookie` `session`</div>
      <div class="my-6">
        <label for="cookie">設定cookie</label>
        <input class="form-control my-4" id="cookie" type="text" v-model="cookie">
        <div class="flex">
          <div class="btn-base tiny teal" @click="storage.setCookie('cookie',cookie)">調整</div>
          <div class="btn-base tiny out-teal" @click="storage.removeCookie('cookie')">清除</div>
        </div>
      </div>
      <div class="my-6">
        <label for="local">設定local</label>
        <input class="form-control my-4" id="local" type="text" v-model="local">
        <div class="flex">
          <div class="btn-base tiny teal" @click="storage.setLocal('local',local)">調整</div>
          <div class="btn-base tiny out-teal" @click="storage.removeLocal('local')">清除</div>
        </div>
      </div>
      <div class="my-6">
        <label for="session">設定session</label>
        <input class="form-control my-4" id="session" type="text" v-model="session">
        <div class="flex">
          <div class="btn-base tiny teal" @click="storage.setSession('session',session)">調整</div>
          <div class="btn-base tiny out-teal" @click="storage.removeSession('session')">清除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import storage from '@/utils/storage'

const session = ref(null)
const cookie = ref(null)
const local = ref(null)
// const cookieUse = useCookie("cookie"); 可以使用內建替代

onMounted(()=>{
  // cookie.value = cookieUse.value
  cookie.value = storage.getCookie('cookie')
  local.value = storage.getLocal('local')
  session.value = storage.getSession('session')
})


</script>
