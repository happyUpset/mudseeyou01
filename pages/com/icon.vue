<template>
  <div class="container my-20">
<!--    <InputText-->
<!--      idc="name"-->
<!--      label="套用名稱"-->
<!--      :default-input="options.name"-->
<!--      @changeInput="changeInput"/>-->
<!--    <div class="my-20">icon-class="{{ options.name }}"</div>-->
<!--    <div class="filter">-->
<!--      <div class="filter">-->
<!--        <InputText-->
<!--          :label="{-->
<!--            id: 'w',-->
<!--            body: '寬度',-->
<!--          }"-->
<!--          type="number"-->
<!--          :default-input="options.w"-->
<!--          @changeInput="changeInput"/>-->
<!--      </div>-->
<!--      <div class="filter">-->
<!--        <InputText-->
<!--          :label="{-->
<!--            id: 'h',-->
<!--            body: '高度',-->
<!--          }"-->
<!--          type="number"-->
<!--          :default-input="options.h"-->
<!--          @changeInput="changeInput"/>-->
<!--      </div>-->
<!--      <div class="filter">-->
<!--        <InputText-->
<!--          :label="{-->
<!--            id: 'color',-->
<!--            body: '顏色',-->
<!--          }"-->
<!--          :default-input="options.color"-->
<!--          @changeInput="changeInput"/>-->
<!--      </div>-->
<!--    </div>-->
    <section class="">
      <h1 class="text-5 my-20">通用</h1>
      <div class="icon grid grid-cols-5 gap-8 2sm:grid-cols-3">
        <div class="shadow-1-2-6 p-12" v-for="icon in modules">
          <svg-icon :name="icon"  class="mx-auto w-35 h-35 text-[#456789]"/>
<!--          <NuxtIcon2-->
<!--            :name="icon"-->
<!--            :style="{-->
<!--              width: options.w + 'px',-->
<!--              height: options.h + 'px',-->
<!--              color: options.color,-->
<!--            }"-->
<!--             class="mx-auto"/>-->
          <div class="">{{ icon }}</div>
        </div>
      </div>
    </section>
    <section>
      <h1 class="text-5 my-20">分類</h1>
      <div class="icon grid grid-cols-5 gap-8 2sm:grid-cols-3">
        <div class="shadow-1-2-6 p-12" v-for="icon in category">
          <svg-icon :name="icon"  class="mx-auto w-35 h-35 text-[#456789]"/>
<!--          <NuxtIcon2-->
<!--            :name="icon"-->
<!--            :style="{-->
<!--            width: options.w + 'px',-->
<!--            height: options.h + 'px',-->
<!--            color: options.color,-->
<!--          }"/>-->
          <div class="">{{ icon }}</div>
        </div>
      </div>
    </section>
    <section>
      <h1 class="text-5 my-20">設備</h1>
      <div class="icon grid grid-cols-2 gap-8 2sm:grid-cols-3">
        <div class="shadow-1-2-6 p-12" v-for="icon in amenities">
          <SvgIcon :name="icon"  class="mx-auto w-35 h-35 text-[#456789]"/>
          <div class="">{{ icon }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

const options = reactive({
  w: 20,
  h: 20,
  color: '',
  name: 'QRCode',
})
const modules = ref(null)
const category = ref(null)
const amenities = ref(null)

function setFiles(name){
  let files = null
  if(name === 'icon')
    files = import.meta.glob('@/assets/sprite/svg/*.svg');
  else if(name === 'amenities')
    files = import.meta.glob('@/assets/sprite/svg/common/*.svg');
  else if(name === 'category')
    files = import.meta.glob('@/assets/sprite/svg/banner/*.svg');
  else
    return [];

  console.log('files',files)
  // you do not need `import app from './modules/app'`
  // it will auto require all vuex module from modules file
  let i = 0
  return Object.keys(files).reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    // modules[i] = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    modules[i] = modulePath.replace(/\/assets\/sprite\/svg\/(.*?)(?:\.svg)$/, '$1')
    i++
    console.log(modules)
    return modules
  }, {})
}
function changeInput(data){
  options[data.id] = data.data
}

onMounted(()=>{
  modules.value = setFiles('icon')
  category.value = setFiles('category')
  amenities.value = setFiles('amenities')
})

</script>
