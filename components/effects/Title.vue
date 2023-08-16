<template>
  <div class="on-border title-bar relative">
    <div class="background-title-circle"></div>
    <div class="caption-box text-right">
      <div class="caption flex items-center">
        <div class="icon-bet"></div>
        <h1 class="text mx-12">{{ title }}</h1>
      </div>
      <div class="h4-font the-time">
        <slot name="form">
        </slot>
      </div>
    </div>
    <div class="border-line"></div>
  </div>
</template>

<script setup>

const props = defineProps({
  title:{
    type: String,
    default: ''
  }
})
</script>

<style lang="sass" scoped>
@import "@/assets/css/basicVarFunc"
.title-bar
  .background-title-circle
    position: absolute
    border: 32px solid $yellow
    background: $white
    border-radius: 50%
    width: 170px
    height: 170px
    top: -75px
    left: -52px

  .caption-box
    line-height: 30px

    .caption
      @extend %title-h3
      position: absolute
      top: -5px
      left: -15px

      .icon-bet
        width: 45px
        height: 45px
        background: url("../../assets/images/title_data.png") center no-repeat
        background-size: contain
        display: inline-block
        vertical-align: middle

  .the-time
    line-height: 30px
    display: inline-block
    vertical-align: middle
    @include max-768
      margin-top: 35px

  .border-line
    margin-top: 5px
    border-bottom: 1px solid $background
</style>
