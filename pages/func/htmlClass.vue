<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">標籤 css,style 控制功能</div>
      <div class="text-4">以下使用 '下面的小方框做示範' 作為示範</div>

      <small>*使用css時，需要該css經存在，如果是用tailwind時，如果再載入時沒有偵測到就不會有效果*</small>
      <div class="my-6">
        <label for="number">輸入指定的class名稱</label>
        <input class="form-control my-4" id="number" type="text" v-model="css" @input="hasClassCheck">
        <div class="btn-box flex my-12">
          <div class="btn-base tiny out-teal mx-6" @click="workRemoveClass">清除</div>
          <div class="btn-base tiny teal mx-6" @click="workCss">建立</div>
        </div>
      </div>
      <div class="my-16">
        <div class="text-5 py-6" v-if="targetCss">class => {{ targetCss }}</div>
        <div class="text-red" v-if="targetCssHas !== null"><span class="text-5">{{css}}</span> {{ targetCssHas ? '存在' : '不存在' }}</div>
      </div>
      <div class="my-6">
        <label for="number">輸入欲放置的style名稱</label>
        <input class="form-control my-4" id="number" type="text" v-model="styleTitle" @input="hasStyleCheck">
        <label for="number">輸入欲放置的style內容</label>
        <input class="form-control my-4" id="number" type="text" v-model="styleValue">
        <div class="btn-box flex my-12">
          <div class="btn-base tiny out-teal mx-6" @click="workRemoveStyle">清除</div>
          <div class="btn-base tiny teal mx-6" @click="workStyle">建立</div>
        </div>
      </div>
      <div class="my-16">
        <div class="text-5 py-6" v-if="targetStyle">style => {{ targetStyle }}</div>
        <div class="text-red" v-if="targetStyleHas !== null"><span class="text-5">{{styleTitle}}</span> {{ targetStyleHas ? '存在' : '不存在' }}</div>
      </div>
      <div class="my-6">
        <div class="min-w-[100px] min-h-[100px] bg-[#8881]" id="target">我是目標</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {hasClass,
  addClass,
  hasClassAll,
  removeClass,
  hasStyle,
  hasStyleAll,
  addStyle,
  removeStyle} from "~/utils/html";

const css = ref('text-4')
const styleTitle = ref('padding')
const styleValue = ref('50px')

const target = ref(null)
const targetCss = ref('')
const targetStyle = ref('')
const targetCssHas = ref(null)
const targetStyleHas = ref(null)

function workCss(){
  addClass(target.value,css.value)
  targetCss.value = hasClassAll(target.value)
  hasClassCheck()
}
function workStyle(){
  addStyle(target.value,styleTitle.value,styleValue.value)
  targetStyle.value = hasStyleAll(target.value)
  hasStyleCheck()
}

function hasClassCheck(){
  targetCssHas.value = hasClass(target.value,css.value)
}

function hasStyleCheck(){
  targetStyleHas.value = hasStyle(target.value,styleTitle.value)
}

function workRemoveClass(){
  removeClass(target.value,css.value)
  targetCssHas.value = hasClass(target.value,css.value)
  targetCss.value = hasClassAll(target.value)
}

function workRemoveStyle(){
  removeStyle(target.value,styleTitle.value)
  targetStyleHas.value = hasStyle(target.value,styleTitle.value)
  targetStyle.value = hasStyleAll(target.value)
}

onMounted(()=>{
  target.value = document.getElementById('target')
})

</script>
