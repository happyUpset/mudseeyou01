<template>
  <div class="mx-15 h-1/1 bg-white">
    <div class="pt-30 text-center">
      <NuxtIcon2 name="banner/title" class="mx-auto"/>
      <NuxtIcon2 name="banner/sub-title" class="mt-20 mx-auto"/>
    </div>
    <div class="text-gray-3 fixed bottom-2 left-0 flex items-center w-1/1">
      <div class="absolute right-4 top-0">
        <div class="rounded-md py-2 px-4 bg-gray-2 text-white mr-4" @click="logout" v-if="auth.loginCheck">登出</div>
        {{ version }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {URL} from "~/const/routerName";
import {storeAuth} from "~/store/auth";
import {storeForm} from "~/store/form";

const auth = storeAuth()
const runtimeConfig = useRuntimeConfig()
const bookings = storeForm()

const version = computed(()=> runtimeConfig.public.version)

function logout() {
  auth.logout()
  bookings.reset_form_base()
}
</script>
