<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">剪貼簿</div>
      <div class="my-6">
        <label for="number">要複製的</label>
        <input id="copy" class="form-control my-4" type="text" v-model="value">

        <button
          class="btn-base tiny red clip-btn-js"
          data-clipboard-target="#copy">
          複製
        </button>
      </div>
      <div class="my-6">
        <label for="number">多餘的框</label>
        <input class="form-control my-4" type="text">
      </div>
    </div>
  </div>
</template>

<script setup>
import ClipboardJS from "clipboard"
import {useCurrency} from "~/composables/useFilters";
import {useNotification} from "@kyvg/vue3-notification";

const clipboard = ref(null)
const value = ref('abc123')

const {currency} = useCurrency()
const notification = useNotification()

onMounted(()=>{
  clipboard.value = new ClipboardJS('.clip-btn-js')
  clipboard.value.on('success', (e) => {
    notification.notify({
      title: "success 🎉",
    });
    e.clearSelection()
  })
})

</script>
