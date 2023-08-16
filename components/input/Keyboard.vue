<template>
  <div class="">
    <div class="number-keyboard"></div>
  </div>
</template>

<script setup>

import KeyboardKind from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

const emit = defineEmits(['onChange','onKeyPress'])
const props = defineProps({
  value:{
    type: [String,Number],
    default: ''
  },
  title:{
    type: String,
    default: ''
  },
  iconTitle:{
    type: String,
    default: ''
  },
  isPick:{
    type: Boolean,
    default: false
  },
  defaultText:{
    type: String,
    default: ''
  },
  resetCount:{
    type: Number,
    default: 0
  }
})

const keyboard = ref(null)
const input = ref('')

function onChange(newInput) {
  emit("onChange", newInput);
  input.value = newInput
}
function onKeyPress(button) {
  emit("onKeyPress", button);
  if (button === "{shift}" || button === "{lock}")
    handleShift();
}
function handleShift() {
  let currentLayout = keyboard.value.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.value.setOptions({
    layoutName: shiftToggle
  });
}

function init(){
  if(keyboard.value !== null){
    keyboard.value.setInput(props.defaultText)
    input.value = props.defaultText
  }
}

watch(()=>props.defaultText,(new1)=>{
  if(new1 !== input.value && keyboard.value !== null){
    keyboard.value.setInput(new1)
    input.value = new1
  }
})
watch(()=>props.resetCount,(new1)=>{
  if(keyboard.value !== null){
    keyboard.value.setInput(props.defaultText)
    input.value = props.defaultText
  }
})

onMounted(()=>{
  keyboard.value = new KeyboardKind('number-keyboard', {
    onChange: onChange,
    onKeyPress: onKeyPress,
    layout: {
      default: ["1 2 3", "4 5 6", "7 8 9", " 0 {bksp}"],
    },
    display: {
      "{bksp}": "⌫",
    }
  });
  init()
})
</script>
