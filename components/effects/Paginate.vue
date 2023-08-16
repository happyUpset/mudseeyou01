<template>
  <div v-show="totalPage > 1"
       class="text-center paginate--box">
    <div class="paginate" :class="color">
      <div
        v-if="hasMultiplePage"
        class="arrow-box left-btn paginate-arrow-background-color"
        :class="{disabled:isFirstPage}"
        @click="changePageByArrow(-1,'toMin')"
      >
        <div
          :class="[isFirstPage?'disabled bg-gray-4':'bg-black']"
          class="arrows paginate-arrow-color"/>
      </div>
      <div v-if="type === 'simple'" class="text">
        <span
          class="paginate-simple-number-color"
        >
          {{ currentPage }} / {{ totalPage }}
        </span>
      </div>
      <div
        v-else
        class="text"
      >
      <span
        v-for="(page ,pageKey) in displayPagination"
        :key="pageKey"
        :class="[{isCurrentPage:inCurrentPage(page)} ,page === stepString ? 'disabled' : '']"
        class="paginate__button paginate-normal-number-color"
        @click="changePage(page)"
      >
        {{ page }}
      </span>
      </div>
      <div
        v-if="hasMultiplePage"
        class="arrow-box right-btn paginate-arrow-background-color"
        :class="{disabled:isLastPage}"
        @click="changePageByArrow(1,'toMax')"
      >
        <div
          :class="[isLastPage?'disabled bg-gray-4':'bg-black']"
          class="arrows paginate-arrow-color"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, reactive, watch} from "vue";

const emit = defineEmits(['changePage'])
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  color: {
    type: String,
    default: 'light'
  },
  config: {
    type: Object,
    default: () => {
      return {
        // nearNum: 2,
        // leftNum: 2,
        // rightNum: 2,
      }
    }
  },
  isShowSet: {
    type: Object,
    default: () => {
      return {
        // corners: true,
        // firstOne: true,
        // lastOne: true,
        // arrows: true,
      }
    }
  },
  type: {
    type: String,
    default: 'normal' // simple
  },
  totalPageName: {
    type: String,
    default: 'lastPage'
  },
  currentPageName: {
    type: String,
    default: 'currentPage'
  }
})

const isShowed = reactive({
  // corners: true,
  firstOne: true,
  lastOne: true,
  arrows: true
})

const configEd = reactive({
  // nearNum: 3,
  leftNum: 2,
  rightNum: 2
})

const totalPage = ref(0)
const currentPage = ref(1)
const stepString = ref('...')

const hasMultiplePage = computed(()=> totalPage.value > 1 )
const isLastPage = computed(()=> currentPage.value >= totalPage.value )
const isFirstPage = computed(()=> currentPage.value <= 1 )
const range = computed(()=> configEd.leftNum + 3 + configEd.rightNum )
const isMinStatus = computed(()=> range.value >= totalPage.value )
const displayPagination = computed(()=> {
  let displayArr, pagination
  const showFirstOne = isShowed.firstOne
  const showLastOne = isShowed.lastOne
  const nearLeftNum = configEd.leftNum
  const nearRightNum = configEd.rightNum

  if (isMinStatus.value) {
    displayArr = getPagination(1, totalPage.value)
  } else if (currentPage.value <= nearLeftNum + 1) {
    pagination = getPagination(1, range.value)
    displayArr = showLastOne ? last(pagination) : displayArr
  } else if (currentPage.value >= totalPage.value - nearRightNum) {
    pagination = getPagination(totalPage.value - (range.value - 1), totalPage.value)
    displayArr = showFirstOne ? first(pagination) : displayArr
  } else {
    pagination = getPagination(currentPage.value - nearLeftNum, currentPage.value + nearRightNum)
    displayArr = showLastOne ? last(pagination) : displayArr
    displayArr = showFirstOne ? first(pagination) : displayArr
  }
  return displayArr
})

watch(()=>props.data,()=>{
  configAll()
  settingAll()
},{
  immediate: true
})

function configAll(){
  setShowingNumber()
  setShowingCorners()
  setShowingArray()
}

function settingAll(){
  settingWork(props.currentPageName, currentPage)
  settingWork(props.totalPageName, totalPage)
}

function settingWork(name, toData) {
  if (props.data[name] !== null && typeof props.data[name] === 'number') {
    toData.value = props.data[name]
  } else {
    // console.log(name + ' not found.');
  }
}

function setShowingCorners() {
  if (props.isShowSet?.corners !== null && typeof props.isShowSet.corners === 'boolean') {
    isShowed.firstOne = props.isShowSet.corners
    isShowed.lastOne = props.isShowSet.corners
    return
  }
  if (props.isShowSet.firstOne !== null && typeof props.isShowSet.firstOne === 'boolean') {
    isShowed.firstOne = props.isShowSet.firstOne
  }
  if (props.isShowSet.lastOne !== null && typeof props.isShowSet.lastOne === 'boolean') {
    isShowed.lastOne = props.isShowSet.lastOne
  }
}
function setShowingNumber() {
  if (props.config?.nearNum !== null && typeof props.config.nearNum === 'number') {
    configEd.leftNum = props.config.nearNum
    configEd.rightNum = props.config.nearNum
    return
  }
  if (props.config?.leftNum !== null && typeof props.config.leftNum === 'number') {
    configEd.leftNum = props.config.leftNum
  }
  if (props.config?.rightNum !== null && typeof props.config.rightNum === 'number') {
    configEd.rightNum = props.config.rightNum
  }
}
function setShowingArray() {
  if (props.isShowSet.arrows !== null && typeof props.isShowSet.arrows === 'boolean') {
    isShowed.arrows = props.isShowSet.arrows
  }
}
function changePageByArrow(value, name) {
  if (name === 'toMin' && isFirstPage.value) {
    return
  }
  if (name === 'toMax' && isLastPage.value) {
    return
  }
  currentPage.value += value
  changePageHandler()
}
function changePage(value) {
  if (currentPage.value === value || value === stepString.value) {
    return
  }

  currentPage.value = value
  changePageHandler()
}
function inCurrentPage(page) {
  return currentPage.value === page
}
function changePageHandler() {
  emit('changePage', currentPage.value)
}
function getPagination(start, end) {
  const pages = []
  let a = 0
  for (let i = start; i <= end; i++) {
    pages[a] = i
    a++
  }
  return pages
}
function first(pageArr) {
  pageArr.unshift(stepString.value)
  pageArr.unshift(1)

  return pageArr
}
function last(pageArr) {
  pageArr.push(stepString.value)
  pageArr.push(totalPage.value)

  return pageArr
}
</script>

<style lang="sass" scoped>

@import "@/assets/css/basicVarFunc"
.paginate--box

  .paginate
    margin: auto
    list-style: none
    position: relative
    display: flex
    align-items: center
    justify-content: center

    .text
      margin: 3px 6px
      flex: 0 0 auto
      display: flex

      span
        cursor: pointer
        flex: 0 0 auto
        min-width: 36px
        height: 36px
        font-size: 1.6rem
        line-height: 1.8rem
        display: flex
        align-items: center
        justify-content: center
        margin-left: 3px
        margin-right: 3px
        transition: all 0.3s ease
        border-radius: 50%
        @include max-768
          margin: 2px
          font-size: 1.4rem
          min-width: 30px
          height: 30px
        @include min-mobile
          margin: 0
          font-size: 1.2rem
          min-width: 24px
          height: 24px

  .arrow-box
    cursor: pointer
    flex: 0 0 auto
    border-radius: 50%
    transition: color 0.3s ease

    .arrows
      width: 11px
      height: 10px

    &.left-btn
      padding: 10px 11px 10px 8px

      .arrows
        clip-path: polygon(100% 0, 0 50%, 100% 100%)

    &.right-btn
      padding: 10px 8px 10px 11px

      .arrows
        clip-path: polygon(100% 50%, 0 0, 0 100%)

    &.disabled
      cursor: auto

  .paginate span.paginate__button.disabled
    cursor: auto
    @include max-768
      min-width: 18px
    @include min-mobile
      min-width: 12px

  .isCurrentPage
    font-weight: 700

</style>
