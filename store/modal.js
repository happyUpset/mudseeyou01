import { defineStore } from 'pinia'
import {computed, reactive} from "vue";

export const storeModal = defineStore('modal', ()=>{
  // 一般遮罩的燈箱
  const baseModals = ref([])
  // 透明遮罩的燈箱
  const baseShows = ref([])
  // 畫面全蓋
  const isMask = ref(false)

  const spacialModals = reactive({
    orderPanel: false,
    testB: false
  })

  function set_base_modals (name,boolean) {
    if(boolean){
      add_base_modals(name)
    }else
      remove_base_modals(name)
  }
  function toggle_base_modals (name) {
    let findIndex = baseModals.value.findIndex(ModalId => ModalId === name)
    if(findIndex !== -1)
      baseModals.value.splice(findIndex,1)
    else
      baseModals.value.push(name)
  }
  function add_base_modals (name) {
    let findIndex = baseModals.value.findIndex(ModalId => ModalId === name)
    if(findIndex === -1)
      baseModals.value.push(name)
  }
  function remove_base_modals (name) {
    let findIndex = baseModals.value.findIndex(ModalId => ModalId === name)
    if(findIndex !== -1)
      baseModals.value.splice(findIndex,1)
  }

  // 透明遮罩的燈箱
  function toggle_base_shows (id) {
    let findIndex = baseShows.value.findIndex(ModalId => ModalId === id)
    if(findIndex !== -1)
      baseShows.value.splice(findIndex,1)
    else
      baseShows.value.push(id)
  }
  function add_base_shows (id) {
    let findIndex = baseShows.value.findIndex(ModalId => ModalId === id)
    if(findIndex === -1)
      baseShows.value.push(id)
  }
  function remove_base_shows (id) {
    let findIndex = baseShows.value.findIndex(ModalId => ModalId === id)
    if(findIndex !== -1)
      baseShows.value.splice(findIndex,1)
  }

  function set_mask (boolean) {
    isMask.value = boolean
  }

  function toggle_spacial_modal ({name,boolean}) {
    spacialModals[name] = boolean
  }
  function close_spacial_modal_all () {
    [...Object.keys(spacialModals)].forEach(modalName => spacialModals[modalName] = false)
  }

  const hasSomeModal = computed(()=>{
    return baseModals.value.length > 0 || [...Object.keys(spacialModals)].some(modalName => spacialModals[modalName])
  } )

  const hasSomeShowed = computed(()=>{
    return baseShows.value.length > 0
  } )

  return{
    baseModals,
    isMask,
    set_base_modals,
    toggle_base_modals,
    add_base_modals,
    remove_base_modals,
    set_mask,
    toggle_spacial_modal,
    close_spacial_modal_all,
    toggle_base_shows,
    add_base_shows,
    remove_base_shows,
    hasSomeModal,
    hasSomeShowed,
    spacialModals
  }
})
