<template>
  <ShellCollapse
    :title="item.title"
    :content="item.content"
    v-for="item in list"/>
</template>

<script setup>

const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return [
        {
          title: 'title',
          content: 'content'
        }
      ]
    }
  },
})

const open = ref(false)
const height = ref(0)


function setOpen(){
  open.value = !open.value
  if(process.client){
    let ele = document.getElementById(`collapse_${props.key}`)
    if(ele){
      height.value = ele.scrollHeight
    }
  }
}

</script>
