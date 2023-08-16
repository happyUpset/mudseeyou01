<template>
<!--  class="modal-main bg-[transparent_!important]"-->
  <ShellModal
    class="modal-main"
    :is-loading="isLoading"
    @close="closeModal">
    <template #item="props">
      <slot
        name="item"
        :item="{modalProps:props,updateData:updateData}"/>
    </template>
  </ShellModal>
</template>

<script setup>

import {onMounted, watch} from "vue";

const emit = defineEmits(['cancelBtn'])
const props = defineProps({
  title:{
    type: String,
    default: ''
  },
  cancel:{
    type: Object,
    default: () => {
      return {
        body: null,
        css: null
      }
    }
  },
  tempData:{
    type: [Object,null],
    default: () => {
      return null
    }
  },
  cancelShow:{
    type: Boolean,
    default: true
  },
  confirm:{
    type: Object,
    default: () => {
      return {
        body: null,
        css: null,
        link: null
      }
    }
  },
  confirmShow:{
    type: Boolean,
    default: true
  },
  closeConfirm:{
    type: [Boolean, null],
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  close: {
    type: Function,
    default: () => {
      return () => {}
    }
  }
})

const data = ref(null)

watch(()=>props.closeConfirm,(new1)=>{
  if(new1 === true)
    closeModal();
},{
  immediate: true
})

function updateData(newData){
  data.value = newData
}

function cancelBtn(){
  emit('cancelBtn',data.value)
  closeModal();
}

function confirmBtn(){
  emit('confirmBtn',data.value)
  if(props.closeConfirm === null)
    closeModal();
}

function closeModal(){
  props.close()
}

onMounted(()=>{
  data.value = JSON.parse(JSON.stringify(props.tempData))
})
</script>
