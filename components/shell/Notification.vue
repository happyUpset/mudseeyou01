<template>
  <transition name="fade">
    <div class="notification fixed bottom-80 w-[calc(100%-30px)]" v-if="show">
      <div
        class="rounded-md p-12 relative"
        :class="[color,bg]">
        <div class="close-btn absolute -top-10 -right-10" @click="closeModal">
          <NuxtIcon2 name="times-o2" class="w-20 h-20" :class="color"/>
        </div>
        <div class="flex items-center">
          <div class="icon mr-8">
            <div class="bg-orange text-white font-extrabold w-30 h-30 rounded-o flex justify-center items-center">!</div>
          </div>
          <div class="text-left">
            <div class="">{{ title }}</div>
            <div class="">{{ text }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>

const emit = defineEmits(['setClose'])
const props = defineProps({
  show:{
    type: Boolean,
    default: false
  },
  title:{
    type: String,
    default: ''
  },
  text:{
    type: String,
    default: ''
  },
  color:{
    type: String,
    default: ''
  },
  bg:{
    type: String,
    default: ''
  }
})
function closeModal(){
  emit('setClose')
}
</script>
