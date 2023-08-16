<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">金錢分段</div>
      <div class="my-6">
        <label for="number">顯示金額</label>
        <input class="form-control my-4" id="number" type="text" v-model="value">
      </div>
      <div class="text-4 my-6">{{ currency(value) }}</div>
    </div>
  </div>
</template>

<script setup>
import {useCurrency} from "~/composables/useFilters";

const value = ref(5000)

const {currency} = useCurrency()


</script>
