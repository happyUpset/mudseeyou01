<template>
  <div class="expandable">
    <div class="area mt-10 relative h-1/1 overflow-hidden transition-max-height" :style="{maxHeight: maxHeightShow}" >
      <div class="area-box" ref="expandableText">
        <slot name="expandableText">
          <div class="text leading-[2.3rem]" :class="bodyCss" v-if="isHtml" v-html="body"></div>
          <div class="text leading-[2.3rem] whitespace-pre-line" :class="bodyCss" v-else >{{ body }}</div>
        </slot>
      </div>
      <div class="cover absolute bottom-0 left-0 w-1/1 pointer-events-none transition-height bg-extend-mask" :class="!showAll && needShadow ?'h-[92px]':'h-0'"/>
    </div>
    <div class="btn-box mt-28 mb-12 flex" v-if="hasNeedBtn">
      <!--      <div class="btn-base minor deep-blue"-->
      <!--           @click="setShowAll">-->
      <!--        {{ showAll?$t('base.hide-info'):$t('base.show-info') }}-->
      <!--      </div>-->
      <div class="btn-base out-teal tiny text-7"
           @click="setShowAll">
        {{ showAllText }}
      </div>
    </div>
  </div>
</template>

<script setup>

import {storeScreen} from "~/store/screen";

const emit = defineEmits(['toggle'])
const props = defineProps({
  isHtml: {
    type: Boolean,
    default: false
  },
  body: {
    type: String,
    default: ''
  },
  bodyCss: {
    type: String,
    default: ''
  },
  isExpanded:{
    type: Boolean,
    default: false
  },
  minHeight:{
    type: [String, Number],
    default: 184
  },
  maxHeight:{
    type: [String, Number],
    default: 300
  },
  // 自動無視最高高度 自適應
  autoHeight:{
    type: Boolean,
    default: false
  },
  changeCounts:{
    type: Number,
    default: 0
  },
  hasBtn:{
    type: Boolean,
    default: false
  },
  btnBody:{
    type: [Object,null],
    default: ()=>{
      return null
    }
  }
})
const showAll = ref(false)
const textHeight = ref(300)
const expandableText = ref()
const screen = storeScreen()
const unwatch = watchEffect(() => {
  if(props.autoHeight && screen && screen.documentWidth && expandableText.value && props.changeCounts){
    handleResize()
  }
})
//screen.documentWidth

const minHeightUse = computed(()=>parseInt(props.minHeight))
const maxHeightShow = computed(()=>showAll.value? textHeight.value+'px' :minHeightUse.value+'px')

const needShadow = computed(()=>textHeight.value > minHeightUse.value)
const hasNeedBtn = computed(()=>props.hasBtn && needShadow.value)
const showAllText = computed(()=>{
  return props.btnBody
    ? showAll.value
      ? props.btnBody.toClose
      : props.btnBody.toOpen
    : showAll.value
      ? `隱藏所有時段`
      : `顯示所有時段`
})

function handleResize () {
  if(expandableText.value){
    requestAnimationFrame(()=>{
      console.log('expandableText.value.scrollHeight',expandableText.value.scrollHeight)
      //取得過線固定畫面數值
      textHeight.value = expandableText.value.scrollHeight
    })
  }
}
function setShowAll(){
  showAll.value = !showAll.value
  setTimeout(()=>{
    emit('toggle',showAll.value)
  },300)
}

watch(()=>props.isExpanded,(new1)=>{
  showAll.value = new1
},{
  immediate: true
})

onUnmounted(()=>{
  unwatch()
})

</script>
