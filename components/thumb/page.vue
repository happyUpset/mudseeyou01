<template>
  <div id="thumb-page" class="">
    <slot name="back">
    </slot>
    <div class="mx-15">
      <slot name="title">
        <div class="bg-gray-3 w-[160px] h-28 rounded-sm"/>
      </slot>
      <div class="max-w-[600px]">
        <slot name="info">
          <div class="my-30">
            <div
              v-for="key in showLine"
              class="bg-gray-3 my-12 h-24 rounded-sm"
              :style="{width: `${random(200,100)}px`}"
            />
          </div>
        </slot>
        <slot name="content">
        </slot>
      </div>
    </div>
    <LazyLayoutsUnderBtnPanel
      :warning="true"
      title="下一步"
      :class="btnCss"
      class="fixed bottom-0 w-1/1">
    </LazyLayoutsUnderBtnPanel>
  </div>
</template>

<script setup>
 const props = defineProps({
   line:{
     type: [String,Number],
     default: ''
   },
   btnCss:{
     type: String,
     default: ''
   }
 })

 const showLine = computed(()=>{
   if(props.line === '')
     return 3
   return parseInt(props.line)
 })

 function random(value,min) {
   return Math.round(Math.random() * value) + min
 }
</script>
