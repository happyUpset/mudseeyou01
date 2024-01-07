<template>
  <div class="the-collapse">
    <div class="">
      <div class="" :class="titleCss" @click="setOpen">
        <div class="flex-1-auto">{{ title }}</div>
        <div class="flex-0-auto"> > </div>
      </div>
      <div
        :id="`collapse_${key}`"
        :style="{maxHeight:open?height+'px':'0'}"
        class="overflow-hidden transition-all">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  key: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: '標題'
  },
  titleCss:{
    type: String,
    default: 'w-1/1 flex bg-[#8881]'
  }
})

const open = ref(false)
const height = ref(0)


function setOpen(){
  open.value = !open.value
  if(process.client){
    let ele = document.getElementById(`collapse_${props.key}`)
    if(ele){
      height.value = ele.scrollHeight
    }
  }
}

</script>
