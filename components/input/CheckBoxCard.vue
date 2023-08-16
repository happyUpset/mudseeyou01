<template>
  <div class="checkbox-card-item unSelect">
    <div
      class="rounded-md py-8 px-5 cursor-pointer transition bg-gray-1 class-order-period-color"
      :class="[
        defaultOption === option[dataPick.key]?'bg-teal font-bold text-white':'',
        option.disabled ? 'opacity-10' : ''
      ]"
      @click="input">
      <div class="head text-center">
        <h6>{{ title }}
        </h6>
<!--        <div class="small-font f-gray-dark" v-if="option.disabled">{{ disabledPlusTitle }}</div>-->
<!--        <div class="small-font f-gray-dark" v-else>&nbsp; </div>-->
      </div>
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(['input'])
const props = defineProps({
  option: {
    type: Object,
    default: () => {
      return null
    }
  },
  dataPick: {
    type: Object,
    default: () => {
      return {
        key: 'id',
        name: 'name'
      }
    }
  },
  keys:{
    type: Number,
    default: 0
  },
  defaultOption: {
    type: [String,Number],
    default: ''
  },
  disabledPlusTitle:{
    type: String,
    default: ''
  },
})

const title = computed(()=>{
  if(props.option)
    return props.option[props.dataPick.name]
  return '--:--'
})

function input() {
  if(!props.option.disabled)
    emit('input',props.option[props.dataPick.key])
}

</script>
