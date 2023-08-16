<template>
  <div class="bg-gray-1 px-20 py-15 rounded-md">
    <div class="head text-left flex">
      <div class="text-7 text-gray-4 font-medium flex-1-auto">{{ no }}</div>
      <div class="text-7 text-gray-4 font-medium flex-0-auto text-orange" v-if="statusName !== ''">{{ statusName }}</div>
    </div>
    <div class="sub-head my-12 flex items-center">
      <div class="flex-0-auto">
        <div class="tag rounded-sm text-small py-3 px-4 border font-medium">{{ type }}</div>
      </div>
      <div class="flex-1-auto text-left">
        <div class="text-6 font-medium px-8">{{ name }}</div>
      </div>
      <div class="flex-0-auto">
        <div class="text-6 font-medium px-8">{{ price }}</div>
      </div>
    </div>
    <div class="content">
      <ul class="ul-flat small">
        <li v-if="date">
          <NuxtIcon2 name="calendar" class="w-20 h-20 mr-8"/>
          <ShellCountDownTimer
            class="text-6 font-medium"
            :data-in="date"
            is-iso
            format-out="到期 yyyy/MM/dd HH:mm"/>
        </li>
        <li v-if="table">
          <NuxtIcon2 name="table" class="w-20 h-20 mr-8"/>
          <div class="text-6 font-medium">{{ table }}</div>
        </li>
        <li>
          <NuxtIcon2 name="money" class="w-20 h-20 mr-8"/>
          <div class="text-6 font-medium">{{ payment }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

const {currency} = useCurrency()
const emit = defineEmits(['onPick'])
const props = defineProps({
  no:{
    type: [String,Number],
    default: ''
  },
  type:{
    type: [String,Number],
    default: ''
  },
  price:{
    type: [String,Number],
    default: ''
  },
  name:{
    type: [String,Number],
    default: ''
  },
  payment:{
    type: [String,Number],
    default: ''
  },
  date:{
    type: String,
    default: ''
  },
  table:{
    type: String,
    default: ''
  },
  status:{
    type: String,
    default: ''
  },
})

const statusName = computed(()=>{
  switch (props.status){
    case 'canceled':
      return '已取消'
    case 'canceled_but_not_refunded':
      return '已取消(不退款)'
    case 'pending':
      return '預約未付款'
    default:
      return ''
  }
})

</script>
