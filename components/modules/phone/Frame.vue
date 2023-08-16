<template>
  <ThumbPage btn-css="max-w-screen-s-2sm" v-if="thumbMode">
    <template #info>
      <div class="my-12">
        <ThumbInput/>
      </div>
    </template>
    <template #content>
      <div class="max-w-screen-s-2sm 2sm:hidden block">
        <ThumbKeyboard class="my-30"/>
      </div>
    </template>
  </ThumbPage>
  <div class="phone-frame" id="step1" v-else>
    <div class="mx-15">
      <div class="head">
        <div class="text-4 font-bold text-left">{{ title }}</div>
        <!--        補上手機號碼與上一頁清除動作-->
      </div>
      <div class="pt-30 max-w-[600px]">
        <InputTextLabel
          class="flex-wrap placeholder:gray-1"
          label="請輸入手機號碼"
          act-label="手機號碼"
          idc="phone"
          input-css="bg-gray-1 border-none outline-0"
          label-css="text-gray-5"
          type="numberString"
          :default-input="phone"
          :warning="warning"
          :warning-message="warningMessage"
          :warning-force="blur"
          @changeInput="changeData"
          @blurInput="setBlur"
        >
        </InputTextLabel>
        <InputKeyboard
          class="my-30 2sm:hidden block"
          :default-text="phone"
          @onChange="onChangeK"
        />
      </div>
    </div>
  </div>
</template>
<script setup>

import {validPhone} from "~/utils/validate";

const emit = defineEmits(['update','inputBlur'])
const props = defineProps({
  title:{
    type: String,
    default: '手機登入'
  }
})
const phone = ref('')
const blur = ref(false)
const thumbMode = ref(true)

const warning = computed(() => {
  return !validPhone(phone.value)
})

const warningMessage = computed(() => {
  if (warning.value)
    return '手機號碼格式錯誤'
  return ''
})

function changeData({id, data}) {
  phone.value = data
  update()
}

function onChangeK(input) {
  phone.value = input
  update()
}

function update() {
  emit('update', phone.value)
}

function setBlur() {
  blur.value = true
  emit('inputBlur', true)
}

onMounted(async () => {
  thumbMode.value = false
})

</script>
