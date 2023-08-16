<template>
  <ShellModal class="modal-main" :is-loading="isLoading" @close="closeModal">
    <template #item="props">
      <client-only>
        <swiper
          :initial-slide="initialSlide"
        >
          <swiper-slide v-for="(item,index) in images" :key="index">
            <div class="img-box">
              <img :src="item.url" :alt="`圖片 - ${index + 1}`">
            </div>
          </swiper-slide>
        </swiper>
      </client-only>
    </template>
  </ShellModal>
</template>

<script setup>

const props = defineProps({
  images:{
    type: Array,
    default: () => {
      return []
    }
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  close:{
    type: Function,
    default: () => {
      return () => {}
    }
  },
  initialSlide: {
    type: Number,
    default: 0
  },
})

function closeModal(){
  props.close()
}
</script>

<style lang="sass" scoped>
@import "@/assets/css/basicVarFunc"

.modal-main
  width: 100%
  background: transparent

  .top-btn-box
    display: flex
    justify-content: center
    position: absolute
    top: -43px
    width: 100%
    @include mobile
      top: initial
      bottom: -45px
    .close-btn
      border-radius: 50%
      display: flex
      justify-content: center
      align-items: center
      height: 30px
      width: 30px
      .fa-times
        width: 30px
  .swiper-box
    height: 720px
    max-height: 80vh
    overflow: hidden
    @include max-768
      height: 80vh
    .swiper-slide
      width: fit-content
      opacity: 0.4

    .swiper-slide-active
      opacity: 1

  .cover-box
    //width: 900px
    margin: auto
    height: 720px
    @include max-768
      height: 80vh
  .img-box
    height: 720px
    width: 100%
    display: inline-block
    vertical-align: bottom
    @include max-768
      height: 80vh

    img
      margin: auto
      width: 100%
      height: 100%
      object-fit: contain
      vertical-align: bottom

  .button-direct
    position: absolute
    top: calc( 50% - 15px )
    width: 30px
    cursor: pointer
    z-index: 1
    transition: 0.3s ease opacity
  .button-prev
    left: 15px
  .button-next
    right: 15px
</style>
