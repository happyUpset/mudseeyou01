<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">瀏覽器離開監聽</div>
      <div class="my-6">
        <label for="number">調整過期時間</label>
        <input class="form-control my-4" id="number" type="text" v-model="value" @input="setMinSecond(value)">
      </div>
      <div class="text-4 my-6">{{ browserLeave.returnData }}</div>
      <div class="" v-if="returnData !== false">一共離開{{lastTimeCounts}}秒,{{ returnData === true ? '超過過期時間' : '沒超過過期時間' }}</div>
    </div>
  </div>
</template>

<script setup>
import {useVisibility} from "~/composables/useVisibility";
import {useLeaveWork} from "~/composables/useLeaveWork";

const value = ref(5)

const {lastTimeCounts, returnData, handleVisibilityFunc, setMinSecond} = useLeaveWork((state)=>{
  setLeaveWork(state)

})

const browserLeave = useVisibility((state)=>{
  handleVisibilityFunc(state)

})

function setLeaveWork(state){
  //state -> null, false, true
  // console.log('setLeaveWork state',state)
}

onMounted(()=>{
  setMinSecond(value.value)
})

</script>
