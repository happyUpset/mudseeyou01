<template>
  <ShellModal
    class="modal-main relative"
    :title="title"
    :is-loading="isLoading"
    @close="closeModal">
    <template #prevButton="props">
      <slot
        name="prevButton"
        :item="{modalProps:props}"
        :cancelBtn="cancelBtn"
        :confirmBtn="confirmBtn"/>
    </template>
    <template #item="props">
      <slot
        name="item"
        :item="{modalProps:props,updateData:updateData}"/>
    </template>
    <template #footer="props">
      <slot
        name="foot"
        :item="{modalProps:props}"
        :cancelBtn="cancelBtn"
        :confirmBtn="confirmBtn">
        <div
          class="footer w-1/1  mt-12 mb-30 py-14 "
          v-if="cancelShow || confirmShow">
          <div class="btn-box flex-nw justify-around -my-6">
            <div
              class="btn-base my-6 mx-16 flex-0-auto modal brick-s-r"
              :class="cancel.css || 'out-gray'"
              @click="cancelBtn"
              v-if="cancelShow">
              {{ cancel.body || '取消' }}
            </div>
            <div
              class="btn-base my-6 mx-16 flex-0-auto modal brick-s-r"
              :class="confirm.css || 'teal'"
              @click="confirmBtn"
              v-if="confirmShow && !confirm.link">
              {{ confirm.body || '送出' }}
            </div>
            <nuxt-link
              :to="confirm.link"
              v-else-if="confirmShow && confirm.link">
              <div
                class="btn-base my-6 mx-16 flex-0-auto modal brick-s-r"
                :class="confirm.css || 'teal'">
                {{ confirm.body || '送出' }}
              </div>
            </nuxt-link>
          </div>
        </div>
      </slot>
    </template>
  </ShellModal>
</template>

<script setup>

import {onMounted, watch} from "vue";

const emit = defineEmits(['cancelBtn','confirmBtn'])
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
  closeBtn:{
    type: Boolean,
    default: false
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
