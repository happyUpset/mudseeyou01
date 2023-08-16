<template>
  <div class="">
    <transition name="fade">
<!--      v-if="modal.isMask"-->
      <div
        v-if="modal.hasSomeModal"
        class="mask-frame-box absolute visible top-0 left-0 w-1/1 h-1/1 z-60">
        <div
          class="mask fixed transition-all top-0 left-0 w-[100vw] h-[100vh] outline-0 opacity-80 bg-[#000]">
        </div>
      </div>
    </transition>
    <transition name="fade">
      <!--   透明遮罩    -->
      <div
        v-if="modal.hasSomeShowed"
        class="mask-frame-box absolute visible top-0 left-0 w-1/1 h-1/1 z-60">
        <div
          class="mask fixed transition-all top-0 left-0 w-[100vw] h-[100vh] outline-0"
          @click="setMask(false)">
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="hasSPModal"
        class="mask-frame-box absolute visible top-0 left-0 w-1/1 h-1/1 z-60">
        <div
          class="mask fixed transition-all top-0 left-0 w-[100vw] h-[100vh] outline-0 opacity-80 bg-[#000]"
          @click="setSPMask(false)">
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>

import {computed} from "vue";
import {storeModal} from "@/store/modal";

const modal = storeModal()
const emit = defineEmits(['close'])

const hasSPModal = computed(()=> [...Object.keys(modal.spacialModals)].some(modalName => modal.spacialModals[modalName]))


function setMask(boolean){
  modal.set_mask(boolean)
  emit('close')
}
function setSPMask(boolean){
  modal.close_spacial_modal_all(boolean)
  emit('close')
}

</script>
