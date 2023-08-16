<template>
  <div class="bg-gray-2 relative " id="app">
    <VitePwaManifest/>
    <LayoutsMask/>
<!--    <ModulesNavigationMobile v-if="screen.platformMax['2sm']"/>-->
<!--    <ModulesNavigation v-else/>-->
    <div class="flex">
      <div class="flex-[0_0_300px]">
        <div class="fixed">
          <ul class="ul text-black" v-for="name in FUNC">
            <li class="py-12 text-4">
              <nuxt-link :to="{name:URL[name].name}">
                {{ URL[name].locale }}
              </nuxt-link>
            </li>
          </ul>
          <ul class="ul text-black" v-for="name in COM">
            <li class="py-12 text-4">
              <nuxt-link :to="{name:URL[name].name}">
                {{ URL[name].locale }}
              </nuxt-link>
            </li>
          </ul>
          <ul class="ul text-black " v-for="name in VAR">
            <li class="py-12 text-4">
              <nuxt-link :to="{name:URL[name].name}">
                {{ URL[name].locale }}
              </nuxt-link>
            </li>
          </ul>
        </div>

      </div>
      <div class="flex-1-auto">
        <div class="w-1/1 min-h-[calc(100vh+env(safe-area-inset-bottom))] grid bg-white max-w-screen-s-2sm mx-auto">

          <!--    <div class="w-1/1 min-h-[calc(100vh-100px)] bg-white  mx-auto">-->
          <main class="w-1/1 h-1/1">
            <!--        <router-view :key="$route.name"/>-->
            <router-view/>
          </main>
        </div>
      </div>
    </div>

    <client-only>
      <LayoutsQuickTopBtn class="z-6"/>
      <LayoutsNotification/>
    </client-only>

    <ShellBaseModal
      md
      name="modalIsWebviewsShow">
      <template #default="{close}">
        <ShellSlotModal
          title="請使用預設瀏覽器開啟"
          close-btn
          :close="close"
          :cancel-show="false"
          :confirm-show="false">
          <template #item="{item}">
            <div class="mx-20 mb-40">
              <div class="content">
                如果您使用 LINE,Facebook等等應用程式開啟網站時
                有些功能可能無法操作。
              </div>
              <div class="btn-box mt-16">
                <div class="btn-base teal tiny" @click="setModal('modalIsWebviewsShow',false)">確認</div>
              </div>
            </div>
          </template>
        </ShellSlotModal>
      </template>
    </ShellBaseModal>
  </div>
</template>
<script setup>
import {storeScreen} from "@/store/screen";
// import {initAuth} from "@/composables/initAuth";
import {platformStore} from "~/store/platform";
import {ref, watch} from "vue";
import {addClass, addStyle, removeClass, removeStyle} from "~/utils/html";
import {storeModal} from "~/store/modal";
import {FUNC,VAR,URL,COM} from "~/const/routerName";

// initAuth()
const screen = storeScreen()

const modalIsWebviewsShow = ref(false)

// 畫面控制
const modal = storeModal()
const platform = platformStore()
const saveWindowScrollTop = ref(0)
const isFixedScreen = computed(()=>modal.hasSomeModal)
watch(()=> isFixedScreen.value,(new1)=>{
  if(process.client){
    if(new1){
      addClass(document.body,'fixed')
      addStyle(document.body,'inset',`-${screen.windowScrollTop}px 0 0`)
      saveWindowScrollTop.value = screen.windowScrollTop
    }else {
      removeClass(document.body,'fixed')
      removeStyle(document.body,'inset')
      window.scrollTo(0,saveWindowScrollTop.value)
      window.scrollTop = saveWindowScrollTop.value
    }
  }
},{
  immediate: true
})

function setModal(name,status) {
  modal.set_base_modals(name,status)
}

onMounted(()=>{
  requestAnimationFrame(()=>{
    if(platform.isWebviews){
      // 使用應用程式開啟 沒什麼問題
      // modalIsWebviewsShow.value = true
    }
  })
})
</script>

<style lang="sass">

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center

.fixed
  //overflow: hidden
  -webkit-overflow-scrolling: touch
/*transform: translate3d(0,0,0)*/
</style>
