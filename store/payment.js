import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import {storeAuth} from "~/store/auth";
import {ref} from "vue";

export const storePayment = defineStore('payment', ()=>{

  const data = ref({})

  function set_data(output) {
    data.value = output
  }
  function reset() {
    data.value = {}
  }

  return {
    data,
    set_data,
    reset
  }
})
