<template>
  <transition name="base-fade-3">
    <div v-if="isLoading" class="loading-svg" :class="position==='normal'?'normal-position':''">
      <div class="mask" :style="{opacity: opacity}" v-show="background">
      </div>
      <div class="svg-box flex justify-center" :class="position==='normal'?'normal-position':''">
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path" :style="{stroke}"></circle>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script setup>

const props = defineProps({
  background: {
    type: Boolean,
    default: true,
  },
  opacity: {
    type: Number,
    default: 0.6,
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'list', // normal
  },
  stroke:{
    type: String,
    default: 'var(--bc-teal)',
  }
})
</script>

<style lang="sass" scoped>

.loading-svg
  top: 0
  left: 0
  width: 100%
  min-height: 100vh
  height: 100%
  display: flex
  position: absolute
  justify-content: center
  z-index: 5

  &.normal-position
    min-height: initial
  /*align-items: center*/

  .mask
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #000

  .svg-box
    top: 30vh
    margin-top: -21px
    width: 100%
    text-align: center
    position: absolute

    &.normal-position
      top: 50%
      margin-top: -21px

    .circular
      height: 42px
      width: 42px
      animation: loading-rotate 2s linear infinite

      .path
        animation: loading-dash 1.5s ease-in-out infinite
        stroke-dasharray: 90, 150
        stroke-dashoffset: 0
        stroke-width: 2
        stroke-linecap: round

  @keyframes loading-rotate
    100%
      transform: rotate(360deg)
  @keyframes loading-dash
    0%
      stroke-dasharray: 1, 200
      stroke-dashoffset: 0
    50%
      stroke-dasharray: 90, 150
      stroke-dashoffset: -40px
    100%
      stroke-dasharray: 90, 150
      stroke-dashoffset: -120px
</style>
