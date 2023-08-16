<template>
  <notifications group="app" :width="screen.platformMax['2xs'] ? '96%' : '400' " :duration="30000" position="top center">
    <template #body="{ item, close }">
      <div
        class="mt-8 px-6 py-16 box relative  shadow-1-2-6 rounded-md border border-gray-3"
        :class="[
            !item.type ?'bg-white':'',
            item.type === 'info' ?'bg-gray-2':'',
            item.type === 'success'?'bg-[#dcfce7]':'',
            item.type === 'error'?'bg-[#fee2e2]':'',
            item.type === 'warning'?'bg-[#ffedd5]':'',
        ]"
        @click="canClick(item.data)">
        <div class="absolute top-6 right-6">
          <EffectsCancelBtn color="gray" :width="20" @handleClick="handleClick(close,$event)"/>
        </div>
        <div class="main pl-2">
          <div class="title text-5 max-w-[calc(100%-22px)] flex">
            <div
              v-if="item.type"
              class="rounded-o w-20 h-20 flex justify-center items-center text-white mr-5"
              :class="[
                  item.type === 'info' ?'bg-gray-5':'',
                  item.type === 'success'?'bg-green':'',
                  item.type === 'error'?'bg-red':'',
                  item.type === 'warning'?'bg-orange':'',
                ]">
<!--              <SvgIcon :name="setNotificationStatus(item.type)" class="w-15 h-15"/>-->
            </div>
            {{ item.title }}
          </div>
          <div v-if="item.text" class="px-8 my-8 text-p" v-html="item.text"/>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script setup>
import {storeScreen} from "@/store/screen";

const screen = storeScreen()

function setNotificationStatus (type) {
  switch (type){
    case 'info':
      return 'info'
    case 'success':
      return 'check'
    case 'error':
      return 'exclamation'
    case 'warning':
      return 'bulb'
    default :
      return ''
  }
}

function canClick(data){
  if(data.clickDo){
    data.clickDo()
  }
}

function handleClick(close,$e){
  $e.stopPropagation()
  close()
}

</script>
