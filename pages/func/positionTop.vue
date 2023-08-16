<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white relative">
    <div class="">
      <div class="text-2 py-16">div物件高度取得，與document的頂部相減</div>
      <div class="my-6">
        <label for="number" type="number">調整margin-top</label>
        <input class="form-control my-4" id="number" type="text" v-model="value" @input="dataWork">
        <small>*無論 top,margin 都會計算與document的頂部計算相差值*</small>
      </div>
      <div class="bg-red w-50 h-50 top-0 text-white text-4 flex justify-center items-center" id="target" :style="{marginTop:value+'px'}">{{ input }}</div>
    </div>
  </div>
</template>

<script setup>
import {usePosition} from "~/composables/usePosition";

const value = ref(50)
const input = ref(0)

const {getPositionTop} = usePosition()

function dataWork(){
  input.value = getPositionTop('target')
}

onMounted(()=>{
  dataWork()
})


</script>
