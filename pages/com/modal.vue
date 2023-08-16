<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">燈箱使用</div>
      <div class="my-12">
        <div class="btn-base tiny teal" @click="modal.add_base_modals('first_modal')">開啟第一個燈箱</div>
      </div>
    </div>
    <ShellBaseModal
      md
      name="first_modal">
      <template #default="{close}">
        <ShellSlotModal
          title="第一個燈箱"
          close-btn
          :close="close"
          :confirm="{body: '開啟第二個燈箱'}"
          @confirmBtn="modal.add_base_modals('second_modal')">
          <template #item="{item}">
            <div class="mx-20 mb-40">
              <div class="content">
                <p>這是第一個燈箱的資訊</p>
                <div class="mt-12 btn-base tiny teal" @click="modal.add_base_modals('second_modal')">不關閉第一燈箱開啟第二燈箱</div>
              </div>
            </div>
          </template>
        </ShellSlotModal>
      </template>
    </ShellBaseModal>

    <ShellBaseModal
      md
      has-mask
      name="second_modal">
      <template #default="{close}">
        <ShellSlotModal
          title="第二個燈箱"
          close-btn
          :close="close"
          :cancel-show="false"
          :confirm-show="false">
          <template #item="{item}">
            <div class="mx-20 mb-40">
              <div class="content">
                這是第二個燈箱的資訊
                增加 has-mask 屬於自己的mask效果
                <p>目前內部mask 與 modal共用同一個 transition 效果</p>
              </div>
            </div>
          </template>
        </ShellSlotModal>
      </template>
    </ShellBaseModal>
  </div>
</template>

<script setup>
import {storeModal} from "~/store/modal";

const modal = storeModal()

</script>
