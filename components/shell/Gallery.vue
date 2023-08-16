<template>
  <div class="gallery">
    <client-only>
      <div class="gallery-container">
        <div class="gallery-row">
          <div :class="`grids-cz-${type}`" v-for="(type, typeIndex) in imagesListTypes">
            <div class="grid-cz grid-cz-1">
              <div class="grid-img-box">
                <div
                  :id="'image_'+imagesShow[typeIndex * 3].id"
                  class="bg-gray-light img-center-box cursor-pointer"
                  @click="openGallery(typeIndex * 3,imagesShow[typeIndex * 3].id)">
                  <img
                    :src="imagesShow[typeIndex * 3].url" :alt="`圖片 - ${imagesShow[typeIndex * 3].id}`">
                </div>
              </div>
            </div>
            <div class="grid-cz grid-cz-2" v-if="type !== 4">
              <div class="grid-img-box">
                <div
                  :id="'image_'+imagesShow[(typeIndex * 3) + 1].id"
                  class="bg-gray-light img-center-box cursor-pointer"
                  @click="openGallery((typeIndex * 3) + 1,imagesShow[(typeIndex * 3) + 1].id)">
                  <img
                    :src="imagesShow[(typeIndex * 3) + 1].url" :alt="`圖片 - ${imagesShow[(typeIndex * 3) + 1].id}`">
                </div>
              </div>
            </div>
            <div class="grid-cz grid-cz-3" v-if="!(type === 4 || type === 5)">
              <div class="grid-img-box">
                <div
                  :id="'image_'+imagesShow[(typeIndex * 3) + 2].id"
                  class="bg-gray-light img-center-box cursor-pointer"
                  @click="openGallery((typeIndex * 3) + 2,imagesShow[(typeIndex * 3) + 2].id)">
                  <img
                    :src="imagesShow[(typeIndex * 3) + 2].url" :alt="`圖片 ${imagesShow[(typeIndex * 3) + 2].id}`">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>


    <ShellBaseModal
      max
      hasMask
      name="photoModal">
      <template #default="{close}">
        <ShellGalleryModal
          :initial-slide="openPhotoIndex"
          :images="images"
          :close="close"/>
      </template>
    </ShellBaseModal>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {storeScreen} from "~/store/screen";
import {storeModal} from "~/store/modal";

const props = defineProps({
  images: {
    type: [Array, null],
    default: () => {
      return null
    }
  },
})

const $route = useRoute()
const modal = storeModal()
const filter = reactive({
  photo: ''
})
const openPhotoId = ref(-1)
const openPhotoIndex = ref(0)

const imagesShow = computed(()=>{
  return props.images
})

const imagesLength = computed(()=>{
  return imagesShow.value.length
})

const screen = storeScreen()

const listTypes = computed(()=>{
  return [1, 2, 3]
})

const imagesListTypes = computed(()=>{
  let blocks = Math.floor(imagesLength.value / 3)
  let less = imagesLength.value % 3
  let array = []
  for (let index = 0; index < blocks; index++) {
    if (index === 0) {
      array[index] = listTypes.value[0]
    } else if (index !== 0) {
      let picks = listTypes.value.filter(type => type !== array[index - 1])
      let random = Math.random()
      if (1 - random > 0.5) {
        array[index] = picks[1]
      } else
        array[index] = picks[0]
    }
  }
  if (less === 1) {
    // 4 = 只有一張的類型
    array.push(4)
  } else if (less === 2) {
    // 5 = 只有兩張的類型
    array.push(5)
  }
  return array
})

function openGallery(index,id){
  modal.add_base_modals('photoModal')
  openPhotoIndex.value = index
  openPhotoId.value = id
}

</script>

<style lang="sass" scoped>
@import "@/assets/css/basicVarFunc"
.gallery
  .img-center-box
    min-height: 100%
    padding-top: 66.666666%
    position: relative
    > img
      height: 100%
      object-fit: cover
      position: absolute
      top: 0
      width: 100%
  .gallery-container
    display: grid
    grid-template-columns: 1fr

    .gallery-row
      display: grid
      gap: 8px
      grid-area: 1 / 1 / auto / auto

      .grid-img-box
        position: relative
        width: 100%
        height: 100%

      .grid-cz
        width: 100%
        height: 100%

      .grids-cz-show
        display: grid
        grid-auto-columns: 1fr
        grid-auto-rows: 1fr
        gap: 8px
        grid-template-columns: 7fr 3fr 3fr
        @include max-768
          gap: 4px
          grid-template-columns: 1fr 1fr
          grid-template-rows: 7fr 3fr

        &.grids-cz-show-1
          grid-template-rows: 425px
          grid-template-columns: 1fr

          .img-center-box
            padding-top: initial

          @include max-768
            grid-template-rows: 260px

        &.grids-cz-show-2
          grid-auto-rows: 250px
          grid-template-columns: 5fr 2fr
          @include max-768
            grid-auto-rows: 1fr
            grid-template-rows: 260px 100px
            grid-template-columns: 1fr

        &.grids-cz-show-3
          grid-auto-rows: 225px
          grid-template-columns: 5fr 2fr
          @include max-768
            grid-auto-rows: 1fr
            grid-template-columns: 1fr 1fr

        &.grids-cz-show-4
          grid-auto-rows: 225px
          grid-template-columns: 5fr 2fr
          @include max-768
            grid-auto-rows: 1fr
            grid-template-columns: 1fr 1fr
            grid-template-rows: 7fr 3fr

        .grid-cz-1-1
          grid-area: 1 / 1 / auto / auto

        .grid-cz-2-1
          grid-area: 1 / 1 / span 2 / auto
          @include max-768
            grid-area: 1 / 1 / auto / auto

        .grid-cz-2-2
          grid-area: 1 / 2 / span 2 / auto
          @include max-768
            grid-area: 2 / 1 / auto / auto

        .grid-cz-3-1
          grid-area: 1 / 1 / span 2 / auto
          @include max-768
            grid-area: 1 / 1 / auto / span 2

        .grid-cz-3-2
          grid-area: 1 / 2 / auto / auto
          @include max-768
            grid-area: 2 / 1 / auto / auto

        .grid-cz-3-3
          grid-area: 2 / 2 / auto / auto
          @include max-768
            grid-area: 2 / 2 / auto / auto

        .grid-cz-4-1
          @include max-768
            grid-area: 1 / 1 / auto / span 3

        .grid-cz-4-2
          @include max-768
            grid-area: 2 / 1 / auto / auto

        .grid-cz-4-3
          @include max-768
            grid-area: 2 / 2 / auto / auto

        .grid-cz-4-4
          @include max-768
            grid-area: 2 / 3 / auto / auto

        .grid-cz-5-1
          grid-area: 1 / 1 / span 2 / auto

        .grid-cz-5-2
          grid-area: 1 / 2 / auto / auto

        .grid-cz-5-3
          grid-area: 2 / 2 / auto / auto

        .grid-cz-5-4
          grid-area: 1 / 3 / auto / auto

        .grid-cz-5-5
          grid-area: 2 / 3 / auto / auto

      .grids-cz-1
        display: grid
        grid-auto-columns: 1fr
        grid-auto-rows: 1fr
        gap: 8px
        grid-template-columns: 1fr 1fr

        .grid-cz-1
          grid-area: 1 / 1 / span 2 / span 2

        .grid-cz-2
          grid-area: 3 / 1 / auto / auto

        .grid-cz-3
          grid-area: 3 / 2 / auto / auto

      .grids-cz-2
        display: grid
        grid-auto-columns: 1fr
        grid-auto-rows: 1fr
        gap: 8px
        grid-template-columns: 2fr 1fr

        .grid-cz-1
          grid-area: 1 / 1 / span 2 / auto

        .grid-cz-2
          grid-area: 1 / 2 / auto / auto

        .grid-cz-3
          grid-area: 2 / 2 / auto / auto

      .grids-cz-3
        display: grid
        grid-auto-columns: 1fr
        grid-auto-rows: 1fr
        gap: 8px
        grid-template-columns: 1fr 2fr

        .grid-cz-1
          grid-area: 1 / 1 / auto / auto

        .grid-cz-2
          grid-area: 2 / 1 / auto / auto

        .grid-cz-3
          grid-area: 1 / 2 / span 2 / auto

      .grids-cz-4
        display: grid
        grid-auto-columns: 1fr
        grid-auto-rows: 1fr
        gap: 8px
        grid-template-columns: 1fr

        .grid-cz-1
          grid-area: 1 / 1 / auto / auto

      .grids-cz-5
        display: grid
        grid-auto-columns: 1fr
        grid-auto-rows: 1fr
        gap: 8px
        grid-template-columns: 1fr 1fr

        .grid-cz-1
          grid-area: 1 / 1 / auto / auto

        .grid-cz-2
          grid-area: 1 / 2 / auto / auto

  //.grids-cz-4
  //  display: grid
  //  grid-auto-columns: 1fr
  //  grid-auto-rows: 1fr
  //  gap: 8px
  //  grid-template-columns: 1fr 1fr
  //  .grid-cz-1
  //    grid-area: 1 / 1 / span 2 / auto
  //  .grid-cz-2
  //    grid-area: 3 / 1 / auto / auto
  //  .grid-cz-3
  //    grid-area: 1 / 2 / auto / auto
  //  .grid-cz-4
  //    grid-area: 2 / 2 / span 2 / auto

  .mask-box
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    visibility: visible

    .mask
      position: absolute
      transition: all 0.3s ease
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: #000
      opacity: 0.6
      outline: 0

    .text
      font-size: 5rem
      line-height: 5.6rem
      position: relative
      width: 100%
      height: 100%
      z-index: 1
      @include max-768
        font-size: 3.6rem
        line-height: 4.2rem
</style>
