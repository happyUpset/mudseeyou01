<template>
  <div class="bg-gray-2 relative" id="app">
    <VitePwaManifest/>
    <LayoutsMask/>
    <!--    <ModulesNavigationMobile v-if="screen.platformMax['2sm']"/>-->
    <!--    <ModulesNavigation v-else/>-->
    <div class="w-1/1 min-h-[calc(100vh+env(safe-area-inset-bottom))] bg-white  mx-auto">
      <!--    <div class="w-1/1 min-h-[calc(100vh-100px)] bg-white  mx-auto">-->
      <main class="w-1/1">
        <!--        <router-view :key="$route.name"/>-->
        <router-view/>
      </main>
    </div>

    <client-only>
      <LayoutsQuickTopBtn class="z-6"/>
      <LayoutsNotification/>
    </client-only>
  </div>
</template>
<script setup>
import {storeScreen} from "@/store/screen";
// import {initAuth} from "@/composables/initAuth";
import {ref, watch} from "vue";
import {addClass, addStyle, removeClass, removeStyle} from "~/utils/html";
import {storeModal} from "~/store/modal";

// initAuth()
const modal = storeModal()
const screen = storeScreen()
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
