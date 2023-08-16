<template>
  <div class="btn-panel" v-if="!hidden">
    <div class="contents" v-if="btnable">
      <div class="w-1/1 h-[70px]" v-if="!warning">
        <EffectsActButton
          :loading="loading"
          class="btn-base heavy major"
          @input="clickBtn">
          <slot name="link" :title="title">
            {{ title }}
          </slot>
        </EffectsActButton>
      </div>
      <div class="w-1/1 h-[70px]" v-else>
        <div
          class="btn-base heavy gray"
          @click="setBlur">
          <slot name="link" :title="title">
            {{ title }}
          </slot>
        </div>
      </div>
    </div>
    <div class="contents" v-else>
      <nuxt-link
        v-if="!warning"
        :to="{name: linkName,query: linkQueries}">
        <div class="w-1/1 h-[70px]">
          <div
            class="btn-base heavy major"
            @click="clickBtn">
            <slot name="link" :title="title">
              {{ title }}
            </slot>
          </div>
        </div>
      </nuxt-link>
      <div v-else>
        <div class="w-1/1 h-[70px]">
          <div
            class="btn-base heavy gray"
            @click="setBlur">
            <slot name="link" :title="title">
              {{ title }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(['input','setBlur'])
const props = defineProps({
  hidden: {
    type: Boolean,
    default: false
  },
  warning: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'title'
  },
  btnable:{
    type: Boolean,
    default: false
  },
  loading:{
    type: Boolean,
    default: false
  },
  linkName:{
    type: String,
    default: 'index'
  },
  linkQueries:{
    type: Object,
    default: () => {
      return {}
    }
  }
})

function clickBtn($e) {
  if(props.warning){
    return '';
  }
  emit('input')
}

function setBlur($e) {
  emit('setBlur')
}

</script>
