<template>
  <div class="tab-title flex-centers relative text-center 2sm:block 2sm:overflow-x-auto 2sm:overflow-y-hidden"
       id="tabTitle">
    <div class="slider-blocks absolute h-1/1 w-1/1" v-if="blockTimesTrans">
      <div
        v-for="(trans,time) in blockTimesTrans"
        class="slider-block absolute h-1/1"
        :key="time"
        :style="{
          height: `${(3)}px`,
          bottom: `${0}`,
          left:`${nowTabIndex * eachWidth + (eachWidth * (showOnly ? 0.5 : 0))}%`,
          width: `${ 50 }%`,
          transition: `${trans}s ${blockMoveEase} all`,
        }">
        <div class="block mx-auto w-1/1 h-1/1 bg-teal" :class="sliderCss"></div>
      </div>
    </div>
    <div class="tab-label w-1/1">
      <div
        class="label-item py-6 cursor-pointer tracking-[0.08em] w-1/3 opacity-80 transition-all duration-300 relative text-gray-5 h7-font inline-block select-none"
        v-for="(value,key) in tabsData" :key="key"
        :id="`item_${value.name}`"
        :class="[nowTabsType === 'Object' ?nowTab === key : nowTab === value.name?'selected opacity-100 font-bold text-gray-6':'cursor-pointer']"
        :style="{'width' : `${ 50 }%`}"
        @click="handleClick(key,value.name)">
        <div class="text-6 leading-[48px] 2sm:leading-[33px] transition" :class="nowTab === value.name?'text-teal':''">{{ value.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(['handleClick'])
const props = defineProps({
  tabsData: {
    type: [Object, Array],
    default: () => {
      return {
        'single': {
          name: 'single',
          title: '單場',
        },
        'multi': {
          name: 'multi',
          title: '過關',
        },
        'combo': {
          name: 'combo',
          title: '過關組合',
        },
      }
    },
  },
  //判斷正確點
  nowTabsType: {
    type: String,
    default: 'Object'
  },
  showOnly: {
    type: Boolean,
    default: false,
  },
  sliderCss: {
    type: String,
    default: 'bg-green',
  },
  nowTab: {
    type: String,
    default: 'single',
  },
  blockTimes: {
    type: Number,
    default: 1,
  },
  stopDetect: {
    type: Boolean,
    default: false, // 停止監聽，不會啟動滑動效果
  },
  offsetLeftName: {
    type: String,
    default: '', // 如果沒成沒對到 nowTab 會炸裂
  },
  offsetLeftFirst: {
    type: Boolean,
    default: false, // 如果沒成沒對到 nowTab 會炸裂
  },
  blockMoveMode: {
    type: String,
    default: 'randomOnce',// random randomOnce centerFirst centerLast topFirst topLast
  },
  blocMoveRange: {
    type: Array,
    default: () => {
      return [30, 40]
    },
  },
  blockMoveEase: {
    type: String,
    default: 'ease'
    // default: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    // default: 'cubic-bezier(0.86, 0, 0.07, 1)'
    // default: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
    // default: 'cubic-bezier(0.23, 1, 0.32, 1)'
  },
})

const tabCounts = ref(0)
const cancelScroll = ref(null)
const lastCancelScrollName = ref('')

const length = computed(()=>Object.keys(props.tabsData).length)
const nowTabData = computed(()=>{
  return props.tabsData[Object.keys(props.tabsData).find(tabName => tabName === props.nowTab)]
})
const nowTabIndex = computed(()=>{
  if (props.nowTabsType === 'Object')
    return Object.keys(props.tabsData).findIndex(tabName => tabName === props.nowTab)
  return props.tabsData.findIndex(tabName => tabName.name === props.nowTab)
})
const eachWidth = computed(()=>{
  return Math.round(100 / Object.keys(props.tabsData).length * 1000000) / 1000000
})
const blockTimesTrans = computed(()=>{
  if (props.blockMoveMode === 'random' && tabCounts.value) {
    return set_random_list();
  } else {
    try {
      return set_list(props.blockMoveMode)
    } catch (e) {
      return set_random_list();
    }
  }
})

watch(()=>props.offsetLeftName,(new1)=>{
  if (process.client && !props.stopDetect)
    setOffsetLeft(new1, lastCancelScrollName.value)
},{
  immediate: false
})

function handleClick(key, name) {
  if (props.blockMoveMode === 'random') {
    tabCounts.value++;
  }
  if (props.offsetLeftName === '') {
    setOffsetLeft(key, lastCancelScrollName.value)
  }
  emit('handleClick', props.nowTabsType === 'Object' ? key : name);
}

function setOffsetLeft(name, lastCancelScrollName) {
  if (name !== '' && lastCancelScrollName !== name) {
    // console.log('前往名稱:',name,'上個名稱:',lastCancelScrollName)

    // scroll不能夠同一時間複用，暫停使用此功能
    // window.requestAnimationFrame(()=>{
    //   if(cancelScroll.value){
    //     // console.log('關掉上一個滑動效果')
    //     cancelScroll()
    //     cancelScroll.value = null
    //   }
    //   window.requestAnimationFrame(()=>{
    //     // console.log('建立新的滑動效果')
    //     cancelScroll.value = this.$scrollTo(`#item_${name}`,{
    //       container: '#tabTitle',
    //       x: true,
    //       y: false,
    //     })
    //     props.lastCancelScrollName = name
    //   })
    // })

    let data = document.getElementById('tabTitle')
    let item = document.getElementById(`item_${name}`)
    data.scrollLeft = item.offsetLeft
  }
}
function set_list(name) {
  switch (name){
    case 'random':
      return set_random_list()
    case 'randomOnce':
      return set_randomOnce_list()
    case 'centerFirst':
      return set_centerFirst_list()
    case 'centerLast':
      return set_centerLast_list()
    case 'topFirst':
      return set_topFirst_list()
    case 'topLast':
      return set_topLast_list()
    default:
      return set_random_list()
  }
}
function set_random_list() {
  let aws = [],
    range = props.blocMoveRange[1] - props.blocMoveRange[0];
  for (let time = 0; time < props.blockTimes; time++) {
    aws[time] = Math.round(((Math.random() * range / 100) + props.blocMoveRange[0] / 100) * 10000) / 10000
  }
  return aws
}
function set_randomOnce_list() {
  return set_random_list();
}
function set_center(first) {
  let aws = [],
    middleIndex = Math.floor(props.blockTimes / 2),
    range = props.blocMoveRange[1] - props.blocMoveRange[0],
    gainMath = first ? 0 : middleIndex,
    gain = 0;
  for (let time = 0; time < props.blockTimes; time++) {
    gain = Math.abs(Math.abs(time - middleIndex) - gainMath) / middleIndex;
    aws[time] =
      Math.round(((range * gain / 100) + props.blocMoveRange[0] / 100) * 10000) / 10000;
  }
  return aws
}
function set_centerFirst_list() {
  return set_center(true)
}
function set_centerLast_list() {
  return set_center(false)
}
function set_top(first) {
  let aws = [],
    range = props.blocMoveRange[1] - props.blocMoveRange[0],
    gainMath = first ? props.blockTimes : 0,
    gain = 0;
  for (let time = 0; time < props.blockTimes; time++) {
    gain = Math.abs(Math.abs(time - props.blockTimes) - gainMath) / props.blockTimes;
    aws[time] =
      Math.round(((range * gain / 100) + props.blocMoveRange[0] / 100) * 10000) / 10000;
  }
  return aws
}
function set_topFirst_list() {
  return set_top(true)
}
function set_topLast_list() {
  return set_top(false)
}

onMounted(()=>{
  if (props.offsetLeftFirst) {
    setOffsetLeft(props.nowTab)
  }
})
</script>
