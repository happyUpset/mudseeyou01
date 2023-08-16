<!-- 暫時應付沒有可以使用的 svg套件的解套方式 -->
<template>
  <div
    class="content"
    v-html="icon"
  />
</template>

<script setup lang="ts">
import { ref, watchEffect } from '#imports'

const props = withDefaults(defineProps<{
  name: string;
  class?: string;
}>(), { class: '' })

const icon = ref('')

watchEffect(async () => {
  try {
    const iconsImport = import.meta.glob('assets/icons/**/**.svg', {
      as: 'raw',
      eager: false
    })
    let rawIcon = await iconsImport[`/assets/icons/${props.name}.svg`]()
    let reg = /<svg/
    rawIcon = rawIcon.replace(reg,`<svg class="${props.class}"`)
    icon.value = rawIcon
  } catch {
    console.error(
      `[nuxt-icons] Icon '${props.name}' doesn't exist in 'assets/icons'`
    )
  }
})
</script>

