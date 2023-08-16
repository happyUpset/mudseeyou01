<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">基本驗證器</div>
      <div class="grid grid-cols-4 gap-12">
        <div class="my-6 border border-gray-3 rounded-lg p-12">
          <label for="external">超連結合法</label>
          <div class="">
            <small>https?://</small>,
            <small>mailto://</small>,
            <small>tel://</small>
          </div>
          <input class="form-control my-4" id="external" type="text" v-model="external">
          <div class="text-4 my-6">{{ isExternal(external) }}</div>
        </div>
        <div class="my-6 border border-gray-3 rounded-lg p-12">
          <label for="username">身份</label>
          <div class="">
            <small>admin</small>,
            <small>editor</small>
          </div>
          <input class="form-control my-4" id="username" type="text" v-model="username">
          <div class="text-4 my-6">{{ validUsername(username) }}</div>
        </div>
        <div class="my-6 border border-gray-3 rounded-lg p-12">
          <label for="url">正確網址</label>
          <input class="form-control my-4" id="url" type="text" v-model="url">
          <div class="text-4 my-6">{{ validURL(url) }}</div>
        </div>
        <div class="my-6 border border-gray-3 rounded-lg p-12">
          <label for="phone">正確台灣手機</label>
          <div class="">
            <small>09開頭，共10碼</small>
          </div>
          <input class="form-control my-4" id="phone" type="text" v-model="phone">
          <div class="text-4 my-6">{{ validPhone(phone) }}</div>
        </div>
        <div class="my-6 border border-gray-3 rounded-lg p-12">
          <label for="code">使用簡訊碼</label>
          <div class="">
            <small>預設4碼</small>
          </div>
          <input class="form-control my-4" id="code" type="text" v-model="code">
          <div class="text-4 my-6">{{ validCode(code) }}</div>
        </div>
        <div class="my-6 border border-gray-3 rounded-lg p-12">
          <label for="lowerCase">檢查是否皆為小寫</label>
          <div class="">
            <small>需全部小寫，只接受英文</small>
          </div>
          <input class="form-control my-4" id="lowerCase" type="text" v-model="lowerCase">
          <div class="text-4 my-6">{{ validLowerCase(lowerCase) }}</div>
        </div>
        <div class="my-6 border border-gray-3 rounded-lg p-12">
          <label for="upperCase">檢查是否皆為大寫</label>
          <div class="">
            <small>需全部大寫，只接受英文</small>
          </div>
          <input class="form-control my-4" id="upperCase" type="text" v-model="upperCase">
          <div class="text-4 my-6">{{ validUpperCase(upperCase) }}</div>
        </div>
        <div class="my-6 border border-gray-3 rounded-lg p-12">
          <label for="alphabets">檢查是否為英文</label>
          <div class="">
            <small>只接受英文</small>
          </div>
          <input class="form-control my-4" id="alphabets" type="text" v-model="alphabets">
          <div class="text-4 my-6">{{ validAlphabets(alphabets) }}</div>
        </div>
        <div class="my-6 border border-gray-3 rounded-lg p-12">
          <label for="email">檢查是否為電子信箱</label>
          <div class="">
            <small>aaa@bbb.cc</small>
          </div>
          <input class="form-control my-4" id="email" type="text" v-model="email">
          <div class="text-4 my-6">{{ validEmail(email) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {isExternal,
  validUsername,
  validURL,
  validPhone,
  validCode,
  validLowerCase,
  validUpperCase,
  validAlphabets,
  validEmail} from '@/utils/validate'

const external = ref('http://')
const username = ref('editor')
const phone = ref('0987123456')
const code = ref('0123')
const lowerCase = ref('asdgh')
const upperCase = ref('ASDGH')
const alphabets = ref('asfasGASFASG')
const email = ref('aaa@bbb.cc')
const url = ref('http://google.com/aaa?filter[classes][value]=d4-sorcerer')


</script>
